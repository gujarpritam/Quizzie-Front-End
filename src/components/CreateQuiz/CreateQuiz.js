import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setQuizInfo } from "../../slices/quizInfoSlice";
import styles from "./CreateQuiz.module.css";

function CreateQuiz({ quiz, setQuiz }) {
  const [quizOption, setQuizOption] = useState();
  const dispatch = useDispatch();
  const [quizData, setQuizData] = useState({
    quizName: "",
    isPoll: null,
  });

  useEffect(() => {
    if (quizOption === 1) {
      document
        .getElementsByClassName(styles.button)[0]
        .setAttribute("style", "background:#60B84B;color: white");
      document
        .getElementsByClassName(styles.button)[1]
        .setAttribute("style", "background:none;color: #9F9F9F");
    } else if (quizOption === 0) {
      document
        .getElementsByClassName(styles.button)[1]
        .setAttribute("style", "background:#60B84B;color: white");
      document
        .getElementsByClassName(styles.button)[0]
        .setAttribute("style", "background:none;color: #9F9F9F");
    }
  }, [quizOption]);

  const handleCancel = () => {
    setQuiz(0);
  };

  const handleChange = (e) => {
    setQuizData({ ...quizData, ["quizName"]: e.target.value });
  };

  console.log(quizData);
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.innerBox}>
          <input
            className={styles.input}
            type="text"
            name="heading"
            value={quizData.quizName}
            onChange={(e) => handleChange(e)}
            placeholder="Quiz name"
          ></input>

          <div className={styles.quizType}>
            <label className={styles.label}>Quiz Type</label>
            <button
              className={styles.button}
              id="q&a"
              onClick={() => {
                setQuizOption(1);
                setQuizData((prevState) => {
                  return { ...prevState, ["isPoll"]: false };
                });
              }}
            >
              Q & A
            </button>
            <button
              className={styles.button}
              id="poll"
              onClick={() => {
                setQuizOption(0);
                setQuizData((prevState) => {
                  return { ...prevState, ["isPoll"]: true };
                });
              }}
            >
              Poll Type
            </button>
          </div>

          <div className={styles.buttonBox}>
            <button className={styles.cancel} onClick={handleCancel}>
              Cancel
            </button>
            <button
              className={styles.continue}
              onClick={() => {
                setQuiz(2);
                dispatch(setQuizInfo(quizData));
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateQuiz;
