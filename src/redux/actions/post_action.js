import { getPostRequest } from "../../services";

const loadPosts = async dispatch => {
    const res = await getPostRequest();
    dispatch({
      type: 'LOAD_POSTS',
      payload: res.data
    });
}

export {
    loadPosts
};