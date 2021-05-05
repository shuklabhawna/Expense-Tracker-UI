import React, { Component } from "react"
class Accounts extends Component{
    state = { 
        isLoading : true,
        accounts : [] 
    }
async componentDidMount(){
    const response = await fetch('/accounts/list');
    const respBody = await response.json();
    this.setState({accounts : respBody, isLoading: false});
}

    render(){
        const {isLoading, accounts } = this.state;
        
        if(isLoading)
           
                <div>Loading...</div>
           let accountsDetailsRow = accounts.map( account => 
            <tr key={account.id}>
                <td> {account.user.name}</td>
                <td> {account.accountCode} </td>
                <td> {account.currency.currencyName} </td>
                <td> {account.balance} </td>
            </tr>
            )
            return(
                <div class="userDiv">
                    
                    <table border="1">
                    <th colSpan="5"><h3>Accounts</h3></th>
                        <tr style={{'backgroundColor':'#81a8f8'}}>
                           
                            <td>User</td>
                            <td>Account Code</td>
                            <td>Currency</td>
                            <td>Balance</td>
                        </tr>
                        {accountsDetailsRow}
                    </table>
                   
                   
                </div>
            );
       
        
    }
}
export default Accounts ;