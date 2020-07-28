import * as Types from '../action/type'
import { register } from '../action/authAction'
 let init = {
    user: {},
    profileImg: '',
    error: {
        login:{},
        register:{}
    },
    isAuthenticated: false
}

function authReducers(state=init, action){
    switch (action.type) {
        case Types.REGISTER_USER:
            return{
                ...state,
                error: {...state.error, register: action.payload}
            }
        case Types.LOGIN_USER:
            return{
                user: action.payload.user,
                error: {...state.error, login: action.payload.error},
                isAuthenticated: Object.keys(action.payload.user).length !== 0
            }
        case Types.FETCH_PROFILE:
            return{
                ...state,
                user: action.payload,
                isAuthenticated: Object.keys(action.payload).length !== 0
            }
        case Types.LOG_OUT:
            return{
                user: {},
                error: {
                    login: {},
                    register: {}
                },
                isAuthenticated: false
            }
        case Types.FETCH_PROFILEIMG:
            return{
                ...state,
                profileImg: action.payload
            }
            
    
        default:
            return state;
    }
}

export default authReducers