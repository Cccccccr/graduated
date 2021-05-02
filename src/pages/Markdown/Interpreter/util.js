// 第一个空格
const BEGIN_SPACE = /^\s{1}/;
// 空行
const BLANK = /^\s{0,}$/;
// 匹配文本前的空格
const SPACE = /^\s{1,}/;
// 文本前是四个空格形成的代码块
const INLINE_CODE = /^\s{4}/;
// h1-h6
const HEADING = /^#{1,}/;
// 分割线
const HR = /^((-{3,})|(\*{3,})|(_{3,}))/;
// 图片
const IMAGE = /!\[(.*)\]\((.*)\)/;
// 链接
const LINK = /\[(.*)\]\((.*)\)/;
// 引用 >
const QUOTE = /^>{1,}/;
// 代码块
const CODE = /^`{3,}|~{3,}/;
// 无序列表
const UL = /^\*{1}|\+{1}/;
// 有序列表
const OL = /^\d{1,}\./;
// 表单
const TABLE = /^(\|(.*))+\|(\s*)$/;

function getNode(text) {
  // 保留原本的text副本，防止第二部合并type时遇到code这样的元素需要把type转换为text
  const sourceText = text;
  function getNodeData(type, value, extraData = {}, source = sourceText) {
    return {
      type,
      value,
      ...extraData,
      source,
    };
  }

  console.log('getNode', text);

  if (typeof text !== 'string') {
    return {
      type: 'ERRORNODE',
    };
  }

  // 空行
  const blankArr = text.match(BLANK);
  if (blankArr) {
    return getNodeData('blank', text);
  }

  // 匹配前面四个空格，有就是代码块
  const spaceCodeArr = text.match(INLINE_CODE);
  if (spaceCodeArr && spaceCodeArr.length) {
    // 存在四个空格
    return getNodeData('spaceCode', text.replace(INLINE_CODE, ''));
  }
  // 去除前面空格
  text = trim(text);

  // 匹配h1-h6标签
  const headingArr = text.match(HEADING);
  if (headingArr) {
    const item = headingArr[0];
    // 判断#号个数，小于等于6且后面跟着一个空格为H标签
    if (item.length <= 6) {
      const tempText = text.replace(HEADING, '');
      const spaceArr = tempText.match(SPACE);
      // 去除#后前面存在>0的空格 or 后面的元素为空字符串
      if (spaceArr || !tempText.length) {
        const exactText = tempText.replace(/^\s{1}/, '');
        return getNodeData(`h${item.length}`, exactText);
      }
    }
  }

  // 分割线
  const hrArr = text.match(HR);
  if (hrArr && BLANK.test(text.replace(HR, ''))) {
    return getNodeData('hr', text);
  }

  // 引用
  const quoteArr = text.match(QUOTE);
  if (quoteArr) {
    let tempText = text.replace(QUOTE, '');
    // 如果存在一个空格去除
    const exactText = tempText.replace(/^\s{1}/, '');
    return getNodeData('quote', exactText, {
      level: quoteArr[0].length,
      empty: BLANK.test(exactText),
    });
  }

  // code代码块
  const codeArr = text.match(CODE);
  if (codeArr) {
    const tempText = text.replace(CODE, '');
    return getNodeData('code', text, {
      tag: codeArr[0],
      language: tempText.split(/\s{1,}/g).find(ele => !!ele) || '',
    });
  }

  // 无序列表 ul
  const ulArr = text.match(UL);
  if (ulArr) {
    const tempText = text.replace(ulArr, '');
    if (tempText.match(BEGIN_SPACE) || BLANK.test(tempText)) {
      const exactText = tempText.replace(/^\s{1}/, '');
      return getNodeData('ul', exactText, {
        indentation:
          (sourceText.match(BLANK) && sourceText.match(BLANK)[0].length) || 0,
      });
    }
  }

  // 有序列表 ol
  const olArr = text.match(OL);
  if (olArr) {
    const tempText = text.replace(olArr, '');
    if (tempText.match(BEGIN_SPACE) || BLANK.test(tempText)) {
      const exactText = tempText.replace(/^\s{1}/, '');
      // matchNum匹配到的序号数字，indentation缩进的空格数
      return getNodeData('ol', exactText, {
        matchNum: olArr[0].slice(0, -1),
        indentation:
          (sourceText.match(BLANK) && sourceText.match(BLANK)[0].length) || 0,
      });
    }
  }

  // 表格 table：可分为3个部分 表头，文本样式（文字布局），子元素
  const tableArr = text.match(TABLE);
  if (tableArr) {
    let colArr = trim(tableArr[0], true).split('|');
    colArr = colArr
      .map(item => {
        return trim(item, true, true);
      })
      .slice(1, -1);
    // 判断是不是style
    let flag = true;
    const styleArr = [];
    for (let i = 0; i < colArr.length; i++) {
      const item = colArr[i];
      const testReg = /(^:{0,1})(-{1,})(:{0,1}$)/;
      const left = /^:{1}/;
      const right = /:{1}$/;
      if (!testReg.test(item)) {
        flag = false;
        break;
      }
      styleArr.push(
        left.test(item)
          ? right.test(item)
            ? { middle: true }
            : { left: true }
          : right.test(item)
          ? { right: true }
          : { left: true }
      );
    }
    return getNodeData(
      'table',
      text,
      flag ? { data: styleArr, style: true } : { data: colArr }
    );
  }

  // 图片
  const imageArr = text.match(IMAGE);
  if (imageArr) {
    return getNodeData('image', text, { data: imageArr });
  }

  // 链接
  const linkArr = text.match(LINK);
  if (linkArr) {
    return getNodeData('link', text, { data: linkArr });
  }

  return getNodeData('text', text);
}

// 去除文本前的空格，behind为true则为去除后面的空格，默认去除前面的空格
function trim(text, behind = false, both = false) {
  if (behind) {text = text.replace(/\s*$/, '')} else{
    text = text.replace(/^\s{0,}/, '')
  }
  if (both) text = text.replace(/(^\s*)|(\s*$)/, '');
  return text;
}

export { getNode, trim };
