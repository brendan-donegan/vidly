import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import Navbar from "./components/common/navbar";
import LoginForm from "./components/loginForm";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="container">
        <Navbar />
        <Switch>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/movies/:id" component={MovieForm}></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect to="/movies" exact from="/"></Redirect>
          <Redirect to="/not-found"></Redirect>
        </Switch>
      </main>
    );
  }
}

export default App;
