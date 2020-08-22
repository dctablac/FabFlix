import React, { Component } from "react";
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
        alert(response.data.message)
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
            <form>
                <input type="number" id="quantity" name="quantity" min="1" max="99" defaultValue={quantity} onChange={this.updateField}/>
                <button onClick={this.updateCart.bind(null, movie_id)}>Update</button>
            </form>
        );
    }
    
    showCart = () => {
        const { items } = this.state;

        if (items !== null) {
            if (items === undefined) {
                return (
                    <h1>No Items in Your Cart.</h1>
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
                                        <td><img src={imageDBSmall+items[i].poster_path} alt={items[i].name}/></td>
                                        <td>{items[i].movie_title}</td>
                                        <td>{this.makeQuantitySelector(items[i].movie_id, items[i].quantity, i)}</td>
                                        <td>${(items[i].unit_price*items[i].discount).toFixed(2)}</td>
                                        <td><button onClick={this.deleteItem} id={i}
                                            className="button">Delete</button></td>
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

    componentDidUpdate() {
        document.getElementById("loading").style.display = "none";
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