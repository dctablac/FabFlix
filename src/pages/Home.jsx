import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";

class Home extends Component {
  state = {};

  render() {
    return (
      <div>

        <h1 className="title">FabFlix</h1>

        {this.props.loggedIn && 
          <div className="home-cards">
            <NavLink className="home-card" to="/movies">
              <svg width="5em" height="5em" viewBox="0 0 16 16" className="bi bi-search" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
              </svg>
              <label className="home-card-label">Search for a Movie</label>
            </NavLink>
            <NavLink className="home-card" to="/cart">
              <svg width="5em" height="5em" viewBox="0 0 16 16" className="bi bi-cart4" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
              </svg>
              <label className="home-card-label">View Shopping Cart</label>
            </NavLink>
            <NavLink className="home-card" to="/orders">
            <svg width="5em" height="5em" viewBox="0 0 16 16" className="bi bi-layout-text-window-reverse" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M2 1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm12-1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
              <path fillRule="evenodd" d="M5 15V4H4v11h1zM.5 4h15V3H.5v1zM13 6.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z"/>
            </svg>
              <label className="home-card-label">View Order History</label>
            </NavLink>
          </div>}

        {!this.props.loggedIn && <Fragment>
          <br/>
          <h3>Sign Up or Log In To Get Started!</h3>  
        </Fragment>}

      </div>
    );
  }
}

export default Home;
