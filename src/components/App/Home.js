import React, { Component } from "react"

import logo from '../../images/logo.PNG';
class Home extends Component{
    state = { }

    render(){
       return(
        <div class="App-logo-new ">
          <img src={logo} alt="Logo" />;
        </div>
        );
    }
}
export default Home ;