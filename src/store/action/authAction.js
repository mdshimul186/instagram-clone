import * as Types from '../action/type'
import axios from 'axios'
import {setToken} from '../../util/setToken'

export const register = (user, history)=>dispatch=>{
    axios.post('/users/register', user)
    .then(user=>{
        
        dispatch({
            type: Types.REGISTER_USER,
            payload: user.data
        })

        if (user.data.message === 'Register successfull') {
            history.push('/login')
        }
        //
        
    })
    .catch(err=>console.log(err)
    )
    
}

export const login = (user, history) => dispatch =>{
    axios.post('/users/login', user)
    .then(res=>{
        
        const token = res.data

        if(res.data.success){
            localStorage.setItem('auth-token', token.token)
            dispatch({
                type: Types.LOGIN_USER,
                payload: {
                    user: res.data.user,
                    error: {}
                }
            })
            setToken()
            fetchProfile()
            history.push('/')
        }else{
            dispatch({
                 type: Types.LOGIN_USER,
                     payload: {
                         user:{},
                         error: res.data
                     }
            })
        }
        
    })
    .catch(err=>console.log(err)
    )
}

export const fetchProfile = () =>dispatch=>{
    axios.get('/users/profile')
    .then(user=>{
        dispatch({
            type: Types.FETCH_PROFILEIMG,
            payload: user.data.profile
        })
    })
    .catch(err => console.log(err))
}

