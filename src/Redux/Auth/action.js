import axios from "axios"
import * as types from "./actionTypes"

export  const getloginreq=()=>{
    return { type:types.GET_LOGIN_REQUEST }
}

export const getloginsucc=(payload)=>{
    return { type:types.GET_LOGIN_SUCCESS,payload }
}
export const getloginfail=()=>{
    return { type:types.GET_LOGIN_FAILURE }
}
export  const getregisterreq=()=>{
    return { type:types.GET_REGISTER_REQUEST }
}

export const getregistersucc=(payload)=>{
    return { type:types.GET_REGISTER_SUCCESS,payload }
}
export const getregisterfail=()=>{
    return { type:types.GET_REGISTER_FAILURE }
}
export const getlogout =()=>{
    return { type:types.GET_LOGOUT }
}

export const getregister=(data)=>(dispatch)=>{
    dispatch(getregisterreq())
    if(data){
        const payload={
        email:data.email,
        password:data.password
        }

        return axios.post(`http://localhost:3000/register`,payload)
        .then((r)=>{
            dispatch(getregistersucc(r.data))
        })
        .catch((e)=>{
            dispatch(getregisterfail())
        })
    }
}

export const getLogin=(data)=>(dispatch)=>{
    dispatch(getloginreq())
    if(data){
        const payload={
        email:data.email,
        password:data.password
        }

        return axios.post(`http://localhost:3000/login`,payload)
        .then((r)=>{
            dispatch(getloginsucc(r.data))
         
        })
        .catch((e)=>{
            dispatch(getloginfail())
        })
    }
}