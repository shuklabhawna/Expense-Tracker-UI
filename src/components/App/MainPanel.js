import React, { Component } from "react"
import {Nav,NavItem,NavLink} from "reactstrap"

class MainPanel extends Component{

    state = { 
      
    }
    render(){

        return (
            <div id="menus" class="navbar"> 
          
              
                <h2 class="App-header-panel">Expense Tracking Application</h2>
                
                  <Nav class="App-menu">
                    
                  {/* <NavItem>
                        <NavLink href="/logout"><b>Logout</b></NavLink>
                    </NavItem> */}
                    <NavItem>
                        <NavLink href="/expenseDetails"><b>Expenses</b></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/expenseTypes"><b>ExpenseTypes</b></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/accounts"><b>Accounts   </b></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/users" ><b>Users</b></NavLink> 
                    </NavItem>
                    <NavItem>
                      <NavLink href="/home"><b>Home</b></NavLink>
                    </NavItem> 
                  </Nav>
            </div>
          );
    }

}
export default MainPanel;