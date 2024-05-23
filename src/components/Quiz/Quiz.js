import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Quiz.module.css";

function Quiz({ quiz, setQuiz }) {
  const [quizDetails, setQuizDetails] = useState();
  const quizDataState = useSelector((state) => state.quizInfo);
  const [questionCount, setQuestionCount] = useState([]);

  const [quizInfo, setQuizInfo] = useState({
    quizName: "" || quizDetails?.quizName,
    quizType: "" || quizDetails?.quizType,
    optionType: "" || quizDetails?.optionType,
    timer: "" || quizDetails?.timer,
    ques1: quizDetails?.ques1 || [],
    ques2: quizDetails?.ques2 || [],
    ques3: quizDetails?.ques3 || [],
    ques4: quizDetails?.ques4 || [],
    ques5: quizDetails?.ques5 || [],
  });

  const addQuestion = () => {
    let lastElement = questionCount[questionCount.length - 1];
  };

  console.log(quizDataState);

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.buttonContainer}>
            <button className={styles.question}>1</button>

            <button onClick={() => addQuestion()} className={styles.addButton}>
              +
            </button>
          </div>

          <input placeholder="Poll Question" />

          <div>
            <label>Option Type</label>
            <input type="radio" id="text" name="option_type" value={"Text"} />
            <label htmlFor="text">Text</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
