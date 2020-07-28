import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import store from './store'
import * as Types from './store/action/type'
import axios from 'axios'
import jwt from 'jsonwebtoken'

 
let token = localStorage.getItem('auth-token')

 if(token){ 
   
  jwt.verify(token, 'SECRET', (err, decode) => {
    if (decode === undefined) {
     return localStorage.clear()
    }
    axios.defaults.headers.common['Authorization'] = token

    axios.get('/users/' + decode._id)
      .then(user => {
        store.dispatch({
          type: Types.FETCH_PROFILE,
          payload: user.data
        })
      })
      .catch(err => console.log(err))
  })
   
 }else{
   axios.defaults.headers.common['Authorization'] = ''
 }
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
