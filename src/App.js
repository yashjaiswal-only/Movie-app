import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourite from "./components/AddFavourites";
import RemoveFavourite from "./components/RemoveFavourites";
const App = () => {
  // const [movies, setMovies] = useState([
  //   {
  //     Title: "The Avengers",
  //     Year: "2012",
  //     imdbID: "tt0848228",
  //     Type: "movie",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  //   },
  //   {
  //     Title: "Avengers: Endgame",
  //     Year: "2019",
  //     imdbID: "tt4154796",
  //     Type: "movie",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
  //   },
  //   {
  //     Title: "Avengers: Infinity War",
  //     Year: "2018",
  //     imdbID: "tt4154756",
  //     Type: "movie",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg",
  //   },
  // ]);
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState(""); //initialize to empty string
  const [Favourites, setFavourites] = useState([]);
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=9c6b29a8&s=${searchValue}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson);
    if (responseJson.Search) {
      setMovies(responseJson.Search);
      //this is because when page loaded searchvalue is empty string so setmovies only if there is something in responsejson
    }
  };
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]); // calls whenever the searchvalue changes also on first render

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('react-netflix'));
    if(movieFavourites){  // this if condition was creating problem 
      setFavourites(movieFavourites);
    }
  }, []); 
  //runs only on first render
  
  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-netflix', JSON.stringify(items));
  };
  const addFavouriteMovies = (movie) => {
    // const present= Favourites.filter(
    //   (favourite) => favourite.imdbID === movie.imdbID
    // );
    // if(present===[]){
      const newFavouriteList = [...Favourites, movie]; //add movie to current favourites
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    // }
  };
  const removeFavouriteMovies = (movie) => {
    const newFavouriteList = Favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }; 
  // const removeFavouriteMovies = (movie) => {
  //   const newFavouriteList = Favourites.filter
  //   (
  //     (favourite) => favourite.imdbId !== movie.imdbId
  //   );
  //   setFavourites(newFavouriteList);
  //   saveToLocalStorage(newFavouriteList);
  // };
  //these brackets of return was creating problems-w/o it no output
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-item-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <div className="row">
        <MovieList
          handleFavouritesClick={addFavouriteMovies}
          favouriteComponent={AddFavourite}
          movies={movies}
        />
      </div>

      <div className="row d-flex align-item-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>

      <div className="row">
        <MovieList
          handleFavouritesClick={removeFavouriteMovies}
          favouriteComponent={RemoveFavourite}
          movies={Favourites}
        />
      </div>
    </div>
  );
};

export default App;
