import React, { Component, Fragment } from "react";

import Billing from "../services/Billing";

const localStorage = require("local-storage");

class OrderHistory extends Component {
    state = {
        transactions: null
    }

    storeTransactions = newTransactions => {
        console.log(newTransactions);
        this.setState(
            {
                transactions: newTransactions
            }
        )
    }

    dateSplit = create_time => {
        let date = create_time.split('T')[0];
        let time = create_time.split('T')[1].split('Z')[0];

        return (
            <div>
                <p>{date}</p>
                <p>{time}</p>
            </div>
        )
    }

    iterTransactions() {
        const { transactions } = this.state;

        return(
            transactions.map((transaction, i) => (
                <tr key={i}>
                    <td>{transaction.capture_id}</td>
                    <td>{transaction.amount.total}</td>
                    <td>{this.dateSplit(transaction.create_time)}</td>
                </tr>
            )

            )
        )
    }

    transactionTable() {
        const { transactions } = this.state;
        if (transactions !== null) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Cost</th>
                            <th>Date Placed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.iterTransactions()}
                    </tbody>
                </table>
            );
        }
        else {
            return(
                <div>
                    <br/>
                    <h3>Your past orders will show up here...</h3>
                </div>
            );
        }
    }

    retrieveHistory() {
        Billing.orderRetrieve(localStorage.get("email"), localStorage.get("session_id"))
          .then(response => this.storeTransactions(response.data.transactions))
          .catch(error => alert(error));
    }

    componentDidMount() {
        this.retrieveHistory();
    }

    render() {
        return (
            <Fragment>
                <div>
                    <div style={{textAlign: "center"}}>
                        <h1>Order History</h1>
                    </div>
                    <div>
                        {this.transactionTable()}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default OrderHistory;