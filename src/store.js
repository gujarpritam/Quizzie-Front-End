import { configureStore } from "@reduxjs/toolkit";
import quizInfoReducer from "./slices/quizInfoSlice";

const store = configureStore({
  reducer: {
    quizInfo: quizInfoReducer,
  },
});

export default store;
