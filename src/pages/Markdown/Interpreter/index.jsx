import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
// import { transformText } from './transformText';

class Interpreter extends Component {
  render() {
    const { source } = this.props;
    // console.log(this.props.source);
    // transformText(source);
    return (
      <>
        {/* <div>{SimpleRenderer()}</div>
        <p>{"&nbsp;&nbsp;nide" + "\n" + "\*"}</p>
        <div>分割线----------------</div>
        <div>{this.props.source}</div>
        <div>分割线----------------</div> */}
        <ReactMarkdown source={source} />
      </>
    );
  }
}

export default Interpreter;

// function Root(props) {
//   const { className } = props;
//   return className
//     ? React.createElement('div', { className }, props.children)
//     : React.createElement(React.Fragment, {}, props.children);
// }

// // 文本渲染
// class Text extends Component {
//   render() {
//     return this.props.children || '';
//   }
// }
// function TextRenderer(props) {
//   return props.children || '';
// }

// function SimpleRenderer() {
//   return React.createElement(
//     'p',
//     null,
//     React.createElement(React.Fragment, null, '()\nwode'),
//     React.createElement(React.Fragment, null, '')
//   );
// }

// 存储分行以后每一行得出的type数据结构，此时只区分以下type类型
// p：text文本 下面的全部没有匹配上才算是text done
// h1 - h6 done
// code：属性中有beginTag，用于去匹配下一个endTag，还有language（标识用的语言）done
// ul：无需列表，子元素为li done
// ol：有序列表，子元素为li done
// table：第一行为表头 done
// 引用：> done
// img：图片标签 可以当做行内元素去检测 done
// 链接：[]() done
// spaceCode：前面有四个空格的code代码块 done
// ---：分割线，前面必须为空行 done
// blank空行：>=0空格 done



/*
text下不能有INLINE_CODE
INLINE_CODE前必须为空元素或者空行
连个spaceCode中间的blank都是br
 */

/* 
text的规则要把整个text连成一块来进行判断，不能在text+text过程中直接加
br元素，而是通过判断/\s{2,}\/n/来判断，
判断br元素的优先级低于code image em
*/
