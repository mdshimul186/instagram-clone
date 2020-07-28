import {FETCH_POSTS, POST_ERROR, MY_POST, FETCH_LIKE, DELETE_POST, FETCH_COMMENT}  from './type'
import axios from 'axios'

export const fetchPost = ()=>dispatch=>{
axios.get('/posts/getall')
.then(user=>{
    dispatch({
        type: FETCH_POSTS,
        payload: {
            post: user.data.post
        }
    })
    
})
.catch(err=>console.log(err)
)
}

export const submitPost =( post, history)=>dispatch=>{
        axios.post('/posts/create', post)
            .then(post => {
                if(post.data.success){
                    dispatch({
                        type: FETCH_POSTS,
                        payload: {
                            post: [post.data.post]
                        }
                    })
                    history.push('/')
                }else{
                    dispatch({
                        type: POST_ERROR,
                        payload: post.data
                    })
                }               
            })
            .catch(err=>console.log(err)
            )
    
    
}

export const mypost =() => dispatch => {
    axios.get('/posts/mypost')
    .then(post=>{
        dispatch({
            type: MY_POST,
            payload: post.data.post
        })
    })
    .catch(err => console.log(err))

}

export const likes = (id) => dispatch =>{
    axios.put('/posts/like/'+id)
    .then(post=>{
        console.log(post.data);
        dispatch({
            type: FETCH_LIKE,
            payload: post.data
            
        })
    })
    .catch(err => console.log(err))
}

export const unlikes = (id) => dispatch => {
    axios.put('/posts/unlike/' + id)
        .then(post => {
            console.log(post.data);
            dispatch({
                type: FETCH_LIKE,
                payload: post.data

            })
        })
        .catch(err => console.log(err))
}

export const deletePost = id => dispatch => {
    axios.delete('/posts/delete/'+id)
    .then(post=>{
        dispatch({
            type: DELETE_POST,
            payload: post.data
        })
    })
    .catch(err => console.log(err))
}

export const comment = (id, commentBody) => dispatch => {
    axios.put('/posts/comment/'+id, commentBody)
    .then(post => {
            console.log(post.data);
            dispatch({
                type: FETCH_LIKE,
                payload: post.data

            })
        })
        .catch(err => console.log(err))

}

export const deletecomment = (postid, commentId) => dispatch =>{
    axios.patch(`/posts/comment/delete/${postid}/${commentId}`)
    .then(post=>{
        console.log(post);
        dispatch({
            type: FETCH_COMMENT,
            payload: {
                postId: postid,
                commentArray: post.data
            }
        })
    })
    .catch(err=>console.log(err))
}