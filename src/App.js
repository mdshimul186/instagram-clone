import React from 'react';
import './App.css';
import Home from './components/screen/Home'
import Profile from './components/screen/Profile'
import Login from './components/screen/Login'
import  Register from './components/screen/Register'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import CreatePost from './components/screen/Post'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route  path='/profile' component={Profile} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/post' component={CreatePost} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
