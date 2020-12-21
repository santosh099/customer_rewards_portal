import React from 'react';
import './rewards.css';
import dataSet from './models/dataSet';


class Rewards extends React.Component {

    constructor() {
        super();
        this.state = {selectedOptionId: 0, displayingMonth: "all 3 months"};
        fetch("http://localhost:8080/1")
        .then(res => res.json())
        .then(
            (result) => {
            console.log(result)
        }
      )
    }

    getData() {
        
        return dataSet.map( (data, index) => {
            return (
                <tr key={index}>
                    <td>{data.accountId}</td>
                    <td>{data.firstName}</td>
                    <td>{data.lastName}</td>
                    <td>{data.rewards}</td>
                </tr>
            );
        });
    }

    changeMonth = () => {
        var v = document.getElementById("selectedMonth").value;
        if(v == 0) {
            this.setState({displayingMonth: "all 3 months"});
        } else if(v == 1) {
            this.setState({displayingMonth: "January month"});
        } else if(v == 2){
            this.setState({displayingMonth: "February Month"});
        } else if(v == 3) {
            this.setState({displayingMonth: "March month"});
        }
    }

    render() {
        return  (
            <div>
                <div style={{display: 'flex'}}>
                    <div className="select-container">
                        <select id= "selectedMonth" defaultValue="0">
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="0">All 3 Months</option>
                        </select>
                    </div>
                    <button onClick={this.changeMonth}>Submit</button>
                </div>
                <div className="grid-container">
                    <p className="notifiedText">Displaying total reward points for {this.state.displayingMonth}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>AccountId</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Total Reward Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getData()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Rewards;