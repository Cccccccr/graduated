const initAdminData = (data = null) => {
  return async dispatch => {
    await Promise.resolve();
    dispatch(
      {
        type: 'INIT_ADMIN_DATA',
        payload: data,
      }
    );
  };
};

const setAdminCheckLogin = data => {
  return dispatch => {
    dispatch({
      type: 'SET_ADMIN_CHECK_LOGIN',
      payload: data,
    });
  };
};

const AdminAction = {
  initAdminData,
  setAdminCheckLogin,
};

export default AdminAction;
