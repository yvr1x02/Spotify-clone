// src/store/playerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTrack: null,
  likedTracks: {},
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentTrack(state, action) {
      state.currentTrack = action.payload;
    },
    toggleLikeTrack(state, action) {
      const trackId = action.payload.id;
      if (state.likedTracks[trackId]) {
        delete state.likedTracks[trackId];
      } else {
        state.likedTracks[trackId] = action.payload;
      }
    },
  },
});

export const { setCurrentTrack, toggleLikeTrack } = playerSlice.actions;
export default playerSlice.reducer;
