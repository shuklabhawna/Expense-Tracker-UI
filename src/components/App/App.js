import React, { Component } from "react"


import MainPanel from './MainPanel';
import User from './User';
import ExpenseType from './ExpenseType';
import ExpenseDetails from './ExpenseDetails';
import Home from './Home';

import Accounts from './Accounts';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ExpenseTracker from "./ExpenseTracker";



class App extends Component{
    
    state = { }

    render(){
       
       return(
        <React.Fragment>
        <Router>
          
  <MainPanel />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/users"  component={User} />
            {/* <Route path="/logout"  component={ExpenseTracker} /> */}
            <Route path="/accounts"  component={Accounts} />
            <Route path="/expenseDetails"  component={ExpenseDetails} />
            <Route path ="/expenseTypes" component={ExpenseType} />
            <Route path ="/home" component={Home} />
          </Switch>
        </Router>
      </React.Fragment>
        );
    }
}
export default App ;