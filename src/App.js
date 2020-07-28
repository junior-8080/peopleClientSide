import React from 'react';
import {Switch,Route} from "react-router-dom";

import Home from "./components/Homepage";
import Signup from "./components/Signup";
import Signin  from "./components/Signin";
import Account from "./components/Account";
import Overview from "./components/Overview";
import './App.css';
import SendMessage from './components/SendMessage';

function App() {
  return(
    <div className="App">
      <Switch>
        <Route path = "/" exact component = {Home} />
        <Route path = "/signup" component = {Signup} />
        <Route path = "/signin" component = {Signin} />
        <Route path = "/account" component = {Account}/>
        <Route path = "/overview/:id" component = {Overview} />
        <Route path = "/message"  component = {SendMessage} />        
      </Switch>
    </div>
  )
}

export default App;
