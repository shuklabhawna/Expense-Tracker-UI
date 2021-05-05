import React, { useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '../../css/App.css';
import Dashboard from '../Dashboard/Dashboard';

import Preferences from '../Preferences/Preferences';
import Login from './Login';

import MainPanel from './MainPanel';


function ExpenseTracker() {
  const [token, setToken] = useState();

  propTypes.token = "0a62a908-d1a4-4969-aebe-b7eda2bd6453";

  if(!token) {
    return <Login setToken={setToken} />
  }else{
    return <MainPanel/>
  }

//   return (
//    <div>
//        <MainPanel/>
//    </div>
//   );
}

export default ExpenseTracker;