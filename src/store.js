import { configureStore } from "@reduxjs/toolkit";
import quizInfoReducer from "./slices/quizInfoSlice";
import quizIdReducer from "./slices/quizIdSlice";

const store = configureStore({
  reducer: {
    quizInfo: quizInfoReducer,
    quizId: quizIdReducer,
  },
});

export default store;
