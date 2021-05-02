import React, { Component } from 'react';
import Editor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import Interpreter from './Interpreter'
import 'react-markdown-editor-lite/lib/index.css';

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

  handleEditorChange = ({html, text}) => {
    // console.log(typeof html);
    // console.log(html, text);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Get value</button>
        <Editor
          ref={this.mdEditor}
          style={{
            height: '100%',
          }}
          renderHTML={text => <Interpreter source={text} />}
          // renderHTML={text => <ReactMarkdown source={text} />}
          onChange={this.handleEditorChange}
        />
      </div>
    );
  }
}

export default MarkDown;
