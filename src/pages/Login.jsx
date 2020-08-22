import React, { Component } from "react";

import Idm from "../services/Idm";

import "../css/common.css";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();

    const { handleLogIn, history } = this.props;
    const { email, password } = this.state;

    Idm.login(email, password)
      .then(response => {
        
        if (response["data"]["session_id"] !== undefined) {     // Session_id is provided, user logged in
          
          handleLogIn(email, response["data"]["session_id"]);   
          
          alert(response["data"]["message"]);                   // Inform that user is logged in
          
          history.push("/home");                                // Switch to home page
        }
        else {
          alert(response["data"]["message"]);
        }
      })
      .catch(error => console.log(error));
  };

  updateField = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            value={email}
            onChange={this.updateField}/>
          <label className="label">Password</label>
          <input
            className="input"
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
