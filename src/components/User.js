import React, { Component } from "react"


class User extends Component{

    emptyItem = {
        id: 0,
        userCode: "",
        name: "",
        email: "",
        
    }
    constructor(props) {
        super(props)

    this.state = { 
        isLoading : true,
        users : [] ,
        item: this.emptyItem
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.refresh = this.refresh.bind(this);
}
 

async componentDidMount(){
    const response = await fetch('/users/list',{
        method: "GET",
        headers: {
        //"Access-Control-Allow-Origin":"*",
        "content-type": "application/json"
        }
    });
    const respBody = await response.json();
    this.setState({users : respBody, isLoading: false});
}
 refresh(event){
    this.componentDidMount();
}
handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name]= value;
    this.setState({item});
}

handleEdit(event,data){
    let item = {...this.state.item};
    this.setState({item : data});
}



async handleSubmit(event){
    event.preventDefault();
    const item =  this.state.item;
    
    if(item["id"]<1){
        alert("Id must be a positive number above 0");
    }else{
        await fetch(`/users/save`,{
            method: "POST",
            headers: {
            //"Access-Control-Allow-Origin":"*",
            "content-type": "application/json"
            },
        
            body: JSON.stringify(item),
        }).then(()=> {
            this.setState({item: this.emptyItem});
            this.componentDidMount();
          });
    }
};
async deleteUser(id){
    await fetch(`/users/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Access-Control-Allow-Origin":"*",
            "content-type": "application/json"
            }
      }).then(()=> {

        let updatedUser =[...this.state.users].filter( i=> i.id !== id);
        this.setState({users: updatedUser});
      });
      
  };
  
    render(){
        const {isLoading, users } = this.state;
        const title = <h3>Add User</h3>

        if(isLoading)
                <div>Loading...</div>
            

        let userDetailsRow =users.map( user => 
            <tr key ={user.id}>
                <td> {user.id}</td>
                <td> {user.name} </td>
                <td> {user.email} </td>
                <td> <button style={{'backgroundColor':'lightgreen'}} onClick={(e) => this.handleEdit(e,user)}> Edit </button> </td>
                <td> <button style={{'backgroundColor':'red'}}onClick={() => this.deleteUser(user.id)}
                    > Delete</button> 
                
                </td>
            </tr>
            )    
       
            return(

                <div>
<container >
                    
                    <form id="userForm" onSubmit={this.handleSubmit}>
                        <table class="gridView">
                            <tr colSpan="4" style={{'textAlign':'center'}}> <td>{title} </td></tr>
                            <tr>
                                <td>
                                    <label for="id"> Id</label>
                                    </td><td>
                                    <input type="text" name="id" id="id" value={this.state.item.id} onChange={this.handleChange}></input>
                                </td>
                            </tr><tr>    
                                <td>
                                    <label for="userCode"> User Code</label>
                                    </td><td>
                                    <input type="text" name="userCode" id="userCode" value={this.state.item.userCode}  onChange={this.handleChange}></input>
                                </td>

                            </tr>
                            
                            <tr>
                                <td>
                                    <label for="name"> Name</label>
                                    </td><td>
                                    <input type="text" name="name" id="name" value={this.state.item.name}  onChange={this.handleChange}></input>
                                    
                                </td>
                                </tr><tr> 
                                <td>
                                    <label for="email"> Email</label>
                                    </td><td>
                                    <input type="text" name="email" id="email" value={this.state.item.email} onChange={this.handleChange}></input>
                                
                                </td>
                            </tr>
                            
                            <tr>
                                <tr></tr>
                                <td>
                                    <td>
                                    <button class=".btn_name" color="primary" type="submit">Save</button> 
                                    </td><td>
                                    <button color="secondary"  onClick={() => this.refresh()}>Cancel</button>
                                    </td>
                                   </td>
                            </tr>
                        </table>
                    </form>
                </container>

               
                <div class="userDiv">
                    <table border="1" >
                        <th colSpan="5"><h3>Users</h3></th>
                        <tr style={{'backgroundColor':'#81a8f8'}}>
                            <td>UserId</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td colSpan="2" style={{'textAlign':'center'}}>Actions</td>
                        </tr>
                        {userDetailsRow}
                    </table>
                    
                   
                </div>
                </div>  
            );
      
        
    }
}
export default User ;