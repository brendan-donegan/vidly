import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", rate: "" },
    errors: {},
    genres: [],
  };

  schema = {
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).required().label("Number in Stock"),
    rate: Joi.number().max(10).required().label("Rate"),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/did-not-find");
    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre.id,
      numberInStock: movie.numberInStock,
      rate: movie.dailyRentalRate,
    };
  }

  doSubmit() {
    console.log("Submitted movie!");
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  }

  render() {
    const { match } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Movie Form {match.params.id}</h1>
        {this.renderInput("title", "Title")}
        {this.renderInput("genreId", "Genre")}
        {this.renderInput("numberInStock", "Number in Stock")}
        {this.renderInput("rate", "Rate")}
        {this.renderButton("Save")}
      </form>
    );
  }
}

export default MovieForm;
