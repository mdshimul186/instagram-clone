import axios from 'axios'
export let setToken= () => {
    let token = localStorage.getItem('auth-token')
    if(token){
        axios.defaults.headers.common['Authorization'] = token
    }else{
        axios.defaults.headers.common['Authorization'] = ''
    }
}