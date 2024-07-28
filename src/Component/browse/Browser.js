import React from "react";
import Header from "../Header";
import useNowPlayingMovies from "../../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../../hooks/usePopularMovies";
import GptSearch from "./GptSearchPage";
import { useSelector } from "react-redux";

const Browser = () => {
  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browser;
