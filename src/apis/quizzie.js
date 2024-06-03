import axios from "axios";

export const addQuiz = async ({
  quizName,
  isPoll,
  optionType,
  timer,
  ques1,
  ques2,
  ques3,
  ques4,
  ques5,
  email,
}) => {
  try {
    const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/quiz/add`;

    const response = await axios.post(reqUrl, {
      quizName,
      isPoll,
      optionType,
      timer,
      ques1,
      ques2,
      ques3,
      ques4,
      ques5,
      email,
    });

    if (response?.data?.quizId) {
      console.log(response?.data?.quizId);
      return response?.data?.quizId;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateImpressionsOnQuiz = async (quizId) => {
  try {
    const reqUrl = `${
      process.env.REACT_APP_BACKEND_URL
    }/quiz/update/impressions?id=${quizId || ""}`;

    const response = await axios.put(reqUrl);
  } catch (error) {
    console.log(error);
  }
};

export const getQuiz = async (quizId) => {
  try {
    const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/quiz/getOne?id=${
      quizId || ""
    }`;

    const response = await axios.get(reqUrl);
    console.log("response", response);

    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateQuizResponses = async (id, quizAnswers) => {
  try {
    const reqUrl = `${
      process.env.REACT_APP_BACKEND_URL
    }/quiz/update/quizResponses?id=${id || ""}`;

    console.log(quizAnswers);
    console.log(reqUrl, quizAnswers);

    const response = await axios.put(reqUrl, quizAnswers);
  } catch (error) {
    console.log(error);
  }
};
