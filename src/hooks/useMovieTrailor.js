import React, { useEffect } from "react";
import { API_OPTIONS } from "../Utils/constants/constants";
import { useDispatch } from "react-redux";
import { addTrailor } from "../Utils/Store/movieSlice";

export const useMovieTrailor = (movieId) => {
  const dispatch = useDispatch();

  const getVideoMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?`,
      API_OPTIONS
    );
    const json = await data.json();

    const fetchTrailors = json.results.filter(
      (video) => video.type === "Trailer"
    );
    const trailor = fetchTrailors.length ? fetchTrailors[0] : json.results[0];
    dispatch(addTrailor(trailor));
  };

  useEffect(() => {
    getVideoMovie();
  }, []);
};

export default useMovieTrailor;
