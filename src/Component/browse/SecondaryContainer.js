import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  if(!movies)return

  return (
    <div className="bg-black">
      <div className="-mt-72 relative z-20">
        <MovieList title="Now Playing" movies={movies?.nowPlayingMovies} />
        <MovieList title="Popular Movies" movies={movies?.popularMovies} />
        {/* <MovieList title="Now Playing" movies={movies} />
        <MovieList title="Now Playing" movies={movies} /> */}
      </div>
    </div>
  );
};

export default SecondaryContainer;
