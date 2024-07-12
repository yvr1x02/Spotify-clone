// src/store/store.js

import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";

const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});

export default store;
