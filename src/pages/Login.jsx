import React, { Component } from "react";

import Idm from "../services/Idm";

import "../css/common.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    msg: ""
  };

  handleSubmit = e => {
    e.preventDefault();

    const { handleLogIn, history } = this.props;
    const { email, password } = this.state;

    Idm.login(email, password)
      .then(response => {
        
        if (response["data"]["session_id"] !== undefined) {     // Session_id is provided, user logged in
          document.getElementsByClassName("cred-msg").item(1).style.display = "none";
          document.getElementById("cred-success").style.display = "flex";  // Inform that user is logged in
          
          setTimeout(() => {
            handleLogIn(email, response["data"]["session_id"]);
            history.push("/home");
          }, 1500);                                
        }
        else {
          this.setState({
            msg: response["data"]["message"]
          });
        }
      })
      .catch(error => console.log(error));
  };

  updateField = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  render() {
    const { email, password, msg } = this.state;

    return (
      <div>
        <div className="cred-msg" id="cred-success">Login successful!</div>
        <div className="cred-msg">
          {msg}
        </div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="label">Email</label>
          <input
            className="input cred-input"
            type="email"
            name="email"
            value={email}
            onChange={this.updateField}/>
          <label className="label">Password</label>
          <input
            className="input cred-input"
            type="password"
            name="password"
            value={password}
            onChange={this.updateField}/>
          <button className="button">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
