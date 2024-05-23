import { createSlice } from "@reduxjs/toolkit";

export const quizInfoSlice = createSlice({
  name: "quizInfo",

  initialState: {
    value: null,
  },

  reducers: {
    setQuizInfo: (state, action) => {
      state.value = action.payload;
    },

    unSetQuizInfo: (state) => {
      state.value = null;
    },
  },
});

export const { setQuizInfo, unSetQuizInfo } = quizInfoSlice.actions;
export default quizInfoSlice.reducer;
