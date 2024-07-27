import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailor: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailor: (state, action) => {
      state.trailor = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addTrailor } = movieSlice.actions;
export default movieSlice.reducer;
