import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../services/fakeMovieService";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    sortColumn: { path: "title", order: "asc" },
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    const movies = getMovies();
    const genres = [{ name: "All Movies" }, ...getGenres()];
    this.setState({ movies, genres, selectedGenre: genres[0] });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleGenreSelect = (genre) => {
    console.log(`Genre selected: ${genre}`);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handlePageChange = (currentPage) => {
    console.log(`Change page to ${currentPage}`);
    const newState = [...this.state];
    newState.pageStart =
      currentPage * this.state.pageSize - this.state.pageSize;
    newState.currentPage = currentPage;
    this.setState(newState);
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = (movies) => {
    const { pageSize, currentPage, selectedGenre, sortColumn } = this.state;
    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? movies.filter((movie) => movie.genre._id === selectedGenre._id)
        : movies;
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    return {
      totalCount: filteredMovies.length,
      movies: paginate(sortedMovies, currentPage, pageSize),
    };
  };

  render() {
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
    } = this.state;

    const { totalCount, movies } = this.getPagedData(this.state.movies);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            + New Movie
          </Link>
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
