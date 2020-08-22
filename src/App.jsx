import React, { Component } from "react";
import Axios from "axios";

import NavBar from "./NavBar";
import Content from "./Content";
import Footer from "./pages/Footer";

const localStorage = require("local-storage");

class App extends Component {
  state = {
    loggedIn: this.checkedLoggedIn()
  };

  handleLogIn = (email, session_id) => {
    const { common } = Axios.defaults.headers;

    localStorage.set("email", email);
    localStorage.set("session_id", session_id);

    common["email"] = email;
    common["session_id"] = session_id;

    this.setState({ loggedIn: true });
  };

  handleLogOut = () => {
    const { common } = Axios.defaults.headers;

    localStorage.remove("email");
    localStorage.remove("session_id");

    delete common["email"];
    delete common["session_id"];

    this.setState({ loggedIn: false });
  };

  checkedLoggedIn() {
    return (
      localStorage.get("email") !== null && // undefined
      localStorage.get("session_id") !== null // undefined
    );
  }

  render() {
    const { loggedIn } = this.state;

    return (
      <div className="app">
        <NavBar handleLogOut={this.handleLogOut} loggedIn={loggedIn} />
        <Content handleLogIn={this.handleLogIn} handleLogOut={this.handleLogOut} loggedIn={loggedIn}/>
        <Footer />
      </div>
    );
  }
}

export default App;
