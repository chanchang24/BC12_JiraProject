import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./type";

const initialState = {
    currentUser: null,
    userRegister: null,
    isRegister: false,
    isLogined: true,
    error: "",
    loading: false,
}

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loadding: false,
                userRegister: null,
                isRegister: false,
                currentUser: payload,
                error: "",
            };
        case LOGIN_FAIL:
            return { ...state, loading: false, error: payload }
        case LOGOUT:
            return { ...state, currentUser: payload }
        default:
            return state
    }
}
export default authReducer;

