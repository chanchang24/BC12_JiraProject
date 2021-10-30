import callApi from "utils/callApi";


const userApi={
    loginApi: (user,token) => {
        return callApi("Users/signin", "POST", user,token);
    },
}
export default userApi;