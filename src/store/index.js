import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducers from './reducers/rootReducer'

const middleware = [thunk]

let store = createStore(rootReducers, compose(
    applyMiddleware(...middleware)
     // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store