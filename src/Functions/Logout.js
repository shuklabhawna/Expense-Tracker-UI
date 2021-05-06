import React from "react"
import {  removeUserSession } from '../Utilities/Common';

import App from "./App";


function Logout(props){
   
    const handleLogout = () => {
      removeUserSession();
      props.history.push('/login');
      
    }

   
       return(
        <div >
          <App />;
        </div>
        );
    
}
export default Logout ;