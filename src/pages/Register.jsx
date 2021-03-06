import React , { Component } from "react";

import Idm from "../services/Idm";


class Register extends Component {
    state = {
        email: "",
        password: "",
        msg: ""
    };

    handleRegister = e => {
        e.preventDefault();

        const { email, password } = this.state;
        const { history } = this.props;

        Idm.register(email, password)
          .then(response => {
              if (response.data.resultCode !== 110) { // Invalid password or email already in use
                  this.setState({
                      msg: response.data.message
                  });
              }
              else { // resultCode == 110 ... User registered successfully
                  this.setState({
                      msg: ""
                  });
                  document.getElementById("cred-success").style.display = "flex";
                  setTimeout(()=>{history.push("/login")}, 1500);                 // Redirect to login page
              }
          })
          .catch(error => this.setState({
              msg: error
          }));
    };

    updateField = e => {

        const { name, value } = e.target;

        this.setState( { [name]: value } );
    }

    render() {

        const { email, password, msg } = this.state;

        return (
            <div>
              <div className="cred-msg" id="cred-success">User registered successfully! Redirecting to login.</div>
              <div className="cred-msg">{msg}</div>
              <div id="reg-box">
                <h1>Register</h1>
                  <form onSubmit={this.handleRegister}>
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
                      <button className="button">Register</button>
                  </form>
              </div>
            </div>
        )
    }
}

export default Register;