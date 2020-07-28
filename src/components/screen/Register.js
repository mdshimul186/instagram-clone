import React, { useState , useEffect} from 'react'
import {connect} from 'react-redux'
import {register} from '../../store/action/authAction'

 function Register(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState({})
   
    const data = (e)=>{
        e.preventDefault()
        let user = {
            name,
            email,
            password,
            confirmPassword
        }
       
        props.register(user, props.history)     
        
    }
    useEffect(() => {
        setError(props.user.error.register)
    },[props.user.error.register])
    return (
        <div className='container'>
        <div className='row'>
            <div className='col-md-8 offset-md-2 card mt-5 p-3'>
                <form onSubmit={data}>
            <h1 className='display-4 text-center'>Register Here</h1>
            {
                error.message &&
                <p className='text-danger'>{error.message}</p>
            }
                <div className='form-group'>
                    <label>Name</label>
                    <input onChange={(e)=>setName(e.target.value)} type='text' className='form-control'></input>
                    <p className='text-danger'>{error.name}</p>
                </div>
                <div className='form-group'>
                    <label>email</label>
                    <input onChange={(e)=>setEmail(e.target.value)} type='text' className='form-control'></input>
                    <p className='text-danger'>{error.email}</p>
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} type='password' className='form-control'></input>
                    <p className='text-danger'>{error.password}</p>
                </div>
                <div className='form-group'>
                    <label>Confirm Password</label>
                    <input onChange={(e)=>setConfirmPassword(e.target.value)} type='password' className='form-control'></input>
                    <p className='text-danger'>{error.confirmPassword}</p>
                </div>
                <button type='submit' className='btn btn-primary'>Register</button>
            </form>
            </div>
        </div>
            
        </div>
    )
}
const mapStatesToProps = state => ({
    user: state.auth
})
export default connect(mapStatesToProps,{register})(Register)