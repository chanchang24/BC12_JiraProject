import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCESS } from "./type";

const initialState = {
    currentUser: null,
    userRegister: null,
    isRegister: false,
    isLogined: true,
    error: "",
    loading: false,
    accessToken: "",
}

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:

            return {
                ...state, loading: false,
                userRegister: null,
                isRegister: false,
                currentUser: payload,
                error: "",
                accessToken: payload.content.accessToken,
            };
        case LOGIN_FAIL:
            return { ...state, loading: false, error: payload }
        case LOGOUT:
            return { ...state, currentUser: payload }
        case REGISTER_REQUEST:
            return { ...state, loadding: true };
        case REGISTER_SUCESS:
            const userAccount = payload.taiKhoan;
            const userPassword = payload.matKhau;
            const newUser = {
                taiKhoan: userAccount,
                matKhau: userPassword,
            };
            return {
                ...state,
                loadding: false,
                isRegister: true,
                error: "",
                userRegister: newUser,
            };
        case REGISTER_FAIL:
            return { ...state, loadding: false, isRegister: false, error: payload };
        default:
            return state;

    }
}
export default authReducer;

