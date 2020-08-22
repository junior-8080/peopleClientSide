import React from 'react';
import {Switch,Route, Redirect} from "react-router-dom";

import Home from "./components/Homepage";
import Signup from "./components/Signup";
import Signin  from "./components/Signin";
import Account from "./components/Account";
import Overview from "./components/Overview";
import SendMessage from './components/SendMessage';
import ResetForm from "./components/ResetForm";
// import isLogged from './action/isLogged';
import { connect } from 'react-redux';
import './App.css';


function App(props) {
  const isLogged = props.isLogged;
  return(
    <div className="App">
      {
        isLogged ?
        <Redirect to="/account" />
        :
        <Switch>
          <Route path = "/" exact component = {Home} />
          <Route path = "/signup" component = {Signup} />
          <Route path = "/signin" component = {Signin} />
        </Switch >
      }
      
        {
          isLogged ?
          <Switch>
            <Route path = "/account" component={Account} />
            <Route path = "/overview/:id" component = {Overview} />
            <Route path = "/message"  component = {SendMessage} />     
            <Route path = "/reset/:secret"  component = {ResetForm} />  
          </Switch>
          :
          <Redirect to="/" />
        }
        
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
      isLogged:state.isLogged,
      profile:state.saveProfile
  }
}
export default connect(mapStateToProps,null)(App);
