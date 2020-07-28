import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import{connect} from 'react-redux'
import {fetchProfile} from '../../store/action/authAction'
import {mypost} from '../../store/action/postAction'
import axios from 'axios'
import store from '../../store'
import * as Types from '../../store/action/type'

import {Spinner} from 'react-bootstrap'

function Home(props) {
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [isLogged, setIsLogged] = useState(false)
const [profile, setProfile] = useState('')
const [profileImg, setProfileImg] = useState('')
const [message , setMessage] = useState('')


useEffect(()=>{
    setTimeout(() => {
        setMessage('')
    }, 2000);
},[message])

useEffect(()=>{
    setProfile(props.user.profileImg)
}, [props.user.profileImg])

 useEffect(()=>{
     setName(props.user.user.name)
     setEmail(props.user.user.email)
     setIsLogged(props.user.isAuthenticated ? true: false)

 }, [props.user.user])


let history = useHistory()

const changeProfileImage = (event) => {
    
    setProfileImg(event.target.files[0])
}

const submitProfile = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('profile', profileImg)

    axios.put('/users/profile', formData)
        .then(user => {
            
            setMessage(user.data.message)
            if(user.data.success){
                 store.dispatch({
                     type: Types.FETCH_PROFILEIMG,
                     payload: user.data.user.profile
                 })
            }
           
            
        })
        .catch(err => console.log(err))
}

useEffect(() => {
    props.fetchProfile()
    props.mypost()
},[])

    return (
        <div className='container'>   
        
          {
              (message !== '') ? <p className='text-danger'>{message}</p> : null             
          }  
        
        <div className='row mt-5'>
            <div className='col-6'>
                <img className='imgh' src={profile}></img>
                <form encType='multipart/form-data' method='post' onSubmit={submitProfile} className='my-3'>
                    <div className='form-group'>
                        <input type='file' className='form-control-file' name='profile' onChange={changeProfileImage}></input>
                        <button type='submit' className='btn btn-primary my-3'>
                        Change Picture
                        {/* {profile == profileImg &&
                        <Spinner animation='border'/>
                        } */}
                        </button>
                    </div>
                </form>
            </div>
            <div className='col-6'>
                  {
                (isLogged) ? <div>
                <p>name: {name}</p>
                <p>Email: {email}</p>
                 
                  </div> :<button onClick={()=>{
                      history.push('/login')
                  }}>login</button>}
            </div>
        </div> 
        
          <hr/>

          

        


          { (props.post.mypost.length > 0) ?
              props.post.mypost.map(post=>{
              return(
                  <div key={post._id} className='card my-3'>
                  <div className='card-body'>
                  Posted By: <strong>{post.postedBy.name}</strong> 
                  {
                    (post.photo !== 'no photo')?
                    <img src={post.photo} className='card-image-top postimg'></img> : null
                    }
                   <h5>{post.title}</h5>
                   <p>{post.body}</p>
                   </div>
                  </div>
              )
          }):
           <p>No posts found
           <Spinner animation='border' /></p>
          }

          
            
        </div>
    )
}
let mapStateToProps = state => ({
    user: state.auth,
    post: state.post
})
export default connect(mapStateToProps,{fetchProfile, mypost})(Home)