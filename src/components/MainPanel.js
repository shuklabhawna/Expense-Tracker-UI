import React from "react";

import {BrowserRouter, Switch, Route,Nav,NavLink} from 'react-router-dom';
import Home from "./Home";
import Accounts from "./Accounts";
import User from "./User";
import ExpenseDetails from "./ExpenseDetails";
import ExpenseType from "./ExpenseType";
import { getUser, removeUserSession } from '../Utilities/Common';
import PublicRoute from '../Utilities/PublicRoute';
import Logout from "../Functions/Logout";


function MainPanel (props){
    const user = getUser();
 
    // handle click event of logout button
    const handleLogout = () => {
      removeUserSession();
      props.history.push('/login');
    }
    

        return (
            <div id="menus" class="navbar"> 
           Welcome {user.username}!
              
                <h2 class="App-header-panel">Expense Tracking Application</h2>
                
                  

<BrowserRouter>
        <div>
          <div className="header">
         
            <NavLink activeClassName="active" to="/home">Home</NavLink>
            <NavLink activeClassName="active" to="/users">Users</NavLink>
            <NavLink activeClassName="active" to="/accounts">Accounts</NavLink>
            <NavLink exact activeClassName="active" to="/expenseDetails">Expenses</NavLink>
            <NavLink activeClassName="active" to="/expenseTypes">ExpenseTypes</NavLink>
            
            <input class="linkButton"  type="button" onClick={handleLogout} value="Logout" />
            {/* <NavLink  onClick={handleLogout}>
            Logout
            </NavLink> */}
        
            {/* <NavLink activeClassName="active" onClick={handleLogout}>Logout</NavLink> */}
            
          </div>
          <div className="content">
            <Switch>
            <Route path="/users"  component={User} />
            <Route path="/accounts"  component={Accounts} />
            <Route path="/expenseDetails"  component={ExpenseDetails} />
            <Route path ="/expenseTypes" component={ExpenseType} />
            <Route path ="/home" component={Home} />
            
              
            </Switch>
          </div>
        </div>
      </BrowserRouter>
                  
            </div>
          );
    

}
export default MainPanel;