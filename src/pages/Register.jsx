import React , { Component } from "react";

import Idm from "../services/Idm";

import "../css/common.css";

class Register extends Component {
    state = {
        email: "",
        password: ""
    };

    handleRegister = e => {
        e.preventDefault();

        const { email, password } = this.state;
        const { history } = this.props;

        Idm.register(email, password)
          .then(response => {
            alert(response["data"]["message"]);     // Result of sending a register request
            history.push("/login");                 // Redirect to login page
          })
          .catch(error => alert(error));
    };

    updateField = e => {

        const { name, value } = e.target;

        this.setState( { [name]: value } );
    }

    render() {

        const { email, password } = this.state;

        return (
            <div>
                <div className="form-box">
                    <h1>Register</h1>
                    <form onSubmit={this.handleRegister}>
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
                        <button className="button">Register</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;