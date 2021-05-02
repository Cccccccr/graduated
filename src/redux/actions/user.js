const initUserData = (data = null) => {
  return dispatch => {
    dispatch({
      type: 'INIT_USER_DATA',
      payload: data,
    });
  };
};

const setUserCheckLogin = data => {
  return dispatch => {
    dispatch({
      type: 'SET_USER_CHECK_LOGIN',
      payload: data,
    });
  };
};

const UserAction = {
  initUserData,
  setUserCheckLogin,
};

export default UserAction;
