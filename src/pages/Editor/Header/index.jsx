import React, { Component } from 'react';
import { Input } from 'antd';
import { Button } from 'antd';
import { editorType } from '../../../enum';
import './index.less';

export class EditorHeader extends Component {
  state = {
    title: '',
    type: '',
  };

  componentDidMount() {
    console.log(this.props.type)
    const type = `输入${
      this.props.type === editorType.article ? '文章' : '问题'
    }标题...`;
    this.setState({ type });
  }

  handleRelease = () => {
    this.props.release && this.props.release(this.state.title);
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  render() {
    const { title } = this.state;
    return (
      <div className="Editor-Header">
        <div className="title-container">
          <Input
            placeholder={this.state.type}
            size="large"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <Button type="primary" onClick={this.handleRelease}>
          发布
        </Button>
      </div>
    );
  }
}

export default EditorHeader;
