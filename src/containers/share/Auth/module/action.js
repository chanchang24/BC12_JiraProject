import userApi from "apis/userApi";
const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CHECK_USER_SAVE, REGISTER_REQUEST, REGISTER_SUCESS, REGISTER_FAIL } = require("./type");

const actLoginRequest = () => ({
    type: LOGIN_REQUEST,
});
const actLoginSuccess = (currentUser) => ({
    type: LOGIN_SUCCESS,
    payload: currentUser,
});

const actLoginFail = error => ({
    type: LOGIN_FAIL,
    payload: error,
})


export const actSaveUserCheck = (isCheck) => {
    return (dispatch) => {
      dispatch({ type: CHECK_USER_SAVE, payload: isCheck });
    };
  };

export const actLogin = (user) => {
    return dispatch => {
        dispatch(actLoginRequest()); 
        userApi
      .loginApi(user)
      .then((res) => {
        dispatch(actLoginSuccess(res.data));
        
      })
      .catch((error) => {
        dispatch(
          actLoginFail("Tài khoản hoặc mật khẩu không đúng. Xin hãy thử lại!")
        );
      });
    }
}

export const actLogout =() =>({
    type : LOGOUT,
    payload :null,
})

// Register

const actRegisterRequest = () => ({
  type: REGISTER_REQUEST,
});
const actRegisterSuccess = (newUser) => ({
  type: REGISTER_SUCESS,
  payload: newUser,
});
const actRegisterFail = (error) => ({
  type: REGISTER_FAIL,
  payload: error,
});

export const actRegister = (newUser) => {
  return (dispatch) => {
    dispatch(actRegisterRequest());
    userApi
      .registerApi(newUser)
      .then((res) => {
        dispatch(actRegisterSuccess(res.data));
      })
      .catch((err) => {
        dispatch(
          actRegisterFail("Đăng ký tài khoản không thành công. Hãy thử lại với một tên tài khoản khác")
        );
      });
  };
};