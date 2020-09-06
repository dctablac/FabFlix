import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { imageDB } from "../Config.json";
import Billing from "../services/Billing";
import Loading from "./Loading";
import MovieSearch from "../services/MovieSearch";

const localStorage = require("local-storage");

class MovieDetails extends Component {
    state = {
        movieID: "",
        details: null,
        quantity: 1
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    handleResponse() {
        const { movieID } = this.state;

        MovieSearch.movieDetails(movieID, localStorage.get("email"), localStorage.get("session_id"))
          .then(response => this.handleDetails(response))
          .catch(error => alert(error));
    }

    handleDetails = response => {

        this.setState(
            {
                details: response.data.movie
            }
        );
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    formatBudget = budget => {
        let finalBudget = budget;
        return (
            finalBudget
        )
    }

    addToCart = e => {
        const { movieID, quantity } = this.state;

        Billing.cartInsert(movieID, quantity, localStorage.get("email"), localStorage.get("session_id"))
          .then(response => {
              alert("Item successfully added to your cart."); 
              document.body.scrollTop = 0; // For Safari
              document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
              this.props.history.push("/cart");}
          )
          .catch(error => alert(error));
        
    }

    updateQuantity = e => {
        const { value } = e.target;

        let intValue = parseInt(value, 10);
    
        if (value === "") {
            this.setState( { quantity: "" });
        }
        else {
            this.setState( { quantity: intValue} );
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    showEntities = (entities, type) => {
        // entities is a list of 'genreModels' or 'peopleModels' with 'genre/people_id' and 'name'
        let len = entities.length;
        let finalEntities = "";

        for (let i = 0; i < len; i++) {
            finalEntities += entities[i].name;
            if (i+1 < len) {
                finalEntities += ", "
            }
        }

        return (
            <div>
                <h4 className="movie-detail">{type}: {finalEntities}</h4>
            </div>
        )
    }

    showPeople = people => {
        return (
            <p>people</p>
        )
    }
    
    showDetails() {
        const { details } = this.state;

        if (details != null) {
            return (
                <div>
                    <NavLink className="search-return" to="/movies">{"<-- Back To Search"}</NavLink>
                    <div className="movie-details">
                        <img className="movie-detail-poster" src={imageDB+details.poster_path} alt=""/>
                        <div className="movie-details-text">
                            <h1 className="movie-detail">{details.title}</h1>
                            <h4 className="movie-detail">Year: {details.year}</h4>
                            <h4 className="movie-detail">Director: {details.director}</h4>
                            <h4 className="movie-detail">Rating: {details.rating}</h4>
                            <h4 className="movie-detail">Votes: {details.num_votes}</h4>
                            <h4 className="movie-detail">Budget: {details.budget}</h4>
                            <h4 className="movie-detail">Revenue: {details.revenue}</h4>
                            <h4 className="movie-detail">Overview: {details.overview}</h4>
                            {this.showEntities(details.genres, "Genres")}
                            {this.showEntities(details.people, "People")}
                        </div>
                    </div>
                    <div id="add-to-cart">
                        <input
                        id="cart-quantity"
                        type="number"
                        name="qty"
                        value={this.state.quantity}
                        onChange={this.updateQuantity}/>
                        <button id="add-to-cart-button" className="button" onClick={this.addToCart}>Add To Cart</button>
                    </div>  
                </div>
            )
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    setMovieID() {
        const { detailURL } = this.state;

        this.setState(
            {
                movieID: detailURL.split("/")[2]
            }, this.handleResponse
        )
    }

    componentDidMount() {

        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

        this.setState(
            {
                detailURL: window.location.pathname,
            }, this.setMovieID
        );
        setTimeout(() => {document.getElementById("loading").style.display = "none";}, 800);

    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    render() {
        return (
            <div>
                <Loading />
                {this.showDetails()}
            </div>
        )
    }
}

export default MovieDetails;