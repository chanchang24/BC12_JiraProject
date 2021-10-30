import userApi from "apis/userApi";
const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } = require("./type");

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

export const actLogin = (user,history,token) => {
    return dispatch => {
        dispatch(actLoginRequest());
        userApi.loginApi(user,token)
        .then(res => {
            dispatch(actLoginSuccess(res.data.content));
            history.push('/');
        })
        .catch(()=> {
            dispatch(actLoginFail('Unable to login'));
        })
    }
}
export const actLogout =() =>({
    type : LOGOUT,
    payload :null,
})