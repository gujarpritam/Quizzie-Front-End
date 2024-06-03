import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setQuizInfo } from "../../slices/quizInfoSlice";
import styles from "./CreateQuiz.module.css";
import { ToastContainer, toast } from "react-toastify";

function CreateQuiz({ quiz, setQuiz, setIsPoll }) {
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

  useEffect(() => {
    setIsPoll(quizData.isPoll);
  }, [quizData.isPoll]);

  const handleCancel = () => {
    setQuiz(0);
  };

  const handleChange = (e) => {
    setQuizData({ ...quizData, ["quizName"]: e.target.value });
  };

  const handleContinue = () => {
    if (!quizData.quizName || quizData.isPoll === null) {
      toast("Fields can't be empty", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    setQuiz(2);
    dispatch(setQuizInfo(quizData));
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
                handleContinue();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateQuiz;
