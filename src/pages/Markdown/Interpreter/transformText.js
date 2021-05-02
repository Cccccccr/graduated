import { getNode, trim } from './util';
// 标识进行到第几行了
const FLAG_INDEX = { index: 0 };

function transformText(text) {
  // console.log(text);
  const sourceRow = text.split(/\n/);
  console.log('sourceRow', sourceRow);
  // 存储分行以后每一行得出的type数据结构，此时只区分以下type类型
  // p：text文本
  // h1 - h6
  // code：属性中有beginTag，用于去匹配下一个endTag，还有language（标识用的语言）
  // ul：无需列表，子元素为li
  // ol：有序列表，子元素为li
  // table：第一行为表头
  // warp：空白字符串，纯换行用的
  // img：图片标签
  const standNode = [];
  let preNode = {};
  let time = 0;
  FLAG_INDEX.index = 0;
  while (FLAG_INDEX.index < sourceRow.length) {
    console.log(FLAG_INDEX.index, sourceRow[FLAG_INDEX.index]);
    const result = handleRow({
      text: sourceRow[FLAG_INDEX.index],
      preNode,
      sourceRow,
      index: FLAG_INDEX.index,
    });
    if (result) {
      standNode.push(result);
      console.log('standNode', standNode);
    }
    preNode = standNode[standNode.length - 1];
    FLAG_INDEX.index += 1;
    if (FLAG_INDEX.index >= sourceRow.length) break;
    if (time++ > 20) break;
  }
  console.log(standNode);
}

// br节点
const brNode = { type: 'br' };

/* 
状态机：
text的下一个元素是spaceCode，spaceCode变为text
text后面存在>=2连个空格，下一个如果是text，增加br，否则去除后面的空格
*/

/**
 * @description: 把传入节点转换为text节点；
 * @param {*} node
 * @return {*} textNode
 */
function transformToText(node) {
  return {
    type: 'text',
    value: trim(node.value),
    source: node.source,
  };
}

function handleRow(fixedParameter) {
  const { text, preNode = {}, sourceRow, index } = fixedParameter;
  function getNodeData(type, value, extraData = {}, source = text) {
    return {
      type,
      value,
      ...extraData,
      source,
    };
  }

  let curNode = getNode(text);
  const { type } = curNode;
  console.log('handleRow curRow', curNode);

  const baseHandle = () => {
    let curNode = getNode(text);
    switch (curNode.type) {
      case 'text':
        curNode.children = [{ ...curNode }];
        break;
      case 'table':
        const result = handleTable(fixedParameter);
        console.log(result);
        if (result) return getNodeData('table', text, result);
        curNode = transformToText(curNode);
        curNode.children = [getNodeData('text', trim(text))];
        break;
      case 'code':
        curNode.children = [];
        break;
      case 'spaceCode':
        curNode.children = [{ ...curNode }];
        break;
      case 'ul':
        // curNode.children = [transformToText(curNode)];
        addLiNode(curNode, transformToText(curNode));
        break;
      case 'ol':
        // curNode.children = [transformToText(curNode)];
        addLiNode(curNode, { ...transformToText(curNode), serial: curNode.matchNum });
        break;
      default:
        break;
    }
    return curNode;
  };

  const addChildren = (node, items) => {
    node.children = items ? (Array.isArray(items) ? [...items] : [items]) : [];
  };

  // console.log(text, preNode);
  // 前一个元素没有type or type为blank
  if (!preNode.type || preNode.type === 'blank') {
    return baseHandle();
  }

  // 上一个元素是code
  if (preNode.type === 'code') {
    if (!preNode.children) {
      addChildren(preNode);
    }
    switch (type) {
      /* 
        如果也是code，就需要比较和preNode中target能否构成完整的code代码块，
        匹配规则，curNode的target中元素和preNode的target元素一样且长度>=
      */
      case 'code':
        if (
          curNode.tag[0] === preNode.tag[0] &&
          curNode.tag.length >= preNode.tag.length
        ) {
          const nextText = sourceRow[index + 1];
          if (nextText !== undefined) {
            FLAG_INDEX.index += 2;
            return getNode(nextText);
          }
        } else {
          preNode.children.push(curNode);
        }
        break;
      /* 不是代码块直接把元素加入children，渲染时都取soucre */
      default:
        preNode.children.push(curNode);
    }
  }

  // 上一个元素是Heading
  if (/h[1,2,3,4,5,6]/.test(preNode.type)) {
    return baseHandle();
  }

  // 上一个元素为text
  if (preNode.type === 'text') {
    if (!preNode.children) addChildren(preNode, { ...preNode });
    const result = handleText(fixedParameter, { getNodeData });
    if (result) return result;
  }

  // 上一个元素为table
  /* 
    判断下一个元素：
    （1）table元素，把数据加到当前table的data上
    （2）text，把text转换成第一列的数值，添加到当前table data上
    （3）其他，返回getNode元素
  */
  if (preNode.type === 'table') {
    switch (type) {
      case 'table':
        handleTable(fixedParameter);
        break;
      case 'text':
        // 如果是text，把text转换为第一列的数值
        handleTable({ ...fixedParameter, text: `|${text}|` });
        break;
      default:
        return curNode;
    }
  }

  // 上一个元素是spacecode
  if (preNode.type === 'spaceCode') {
    // 判断有没有children
    if (!preNode.children) addChildren(preNode, { ...preNode });
    /* 
      判断curNode的类型
      1. spaceCode：把当前spaceCode的value加入preNode的children，合并两个spaceCode
      2. blank：需要判断下面还存不存在spaceCode，存在需要把blank的空字符串加入children
      3. 其他：返回curNode
    */
    switch (type) {
      case 'spaceCode':
        preNode.children.push(curNode);
        break;
      case 'blank':
        let tempIndex = index,
          breakFlag = false,
          brArr = [curNode];
        while (!breakFlag) {
          const nextText = sourceRow[++tempIndex];
          if (nextText !== undefined) {
            const curRowNode = getNode(nextText);
            /* 
              1. 找到另外一个spaceCode，把中间的blank都加上
              2. 找到blank，brArr +1
              3. 找到其他元素，不符合合并条件，返回curNode(即当前行的blank元素)
            */
            switch (curRowNode.type) {
              case 'spaceCode':
                for (let i = 0; i < brArr.length; i++) {
                  preNode.children.push(brArr[i]);
                }
                // 把index置位合并到的元素位置
                FLAG_INDEX.index = tempIndex - 1;
                breakFlag = true;
                break;
              case 'blank':
                brArr.push(curRowNode.value);
                break;
              default:
                return curNode;
            }
          } else {
            /* 一直到最后最后一行还没有找到另外一个spaceCode，返回当前blank */
            return curNode;
          }
        }
        break;
      default:
        console.log(curNode, 'spaceCode default');
        return curNode;
    }
  }

  function findLastNode(node) {
    const nodeArr = [];
    function find(node) {
      if (!node.children) return '';
      nodeArr.push(node);
      find(node.children[node.children.length - 1]);
    }
    find(node);
    return nodeArr[nodeArr.length - 1];
  }
  function addListChildren(node, addnode) {
    if (!node.children) node.children = [transformToText(node)];
    if (addnode) node.children.push(addnode);
    return node;
  }
  function addLiNode(node, child) {
    console.log(node, child, '************');
    const LI = { type: 'li', children: [child]};
    if(!node.children) node.children = [];
    node.children.push(LI);
    return node;
  }
  // 上一个元素是ul
  if (preNode.type === 'ul') {
    // ul如果是空字符串会被当做text处理，ol不会
    switch (type) {
      case 'blank':
        return curNode;
      case 'table':
      case 'spaceCode':
        const newNode = transformToText(curNode);
        let lastNode = findLastNode(preNode);
        console.log(lastNode, 'lastnode');
        addListChildren(lastNode, newNode);
        break;
      case 'ul':
        // 先不进行缩进判断
        // 判断是不是空字符串，是的话当做text处理
        if(curNode.children)
        preNode.children.push(addListChildren(curNode));
        break;
      case 'text':
        // 如最后一个ul
        return curNode;
        break;
      default:
        return curNode;
    }
  }

  // 上一个元素是ol
}

/**
 * @description: 如果当前为table元素且下一个为table的style元素，则合并这两个table元素组成一个table元素，如果上一个元素是table，则把当前table数据加入进去，都不符合条件就给函数外自行处理
 * @param {*} fixedParameter
 * @return {*}
 */
function handleTable(fixedParameter) {
  const { text, preNode, sourceRow, index } = fixedParameter;
  const exactNode = getNode(text);
  // 判断还有没有下一个元素
  const nextNode =
    index + 1 < sourceRow.length ? getNode(sourceRow[index + 1]) : {};
  if (preNode.type !== 'table') {
    // 下一个元素是table style样式，和当前table组成正式的table node元素
    if (nextNode.type === 'table' && nextNode.style) {
      // FLAG_INDEX要加1，说明下个元素已经被处理了
      FLAG_INDEX.index += 1;
      return {
        data: [exactNode.data],
        styleArr: nextNode.data,
      };
    }
  } else {
    preNode.data.push(exactNode.data);
  }
}

function textAddText(text, preNode, curNode) {
  console.log(preNode, 'textAddText');
  if (addBr(preNode)) {
    curNode.value = trim(curNode.value);
    curNode.type = 'text';
    preNode.children.push(curNode);
  } else {
    const exactNode = preNode.children[preNode.children.length - 1];
    exactNode.value = exactNode.value + '\n' + trim(curNode.value);
  }
}

function handleText(fixedParameter, extraParameter) {
  const { text, preNode, sourceRow, index } = fixedParameter;
  const { getNodeData } = extraParameter;
  const curNode = getNode(text);
  const { type } = curNode;
  switch (type) {
    // 如果是blank，返回blank
    case 'blank':
      return curNode;
    // text，spaceCode，把类型定转换成text，br元素的转换等到text文本分析再做处理
    case 'text':
    case 'spaceCode':
    case 'ol':
    case 'ul':
      curNode.type = 'text';
      preNode.children.push(curNode);
      // textAddText(text, preNode, curNode);
      break;
    // table，判断空格，进入table的验证流程
    case 'table':
      const result = handleTable(fixedParameter);
      if (result) return getNodeData('table', text, result);
      curNode.type = 'text';
      preNode.children.push(curNode);
      // textAddText(text, preNode, curNode);
      break;
    default:
      return curNode;
  }
}

function addBr(node) {
  const brReg = /\s{2,}$/;
  const exactNode = node.children[node.children.length - 1];
  if (brReg.test(exactNode.value)) {
    node.children.push(brNode);
    return true;
  } else {
    return false;
  }
}

export { transformText };
