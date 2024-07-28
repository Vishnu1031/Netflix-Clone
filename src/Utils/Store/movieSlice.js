import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailor: null,
    popularMovies: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTrailor: (state, action) => {
      state.trailor = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addTrailor ,addPopularMovies} = movieSlice.actions;
export default movieSlice.reducer;
