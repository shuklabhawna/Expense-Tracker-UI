import React from "react"
import logo from '../images/logo.PNG';

function Home (){
   
      return(
        <div>
        <div class="App-logo-txt"><h3> Welcome to Expense Tracking Application</h3></div>
        
      <div class="App-logo-new">
        
        <img src={logo} alt="Logo"/>;
      </div>
      </div>
      );
    
}
export default Home ;