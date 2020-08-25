import React, { Component, Fragment } from "react";

import Billing from "../services/Billing";
import Loading from "./Loading";

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
                    <td>${transaction.amount.total}</td>
                    <td>{this.dateSplit(transaction.create_time)}</td>
                </tr>
            )

            )
        )
    }

    transactionTable() {
        const { transactions } = this.state;

        if (transactions !== null) {
            if (transactions.length === 0) {
                return (
                    <Fragment>
                        <div className="bi-big-icon">
                            <svg width="10em" height="10em" viewBox="0 0 16 16" className="bi bi-layout-text-window-reverse" fill="black" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M2 1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm12-1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
                                <path fillRule="evenodd" d="M5 15V4H4v11h1zM.5 4h15V3H.5v1zM13 6.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z"/>
                            </svg>
                        </div>
                        <h1>No past orders found.</h1>
                    </Fragment>
                )
            }
            else {
                return (
                    <table id="order-history">
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
        }
        else {
            return(
                <Loading />
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
            <div>
                {this.transactionTable()}
            </div>
        )
    }
}

export default OrderHistory;