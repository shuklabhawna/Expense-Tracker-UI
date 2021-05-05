import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../css/App.css';

import Moment from "react-moment"

class ExpenseDetails extends Component {
    emptyItem = {
        id: 0,
        date: new Date(),
        description: "",
        user: {id:0,userCode:"",name:""},
        expenseType: {id:0,code:""},
        amount: 0,
        currency: {currencyCode:"",currencyName:""},
        status: "PENDING"
    }

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            expenseDetails: [],
            expenseTypes: [],
            users: [],
            currencies: [],
            date: new Date(),
            item: this.emptyItem
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.refresh = this.refresh.bind(this);
    }


    async componentDidMount() {
        const expenseResponse = await fetch('/expenseDetails/list');
        const expenseTypeResponse = await fetch('/expenseTypes/list');
        const userResponse = await fetch('/users/list');
        const currencyResponse = await fetch('/currencies/list');

        const expenseRespBody = await expenseResponse.json();
        const expenseTypeRespBody = await expenseTypeResponse.json();
        const userRespBody = await userResponse.json();
        const currencyRespBody = await currencyResponse.json();

        this.setState({
            currencies: currencyRespBody, expenseDetails: expenseRespBody,
            expenseTypes: expenseTypeRespBody, users: userRespBody, isLoading: false
        });
    }

    refresh(event){
        this.componentDidMount();
    }
    async handleSubmit(event){
        event.preventDefault();
        const item =  this.state.item;
        if(item["id"]<1){
            alert("Id must be a positive number above 0");
        }else{await fetch(`/expenseDetails/new`, {
            method: "POST",
            headers: {
               
              "content-type": "application/json"
            },
           
            body: JSON.stringify(item),
          }).then(()=> {
            this.setState({item: this.emptyItem});
            this.componentDidMount();
          });
        }
    };


    async deleteExpenseDetail(id){
        await fetch(`/expenseDetails/delete/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
                }
          }).then(()=> {
    
            let updatedExpenseDetails =[...this.state.expenseDetails].filter( i=> i.id !== id);
            this.setState({expenseDetails: updatedExpenseDetails});
          });
          
      };
      async settleExpenses(id){
        await fetch(`/settlements/process/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
                }
          }).then(()=> {
    
            this.componentDidMount();
          });
          
      };
    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name]= value;
        this.setState({item});
    }
    handleSelect(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        if(name === "currency"){
            item[name].currencyCode =value;
        }else{
            item[name].id =value;
        }
        
        this.setState({item});
    }
    handleEdit(event,data){
        
        let item = {...this.state.item};
        item= data;
        item.date=new Date(data.date);
        this.setState({item : data});
       
    }
    
    handleDateChange(date){
        let item = {...this.state.item};
        item.date = date;
        this.setState({item});
    }

    render() {
        const { isLoading, expenseDetails, expenseTypes, users, currencies } = this.state;
        const title = <h3>Add Expenses</h3>
        if (isLoading)
            <div>Loading...</div>

        let currencyList = currencies.map(currency =>
            <option key={currency.currencyCode} value={currency.currencyCode}>
                [{currency.currencyCode}]->
                                {currency.currencyName}
            </option>
        )
        let expenseTypesList = expenseTypes.map(expenseType =>
            <option key={expenseType.id} value={expenseType.id}>
                [{expenseType.code}]->
                                {expenseType.description}
            </option>
        )
        let usersList = users.map(user =>
            <option key={user.id} value={user.id}>
                [{user.userCode}]-> {user.name}
            </option>
            

        )

         let expenseDetailRow = expenseDetails.map(expDetail =>
                            <tr key={expDetail.id}>
                            <td> {expDetail.id}</td>
                            <td> <Moment date={expDetail.date} format="DD-MMM-YYYY"/></td>
                            <td> {expDetail.description} </td>
                            <td> {expDetail.user.name}</td>
                            <td> {expDetail.expenseType.code} </td>
                            <td> {expDetail.amount} </td>
                            <td> {expDetail.currency.currencyName}</td>
                            <td> {expDetail.status} </td>
                            <td>{expDetail.status !== "SETTLED" ? <button style={{'backgroundColor':'lightgreen'}} onClick={(e) => this.handleEdit(e,expDetail)}> Edit </button> : ""} </td>
                            <td>{expDetail.status !== "SETTLED" ? <button style={{'backgroundColor':'red'}} onClick={() => this.deleteExpenseDetail(expDetail.id)}>Delete</button> : ""}</td>
                            <td>{expDetail.status !== "SETTLED" ? <button style={{'backgroundColor':'lightgreen'}} onClick={() => this.settleExpenses(expDetail.id)}>Process</button> : ""}</td>
                        </tr>
                    )

        return (
            <div>

                <container >
                    
                    <form onSubmit={this.handleSubmit}>
                        <table class="gridView">
                            <tr colSpan="4" style={{'textAlign':'center'}}> <td>{title} </td></tr>
                            <tr>
                                <td>
                                    <label for="id"> Id</label>
                                    </td><td>
                                    <input type="text" name="id" id="id" value={this.state.item.id} onChange={this.handleChange}></input>
                                </td>
                                
                                <td>
                                    <label for="date"> Date</label>
                                    </td><td>
                                    <DatePicker  value={this.state.item.date} selected={this.state.item.date} onChange={this.handleDateChange}></DatePicker>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <label for="description"> Description</label>
                                    </td><td>
                                    <input type="text" name="description" id="description" value={this.state.item.description}  onChange={this.handleChange}></input>
                                </td>
                                <td>
                                   
                                    <label for="user" > User</label>
                                    </td><td>
                                    <select name="user" id="user" value={this.state.item.user.id}  onChange={this.handleSelect} onSelect={this.handleSelect}>
                                        <option/>
                                            {usersList}
                                    </select>
                                   
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="expenseType"> Expense Type</label>
                                    </td><td>
                                    <select name="expenseType" id="expenseType"  value={this.state.item.expenseType.id}  onChange={this.handleSelect} onBlur={this.handleSelect}>
                                        <option/>
                                        {expenseTypesList}
                                    </select>
                                    
                                </td>
                                <td>
                                    <label for="amount"> Amount</label>
                                    </td><td>
                                    <input type="text" name="amount" id="amount" value={this.state.item.amount} onChange={this.handleChange}></input>
                                
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="currency"> Currency</label>
                                    </td><td>
                                    <select name="currency" id="currency" value={this.state.item.currency.currencyCode}  onChange={this.handleSelect} onSelect={this.handleSelect}>
                                    <option/>
                                        {currencyList}
                                    </select>
                                   
                                </td>
                                <td>
                                        <label for="status"> Status</label>
                                        </td><td>
                                        <input type="text" name="status" id="status" value={this.state.item.status}  readOnly={true} onChange={this.handleChange}></input>
                                </td>
                            </tr>
                            <tr>
                                <tr></tr>
                                <td>
                                    <td>
                                    <button class=".btn_name" color="primary" type="submit">Save</button> 
                                    </td><td>
                                    <button color="secondary" onClick={() => this.refresh()}>Cancel</button>
                                    </td>
                                   </td>
                            </tr>
                        </table>
                    </form>
                </container>
                <container>


                    <table border="1">
                        <th colSpan="11"><h3>Expense Details</h3></th>
                        <tr style={{'backgroundColor':'#81a8f8'}}>
                            <td>Id</td>
                            <td>Date</td>
                            <td>Description</td>
                            <td>User</td>
                            <td>Expense Type</td>
                            <td>Amount</td>
                            <td>Currency</td>
                            <td>Status</td>
                            <td colSpan="3" style={{'textAlign':'center'}}>Actions</td>
                        </tr>
                            {expenseDetailRow}
                    </table>

                </container>

            </div>
        );


    }
}
export default ExpenseDetails;