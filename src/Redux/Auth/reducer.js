import * as types from "./actionTypes"

const initState={
    isAuth:false,
    logindata:{},
    isLoading:false,
    isError:false
}

export const reducer=(state=initState,action)=>{
    const {type,payload}=action;

    switch(type){
        case types.GET_LOGIN_REQUEST:{
            return { ...state ,isLoading:true,logindata:{},isAuth:false }
        }
        case types.GET_LOGIN_SUCCESS:{
            return { ...state,isLoading:false, logindata:payload,isAuth:true}
        }
        case types.GET_LOGIN_FAILURE:{
            return { ...state,isError:true }
        }
        case types.GET_REGISTER_REQUEST:{
            return { ...state ,isLoading:true,logindata:{},isAuth:false }
        }
        case types.GET_REGISTER_SUCCESS:{
            return { ...state,isLoading:false}
        }
        case types.GET_REGISTER_FAILURE:{
            return { ...state,isError:true }
        }
        case types.GET_LOGOUT:{
            return{ ...state, isError:false,isAuth:false, token:{} }
        }

        default: return state
    }
}

