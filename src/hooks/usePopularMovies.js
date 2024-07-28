import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS, fetchPopularMoviesUrl, } from "../Utils/constants/constants";
import { addPopularMovies } from "../Utils/Store/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const fetchPopularMovies = async () => {
    const data = await fetch(fetchPopularMoviesUrl, API_OPTIONS);
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);
};

export default usePopularMovies;
