import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {submitPost} from '../../store/action/postAction'

 function CreatePost(props) {
    let history = useHistory()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [photo, setPhoto] = useState('')
    const [error, setError] = useState({})
   
    const postData = (e)=>{
        e.preventDefault()
        let formData = new FormData()
        formData.append('title', title)
        formData.append('body', body)
        formData.append('photo', photo)               
        props.submitPost(formData, history)
    }

useEffect(()=>{
    setError(props.post.error)
},[props.post.error])
    return (
        <div className='container'>
        <div className='row'>
            <div className='col-md-8 offset-md-2 card mt-5 p-3'>
                <form onSubmit={postData} encType='multipart/form-data'>
            <h1 className='display-4 text-center'>Post</h1>
            <p className='text-danger'>{error.message}</p>
                
                <div className='form-group'>
                    <label>title</label>
                    <input name='title' onChange={(e)=>setTitle(e.target.value)} type='text' className='form-control'></input>
                    
                </div>
                <div className='form-group'>
                    <label>Body</label>
                    <input name='body' onChange={(e)=>setBody(e.target.value)} type='text' className='form-control'></input>
                    
                </div>
                <div className='form-group'>
                    <label>Photo</label>
                    <input onChange={(e)=>setPhoto(e.target.files[0])} type='file' name='photo' className='form-control-file'></input>
                    
                </div>
                
                <button type='submit' className='btn btn-primary'>Submit Post</button>
            </form>
            </div>
        </div>
            
        </div>
    )
}
let mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, {submitPost})(CreatePost)


