import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Markdown from '../Markdown';
import routeUtil from '@router/routeUtil';
import { editorType } from '../../enum';
import './index.less';

export class Editor extends Component {
  constructor(props) {
    super(props);
    this.markdown = React.createRef();
    this.state = {
      type: editorType.article,
    };
  }

  componentDidMount() {
    const params = routeUtil.getSearchParams(this.props.location.search);
    console.log(params);
    this.setState({ type: params.type || editorType.article });
  }

  release = title => {
    const text = this.markdown.current && this.markdown.current.getMdValue();
    console.log(text);
  };

  render() {
    return (
      <div className="EDITOR">
        <Header release={this.release} type={this.state.type}/>
        <div className="markdown-container">
          <Markdown ref={this.markdown} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
