import React, { Component } from "react"

import logo from '../../images/logo.PNG';

class Login extends Component{
   
  emptyItem = {
    username: "",
      password:""
    
}
  constructor(props) {
    
    super(props)

    this.state = {
      isLoading: true,
      credentials: this.emptyItem
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let credentials = {...this.state.credentials};
    credentials[name]= value;
    this.setState({credentials});
}


    async handleSubmit () {
      const credentials =  this.state.credentials;

      await fetch('/login', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      }).then(data => { 
        if(data.token){
          alert( data.json());
         }
       });

    };



    render(){
      return(
        <div className="login-wrapper">
          <h1>Please Log In</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              <p>Username</p>
              <input type="text" onChange={this.handleChange} />
            </label>
            <label>
              <p>Password</p>
              <input type="password" onChange={this.handleChange} />
            </label>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      )
    }
}
export default Login ;