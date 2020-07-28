import React from 'react'
import {connect} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import store from '../store'
import * as Types from '../store/action/type'
import axios from 'axios'


function Navbar(props) {
    let history = useHistory()
     const clearStorage = () => {
         localStorage.clear()
         history.push('/login')
         store.dispatch({
           type: Types.LOG_OUT
         })
         axios.defaults.headers.common['Authorization'] = ''
     }
    return (
        <nav className="navbar navbar-expand navbar-dark bg-primary">
  <Link to='/' className="navbar-brand">
        Instagram
  </Link>
  
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      
      {
          (!props.user.isAuthenticated) &&
          <>
                <li className="nav-item">
        <Link className="nav-link mr-0" to='/login'>Login</Link>
      </li>
     
      <li className="nav-item">
        <Link className="nav-link mr-0" to='/register'>Register</Link>
      </li>
          </>
      }

      {
          (props.user.isAuthenticated) &&
          <>
          <li className="nav-item ">
        <Link className="nav-link " to='/profile'>Profile</Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link " to='/post'>Create Post</Link>
      </li>
             <li className="nav-item">
        <button onClick={clearStorage} className="btn btn-danger btn-sm" to='/register'>Logout</button>
      </li> 
          </>
      }
      
    </ul>
    
  </div>
</nav>
    )
}

let mapStateToProps = state =>({
    user: state.auth
})
export default connect(mapStateToProps)(Navbar)
