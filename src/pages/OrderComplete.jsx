import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Billing from "../services/Billing";

const localStorage = require("local-storage");

class OrderComplete extends Component {
  state = {
    token: "",
    payerID: ""
  };

  completeOrder = e => {
    console.log(e);
    alert("Cart was cleared.");
  }

  componentDidMount() {
    let e = window.location.href
    let url_split = e.split('?')[1].split('&');
    let token = url_split[0].split('=')[1];
    let payerID = url_split[1].split('=')[1];

    Billing.orderComplete(token, payerID, localStorage.get("email"), localStorage.get("session_id"))
      .then(response => this.completeOrder(response))
      .catch(error => alert(error));
  }

  render() {
    return (
      <div>
        <h1 style={{textAlign:"center"}}>Order Complete!</h1>
        <br/>
        <h4 style={{textAlign:"center"}}><NavLink to="/home">Return Home</NavLink></h4>
      </div>
    );
  }
}

export default OrderComplete;