import React, { Component } from "react";

import Billing from "../services/Billing";
import Loading from "./Loading";

const localStorage = require("local-storage");

class OrderComplete extends Component {
  state = {
    token: "",
    payerID: "",
    
  };

  componentDidMount() {
    let e = window.location.href
    let url_split = e.split('?')[1].split('&');
    let token = url_split[0].split('=')[1];
    let payerID = url_split[1].split('=')[1];

    Billing.orderComplete(token, payerID, localStorage.get("email"), localStorage.get("session_id"))
      .then(response => document.getElementById("cart-clear-message").style.display = "none")
      .catch(error => alert(error));
  }

  

  render() {
    return (
      <div>
        <div id="cart-clear-message">
          <h1 className="title" style={{textAlign:"center"}}>Please wait while we clear your cart!</h1>
          <Loading />
        </div>
        <div>
          <h1 className="title" style={{textAlign:"center"}}>
            Order Complete!
          </h1>
          <div id="order-complete-icon">
            <svg width="15em" height="15em" viewBox="0 0 16 16" class="bi bi-check2-circle" fill="green" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              <path fill-rule="evenodd" d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderComplete;