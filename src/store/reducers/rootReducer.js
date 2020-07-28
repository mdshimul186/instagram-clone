import {combineReducers} from 'redux'
import authReducers from './authReducers'
import postReducer from './postReducer'
let rootReducers = combineReducers({
    auth: authReducers,
    post: postReducer
})

export default rootReducers