import React, { Component } from 'react';
import Editor from 'react-markdown-editor-lite';
import Interpreter from './Interpreter';
import 'react-markdown-editor-lite/lib/index.css';
import './index.less';

class MarkDown extends Component {
  constructor(props) {
    super(props);
    this.mdEditor = React.createRef();
    this.state = {};
  }

  handleClick = () => {
    if (this.mdEditor.current) {
      alert(this.mdEditor.current.getMdValue());
    }
  };

  getMdValue = () => {
    return this.mdEditor.current.getMdValue();
  };

  handleEditorChange = ({ html, text }) => {};

  render() {
    return (
      <div className="MarkDown">
        {/* <button onClick={this.handleClick}>Get value</button> */}
        <Editor
          ref={this.mdEditor}
          className="markdown-main"
          style={{
            height: '100%',
            width: '100%',
          }}
          renderHTML={text => <Interpreter source={text} />}
          onChange={this.handleEditorChange}
        />
      </div>
    );
  }
}

export default MarkDown;
