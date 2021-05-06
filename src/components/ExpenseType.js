import React, { Component } from "react"

class ExpenseType extends Component{
    state = { 
        isLoading : true,
        expenseTypes : [] ,
        error: ""
    }
async componentDidMount(){
    const response = await fetch('/expenseTypes/list');
    const respBody = await response.json();
    this.setState({expenseTypes : respBody, isLoading: false});
}
async deleteData(id){
    this.setState({error:""});
    await fetch(`/expenseTypes/delete/${id}`, {
        method: "DELETE",
        headers: {
            
            "content-type": "application/json"
            }
      }).then(()=> {

        let updatedExpenseType =[...this.state.expenseTypes].filter( i=> i.id !== id);
        this.setState({expenseTypes: updatedExpenseType});
      }).catch(error => {
        if (error.response.errorMessage ) {
            this.setState({error:"error.response.errorMessage"});
            
        }
        else {
            this.setState({error: "Something went wrong. Please try again later."});
             }
      });
      
  };
    render(){
        const {isLoading, expenseTypes } = this.state;
        
        if(isLoading)
           
                <div>Loading...</div>
           let expenseTypeDetailsRow = expenseTypes.map( expenseType => 
            <tr key={expenseType.id}>
                <td> {expenseType.id}</td>
                <td> {expenseType.code} </td>
                <td> {expenseType.description} </td>
                <td> <button style={{'backgroundColor':'lightgreen'}}> Edit </button></td>
                <td> <button  style={{'backgroundColor':'red'}} onClick={() => this.deleteData(expenseType.id)}
                    > Delete</button> 
                
                </td>
            </tr>
            )
            return(
                <div class="userDiv">
                    
                    <table border="1">
                    <th colSpan="5"><h3>Expense Types</h3></th>
                        <tr style={{'backgroundColor':'#81a8f8'}}>
                            <td>Id</td>
                            <td>Code</td>
                            <td>Description</td>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                        {expenseTypeDetailsRow}
                    </table>
                   
                   
                </div>
            );
       
        
    }
}
export default ExpenseType ;