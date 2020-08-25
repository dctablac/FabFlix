import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import Billing from "../services/Billing";


import Loading from "./Loading";
import { imageDBSmall } from "../Config.json";

const localStorage = require("local-storage");

class Cart extends Component {
    state = {
        email: localStorage.get("email"),
        items: null,
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    handleResponse = e => {
        Billing.cartRetrieve(localStorage.get("email"), localStorage.get("session_id"))
          .then(response => this.handleCart(response))
          .catch(error => alert(error));
    }

    handleCart = response => {
        if (response !== undefined) {
            this.setState( { items: response.data.items } )
        }
        else {
            console.log("Empty cart");
        }
        document.getElementById("loading").style.display = "none";
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    calculateTotal() {
        const { items } = this.state;

        let cost = 0;
        let tempCost = 0;
        let count = items.length;

        for (let i = 0; i < count; i++) {
            tempCost = items[i].unit_price*items[i].discount;
            cost += (tempCost*items[i].quantity);
        }

        return (
            <label className="label" style={{textAlign: "center"}}>Total: ${cost.toFixed(2)}</label>
        )
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    handleDelete() {
        alert("Item successfully deleted");
        this.handleResponse();
    }

    deleteItem = e => {
        e.preventDefault();
        const { items } = this.state;

        let item = items[e.target.id];

        Billing.cartDelete(item.movie_id, localStorage.get("email"), localStorage.get("session_id"))
          .then(response => this.handleDelete())
          .catch(error => alert(error));
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    buyCart = e => {
        e.preventDefault();

        Billing.orderPlace(localStorage.get("email"), localStorage.get("session_id"))
          .then(response => this.handleBuy(response))
          .catch(error => alert(error));
    }

    handleBuy = response => {
        alert("Redirecting to paypal.")
        window.location.href = response.data.approve_url;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    finishUpdate = response => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        document.getElementById("loading").style.display = "flex";
        this.handleResponse();
    }

    updateCart = (movie_id) => {

        const { newQuantity } = this.state;

        Billing.cartUpdate(localStorage.get("email"), localStorage.get("session_id"), movie_id, newQuantity)
          .then(response => this.finishUpdate(response))
          .catch(error => alert(error))
    }

    updateField = e => {
        const { value } = e.target;
    
        this.setState (
            {
                newQuantity: parseInt(value)
            }
        )
    }

    makeQuantitySelector = (movie_id, quantity) => {
        return (
            <div>
                <input type="number" id="cart-quantity" name="quantity" min="1" max="99" defaultValue={quantity} onChange={this.updateField}/>
                <button className="button" onClick={this.updateCart.bind(null, movie_id)}>Update</button>
            </div>
        );
    }
    
    showCart = () => {
        const { items } = this.state;

        if (items !== null) {
            if (items === undefined) {
                return (
                    <Fragment>
                        <div className="bi-big-icon">
                            <svg width="10em" height="10em" viewBox="0 0 16 16" className="bi bi-cart4" fill="black" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                            </svg>
                        </div>
                        <h1>No Items in Your Cart.</h1>
                    </Fragment>
                )
            }
            return (
                <div>
                    <h1 className="title">Your Cart</h1>
                    <table className="cart"> 
                        <tbody>
                            {
                                items.map( (item, i) => (
                                    <tr key={i}>
                                        <td>
                                          <NavLink to={"/moviedetails/"+items[i].movie_id}>
                                            <img src={imageDBSmall+items[i].poster_path} alt={items[i].name}/>
                                          </NavLink>
                                        </td>
                                        <td>{items[i].movie_title}</td>
                                        <td>
                                          {this.makeQuantitySelector(items[i].movie_id, items[i].quantity, i)}
                                        </td>
                                        <td>
                                          ${(items[i].unit_price*items[i].discount).toFixed(2)}
                                        </td>
                                        <td>
                                          <button onClick={this.deleteItem} id={i}
                                          className="button">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="cart-total">
                        <p>{this.calculateTotal()}</p>
                    </div>
                    <button className="button" onClick={this.buyCart}>Checkout</button>
                </div>
            )
        }
    }

    componentDidMount() {
        this.handleResponse();
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    render() {
        return (
            <div style={{textAlign: "center"}}>
                <div>
                    <Loading />
                    {this.showCart()}
                </div>
            </div>
        )
    }
}

export default Cart;