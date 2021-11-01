import userApi from "apis/userApi";
const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CHECK_USER_SAVE } = require("./type");

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

export const actLogin = (user,history,isLogined, isRegister,token) => {
    return dispatch => {
        dispatch(actLoginRequest());
        userApi
      .loginApi(user)
      .then((res) => {
        dispatch(actLoginSuccess(res.data));
        if (isLogined) {
          localStorage.setItem("userLogin", JSON.stringify(res.data));
        }
        if(isRegister){
          history.push('/');
        }
        else{
          history.goBack();
        }
        
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