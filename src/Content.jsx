import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Cart from "./pages/Cart";
import OrderHistory from "./pages/OrderHistory";
import OrderComplete from "./pages/OrderComplete";
import Home from "./pages/Home";

class Content extends Component {

  render() {
    const { handleLogIn, handleLogOut, loggedIn } = this.props;

    return (
      <div className="content">
        <Switch>
          <Route
            path="/login"
            component={props => <Login handleLogIn={handleLogIn} {...props} />}/>
          <Route path="/register"component={Register} />
          <Route 
            path="/movies" 
            component={props => <Movies handleLogOut={handleLogOut} {...props} />}/>
          <Route path="/moviedetails" component={MovieDetails} />
          <Route path="/ordercomplete" component={OrderComplete} />
          <Route path="/cart" component={Cart} />
          <Route path="/orders" component={OrderHistory} />
          <Route path="/" component={props => <Home loggedIn={loggedIn} {...props} />}/>
        </Switch>
      </div>
    );
  }
}

export default Content;
