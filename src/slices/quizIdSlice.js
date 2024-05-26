import { createSlice } from "@reduxjs/toolkit";

export const quizIdSlice = createSlice({
  name: "quizId",

  initialState: {
    value: null,
  },

  reducers: {
    setQuizId: (state, action) => {
      state.value = action.payload;
    },

    unSetQuizId: (state) => {
      state.value = null;
    },
  },
});

export const { setQuizId, unSetQuizId } = quizIdSlice.actions;
export default quizIdSlice.reducer;
