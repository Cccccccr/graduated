const initState = {
  avatar: null,
  commitAuth: null,
  commitScore: null,
  email: '',
  name: null,
  userId: '',
  hadCheckLogin: false,
};

// 初始化复制只有在@@INIT的时候会用到，以后都是带最新的state值
const user = function (state = initState, action) {
  const { type, payload } = action;
  console.log(type, payload, 'user');
  const handle = {
    INIT_USER_DATA: () => {
      return { ...state, ...payload };
    },
    SET_USER_CHECK_LOGIN: {
      ...state,
      hadCheckLogin: payload,
    },
  };
  return handle[type]
    ? typeof handle[type] === 'function'
      ? handle[type]()
      : handle[type]
    : state;
};

export default user;
