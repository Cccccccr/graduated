import React, { Component } from "react";
import { connect } from "react-redux";
import { loadPosts } from "../redux/actions/post_action";

function mapStateToProps(state) {
  return {
    post: state.post,
  };
}

function mapDispatchToProps(dispatch) {
  return {dispatch};
}

class post_list extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    this.props.dispatch(loadPosts);
  }

  getRenderList() {
    const { list } = this.props.post;
    const Posts = list.map((post, index) => {
      return <li key={index}>{post.title}</li>;
    });
    return Posts;
  }

  render() {
    const Posts = this.getRenderList();
    return (
      <div>
        <ul>{Posts}</ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(post_list);
