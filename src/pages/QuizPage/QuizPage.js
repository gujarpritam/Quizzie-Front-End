import React, { useEffect } from "react";
import { updateImpressionsOnQuiz, getQuiz } from "../../apis/quizzie";
import { useParams } from "react-router-dom";
import styles from "./QuizPage.module.css";

function QuizPage() {
  const { id } = useParams();

  const handleQuizUpdate = async (id) => {
    await updateImpressionsOnQuiz(id);

    const result = await getQuiz(id);

    console.log(result);
  };

  useEffect(() => {
    console.log(id);
    handleQuizUpdate(id);
  }, []);

  return <div>QuizPage</div>;
}

export default QuizPage;
