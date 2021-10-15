const { type } = require("jquery")
const { ADD_USER_REQUEST, ADD_USER_SUCCESS } = require("./types")

const actUserRequest =()=>({
    type: ADD_USER_REQUEST
})

const actUserSuccess =(user)=>({
    type: ADD_USER_SUCCESS,
    payload:user
})