const initState = { list: [ { title: 'Hello'} ] };

const postReducer = function(state = initState, action) {
    const { type, payload } = action;
    // console.log(payload, state, 'postReducer');
    switch(type) {
      case 'LOAD_POSTS':
        return {
          ...state,
          list: payload,
        }
      default:
        return state
    }
};

export default postReducer;
