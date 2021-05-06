import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './search.less';
const InputGroup = Input.Group;

export default class Search extends Component {
  state = { value: '', focus: false };

  handleInputChange = e => {
    console.log(e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  handleFocusBlur = e => {
    this.setState({
      focus: e.target === document.activeElement,
    });
  };
  handleSearch = () => {
    console.log('search');
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value);
    }
  };
  render() {
    const searchCls = [
      'ant-search-input',
      this.state.focus ? 'ant-search-input-focus' : '',
    ].join(' ');
    const btnCls = ['ant-search-btn'].join('');
    const size = '';
    const placeholder = '搜索';

    return (
      <div>
        <InputGroup className={searchCls}>
          <Input
            placeholder={placeholder}
            value={this.state.value}
            onChange={this.handleInputChange}
            onFocus={this.handleFocusBlur}
            onBlur={this.handleFocusBlur}
            onPressEnter={this.handleSearch}
          />
          <div className="ant-input-group-wrap">
            <Button
              icon={<SearchOutlined />}
              className={btnCls}
              size={size}
              onClick={this.handleSearch}
            />
          </div>
        </InputGroup>
      </div>
    );
  }
}
