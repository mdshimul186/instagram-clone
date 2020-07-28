import * as Types from '../action/type'

let init = {
    post: [],
    mypost: [],
    error: {},
}

function postReducer(state=init, action){
switch (action.type) {
    case Types.FETCH_POSTS:
        return{
            ...state,
            post: [ ...action.payload.post],
            error: {}
        }
    case Types.MY_POST:
        return{
            ...state,
            mypost: action.payload
        }
    case Types.POST_ERROR:
        return{
            ...state,
            error: action.payload
        }
    case Types.FETCH_LIKE:
        let index = state.post.findIndex(post=>post._id === action.payload._id)
        state.post[index] = action.payload 
        return{
            ...state
        }
    case Types.DELETE_POST:
        let indexpost = state.post.findIndex(post=>post._id === action.payload._id)
        state.post.splice(indexpost, 1)
        return{
            ...state
        }
    case Types.FETCH_COMMENT:
        let indexpostcomment = state.post.findIndex(post=>post._id === action.payload.postId)
        state.post[indexpostcomment].comment = action.payload.commentArray
        return{
            ...state
        }
    default:
        return state
}
}

export default postReducer