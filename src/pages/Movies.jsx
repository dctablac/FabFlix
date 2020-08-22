import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { imageDB } from "../Config.json";

import MovieSearch from "../services/MovieSearch";


import "../css/common.css";

const localStorage = require("local-storage");

class Movies extends Component {
  state = {
    placeholder: "ex. Star Wars",
    filters: {
      search_type: "title",
      search: "",
      year: "",
      director: "",
      genre: "",
      limit: 10,
      orderby: "title",
      direction: "asc",
      offset: 0
    },
    movies: [],
  };

  ////////////////////////////////////////////////////////////////////////////////////////

  loginAlert = message => {
    const { handleLogOut, history } = this.props;

    alert(message);
    handleLogOut();
    history.push("/login");
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////

  handleSearch = e => {
    e.preventDefault();

    const { filters } = this.state;

    const { search, year, director, genre, search_type } = filters;

    let email = localStorage.get("email");
    let session_id = localStorage.get("session_id");

    if (search === "" && year === "" && 
        director === "" && genre === "") {// empty search, do nothing
      alert("Please enter at least one search criteria.")
      return;
    }

    if (search_type === "keywords") {
      MovieSearch.browse(filters, email, session_id)
        .then(response => this.handleResponse(response))
        .catch(error => this.loginAlert("Please log in to continue."));
    }
    else { // "title"
      MovieSearch.search(filters, email, session_id)
        .then(response => this.handleResponse(response))
        .catch(error => this.loginAlert("Please log in to continue."));
    }
  }

  handleResponse = response => {

    if (response.data.movies === undefined) {
      alert(response.data.message);
      return;
    }

    this.setState({movies: response.data.movies});
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  updateField = e => {
    const { name, value } = e.target;

    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }), this.updateSearchType);

    }

  updateIntField = e => {
    const { name, value } = e.target;

    let intValue = parseInt(value, 10) // radix 10 for decimal

    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: intValue
      }
    }), this.updateSearchType);

  }

  updateSearchType = e => {
    const { filters } = this.state;

    if (filters.search_type === "keywords") {
      this.setState({placeholder:"ex. sequel,alien invasion,based on comic"});
    }   
    else if (filters.search_type === "title") {
      this.setState({placeholder: "ex. Star Wars"});
    }
  }

  updateLimitField = e => {
    const { name, value } = e.target;

    let intValue = parseInt(value, 10) // radix 10 for decimal

    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: intValue,
        offset: 0
      }
    }), this.updateSearchType);
  }

  updateDirectionField = e => {
    const { name, value } = e.target;

    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value,
        offset: 0
      }
    }), this.updateSearchType);
  }

  updateOrderByField = e => {
    const { name, value } = e.target;

    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value,
        offset: 0
      }
    }), this.updateSearchType);
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  showPages = e => {
    const { filters } = this.state;

    return (
      <h4>Page {filters.offset+1}</h4>
    )
  }

  prevPage = e => {
    const { filters } = this.state;

    let value = filters.offset;

    if (value > 0) {

      value--;
      this.setState(prevState => ({
        filters: {
          ...prevState.filters,
          offset: value
        }
      }), this.updateSearchType);

    }
  }

  nextPage = e => {
    const { filters, movies } = this.state;

    let value = filters.offset;

    if (movies.length === filters.limit) { 

      value++;
      this.setState(prevState => ({
        filters: {
          ...prevState.filters,
          offset: value
        }
      }), this.updateSearchType);
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  setMovieID = id => {
    localStorage.set("movie_id", id)
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  renderMovieCards() {
    const { movies } = this.state;
    if (movies.length === 0) {
      return;
    }
    return (
      <div>
        <div className="cards">
          {
            movies.map((movie, i) => (
              <NavLink key={i} to={"/moviedetails/"+movie.movie_id}>
                <img className="movie-card" src={imageDB+movie.poster_path} alt={movie.title} />
              </NavLink>
            ))
          }
        </div>
        <div className="search-buttons search-bottom">
          <button className="search-button button" onClick={this.prevPage}>Prev</button>
          <button className="search-button button">Search</button>
          <button className="search-button button" onClick={this.nextPage}>Next</button>
        </div>  
      </div>
    );
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  render() {

    const { filters, placeholder } = this.state;

    return (
      <div className="container">
          <form className="search-form" onSubmit={this.handleSearch}>
            <label className="label-search">Search: </label>

            <select 
              id="search_type" 
              name="search_type"
              onChange={this.updateField}>
              <option value="title">Title</option>
              <option value="keywords">Keywords</option>
            </select>

            <input
              className="input"
              type="text"
              name="search"
              value={filters.search}
              placeholder={placeholder}
              onChange={this.updateField}/>

            <label className="label-search">Filter by:</label>

            <div className="search-filters">

              <label className="label-filter"> Year: </label>
                <input
                  className = "input-filter-number"
                  type="input"
                  name="year"
                  value={filters.year}
                  placeholder={"e.g. 1977"}
                  onChange={this.updateField}/>

              <label className="label-filter"> Director: </label>
                <input
                  className = "input-filter-text"
                  type="input"
                  name="director"
                  value={filters.director}
                  placeholder={"e.g. George Lucas"}
                  onChange={this.updateField}/>

              <label className="label-filter"> Genre: </label>
                <input
                  className = "input-filter-text"
                  type="input"
                  name="genre"
                  value={filters.genre}
                  placeholder={"e.g. Science Fiction"}
                  onChange={this.updateField}/>

              <label className="label-filter">Limit per page: </label>
              <select 
                id="limit"
                name="limit"
                onChange={this.updateField}> 
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>

              <label className="label-filter">Order by: </label>
              <select 
                id="orderby"
                name="orderby"
                onChange={this.updateField}>
                <option value="title">Title</option>
                <option value="year">Year</option>
                <option value="rating">Rating</option>
              </select>

              <label className="label-filter">Direction: </label>
              <select 
                id="direction"
                name="direction"
                onChange={this.updateField}>
                <option value="asc">asc</option>
                <option value="desc">desc</option>
              </select>

              <div className="search-buttons">
                <button className="search-button button" onClick={this.prevPage}>Prev</button>
                <button className="search-button button">Search</button>
                <button className="search-button button" onClick={this.nextPage}>Next</button>
              </div>

            </div>

          </form>
          {this.renderMovieCards()}
        </div>      
    );
  }

}

export default Movies;
