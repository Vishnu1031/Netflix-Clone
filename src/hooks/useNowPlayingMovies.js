import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS, fetchMovieUrl } from "../Utils/constants/constants";
import { addNowPlayingMovies } from "../Utils/Store/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const fetchNowPlayingMovies = async () => {
    const data = await fetch(fetchMovieUrl, API_OPTIONS);
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
