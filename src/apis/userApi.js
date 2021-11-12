import callApi from "utils/callApi";


const userApi={
    loginApi: (user,token) => {
        return callApi("Users/signin", "POST", user);
    },
    registerApi: (newUser) => {
        return callApi("Users/signup", "POST", newUser);
      },
}
export default userApi;