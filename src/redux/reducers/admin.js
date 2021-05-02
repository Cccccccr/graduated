const initState = {
  account: '',
  role: [],
  hadCheckLogin: false
};

// 初始化复制只有在@@INIT的时候会用到，以后都是带最新的state值
const admin = function (state = initState, action) {
  const { type, payload } = action;
  console.log(type, payload, 'admin');
  const handle = {
    INIT_ADMIN_DATA: () => {
      return { ...state, ...payload };
    },
    SET_ADMIN_CHECK_LOGIN: {
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

export default admin;
