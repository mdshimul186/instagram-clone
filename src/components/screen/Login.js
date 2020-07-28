import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import {login} from '../../store/action/authAction'

 function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})
   
    const data = (e)=>{
        e.preventDefault()
        let user = {
            email,
            password,
        }
       
        props.login(user, props.history)
        
       
    }
    useEffect(()=>{
        setError(props.user.error.login)
    }, [props.user.error.login])
    return (
        <div className='container'>
        <div className='row'>
            <div className='col-md-8 offset-md-2 card mt-5 p-3'>
                <form onSubmit={data}>
            <h1 className='display-4 text-center'>Login Here</h1>
            {
                        (error.message == null) ? null :
                         <p className='text-danger'>{error.message}</p>
                    }
                
                <div className='form-group'>
                    <label>email</label>
                    <input onChange={(e)=>setEmail(e.target.value)} type='text' className='form-control'></input>
                    {
                        (error.email == null) ?
                        null: 
                         <p className='text-danger'>{error.email}</p>
                    }
                   
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} type='password' className='form-control'></input>
                    {
                        (error.password == null) ? null :
                         <p className='text-danger'>{error.password}</p>
                    }
                </div>
                
                <button type='submit' className='btn btn-primary'>Login</button>
            </form>
            </div>
        </div>
            
        </div>
    )
}
const mapStatesToProps = state => ({
    user: state.auth
})
export default connect(mapStatesToProps,{login})(Login)