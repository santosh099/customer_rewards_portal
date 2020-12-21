import React from 'react';
import './rewards.css';


class Rewards extends React.Component {

    constructor() {
        super();
        this.state = {
            dataSet: [],
            month: '',
            text: '3 months'
        }
       
    }
    componentDidMount() {
        fetch('http://localhost:8080/rewards/', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            }
        }).then(res => res.json())
        .then( (result) => {
            this.setState({dataSet: result, month: ''})
        });
    }

    renderTableRows() {
        return this.state.dataSet.map( (data, index) => {
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

    handleChange(event) {
        fetch('http://localhost:8080/rewards/' + event.target.value, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            }
        }).then(res => res.json())
        .then( (result) => {
            if(event.target.value == 1) {
                this.setState({dataSet: result, month: event.target.value, text: 'January'})
            } else if(event.target.value == 2) {
                this.setState({dataSet: result, month: event.target.value, text: 'February'})
            } else if(event.target.value == 3) {
                this.setState({dataSet: result, month: event.target.value, text: 'March'})
            } else {
                this.setState({dataSet: result, month: event.target.value, text: '3 months'})
            }
        });
    }

    render() {
        return  (
            <div>
                <div style={{display: 'flex'}}>
                    <div className="select-container">
                        <select id= "selectedMonth" onChange = {this.handleChange.bind(this)} defaultValue="">
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="">All 3 Months</option>
                        </select>
                    </div>
                </div>
                <div className="grid-container">
                    <p className="notifiedText">Displaying total reward points for {this.state.text} </p>
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
                        {this.renderTableRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Rewards;