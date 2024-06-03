import React, { useEffect, useState } from "react";
import {
  updateImpressionsOnQuiz,
  getQuiz,
  updateQuizResponses,
} from "../../apis/quizzie";
import styles from "./ShowQuiz.module.css";

function ShowQuiz({ id }) {
  const [resArr, setResArr] = useState();
  const [state, setState] = useState();
  const [option, setOption] = useState(null);
  const [lastQuestion, setLastQuestion] = useState(null);
  const [lastAns, setLastAns] = useState(null);
  const [score, setScore] = useState(0);

  const [quizAnswers, setQuizAnswers] = useState({
    ques1: null,
    ques2: null,
    ques3: null,
    ques4: null,
    ques5: null,
  });

  const [quizInfo, setQuizInfo] = useState({
    quizName: "",
    isPoll: "",
    optionType: "",
    timer: "",
    ques1: ["", [[], [], [], []]],
    ques2: ["", [[], [], [], []]],
    ques3: ["", [[], [], [], []]],
    ques4: ["", [[], [], [], []]],
    ques5: ["", [[], [], [], []]],
    email: "",
  });

  const handleQuizUpdate = async (id) => {
    await updateImpressionsOnQuiz(id);
    const result = await getQuiz(id);

    setResArr([
      [...result.ques1],
      [...result.ques2],
      [...result.ques3],
      [...result.ques4],
      [...result.ques5],
    ]);

    setQuizInfo({
      ...quizInfo,
      ["isPoll"]: result.isPoll,
      ["optionType"]: result.optionType,
      ["timer"]: result.timer,
    });

    setState(1);
  };

  const updateQuiz = async () => {
    if (quizInfo.isPoll === "false") {
      if (lastQuestion === 1) {
        if (lastAns === true) {
          setQuizAnswers({
            ...quizAnswers,
            ["ques1"]: true,
          });
        }
        if (lastAns === false) {
          setQuizAnswers({
            ...quizAnswers,
            ["ques1"]: false,
          });
        }
      }

      if (lastQuestion === 2) {
        if (lastAns === true) {
          setQuizAnswers({
            ...quizAnswers,
            ["ques2"]: true,
          });
        }
        if (lastAns === false) {
          setQuizAnswers({
            ...quizAnswers,
            ["ques2"]: false,
          });
        }
      }

      if (lastQuestion === 3) {
        if (lastAns === true) {
          setQuizAnswers({
            ...quizAnswers,
            ["ques3"]: true,
          });
        }
        if (lastAns === false) {
          setQuizAnswers({
            ...quizAnswers,
            ["ques3"]: false,
          });
        }
      }

      if (lastQuestion === 4) {
        if (lastAns === true) {
          setQuizAnswers({
            ...quizAnswers,
            ["ques4"]: true,
          });
        }
        if (lastAns === false) {
          setQuizAnswers({
            ...quizAnswers,
            ["ques4"]: false,
          });
        }
      }

      if (lastQuestion === 5) {
        if (lastAns === true) {
          setQuizAnswers({
            ...quizAnswers,
            ["ques5"]: true,
          });
        }
        if (lastAns === false) {
          setQuizAnswers({
            ...quizAnswers,
            ["ques5"]: false,
          });
        }
      }

      await updateQuizResponses(id, quizAnswers);

      let totalScore = 0;
      ["ques1", "ques2", "ques3", "ques4", "ques5"].forEach((element) => {
        if (quizAnswers[element] === true) {
          totalScore = totalScore + 1;
        }
      });

      if (lastAns === true) {
        totalScore = totalScore + 1;
      }

      setScore(totalScore);
    }
  };

  const selectOption = (data) => {
    setOption(data);
  };

  const saveOption = (questionNumber) => {
    if (quizInfo.isPoll === "false") {
      if (questionNumber === 1) {
        if (option === resArr[0][2]) {
          setQuizAnswers({
            ...quizAnswers,
            ["ques1"]: true,
          });
          setLastAns(true);
        } else if (option !== null) {
          setQuizAnswers({
            ...quizAnswers,
            ["ques1"]: false,
          });
          setLastAns(false);
        }
        setLastQuestion(1);
        setOption(null);
      }

      if (questionNumber === 2) {
        if (option === resArr[1][2]) {
          setQuizAnswers((prev) => {
            return {
              ...prev,
              ["ques2"]: true,
            };
          });
          setLastAns(true);
        } else if (option !== null) {
          setQuizAnswers((prev) => {
            return {
              ...prev,
              ["ques2"]: false,
            };
          });
          setLastAns(false);
        }
        setLastQuestion(2);
        setOption(null);
      }

      if (questionNumber === 3) {
        if (option === resArr[2][2]) {
          setQuizAnswers({
            ...quizAnswers,
            ["ques3"]: true,
          });
          setLastAns(true);
        } else if (option !== null) {
          setQuizAnswers({
            ...quizAnswers,
            ["ques3"]: false,
          });
          setLastAns(false);
        }
        setLastQuestion(3);
        setOption(null);
      }

      if (questionNumber === 4) {
        if (option === resArr[3][2]) {
          setQuizAnswers({
            ...quizAnswers,
            ["ques4"]: true,
          });
          setLastAns(true);
        } else if (option !== null) {
          setQuizAnswers({
            ...quizAnswers,
            ["ques4"]: false,
          });
          setLastAns(false);
        }
        setLastQuestion(4);
        setOption(null);
      }

      if (questionNumber === 5) {
        if (option === resArr[4][2]) {
          setQuizAnswers({
            ...quizAnswers,
            ["ques5"]: true,
          });
          setLastAns(true);
        } else if (option !== null) {
          setQuizAnswers({
            ...quizAnswers,
            ["ques5"]: false,
          });
          setLastAns(false);
        }
        setLastQuestion(5);
        setOption(null);
      }
    }
  };

  useEffect(() => {
    handleQuizUpdate(id);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        {quizInfo["optionType"] === "text" &&
          state === 1 &&
          resArr[0][0].length !== 0 && (
            <div className={styles.innerBox}>
              <div className={styles.number}>1</div>
              <h1 className={styles.heading}>{resArr[0][0]}</h1>
              <div className={styles.optionBox}>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option1")}
                  >
                    <span>{resArr[0][1][0]}</span>
                  </div>
                  <div
                    onClick={() => selectOption("option2")}
                    className={styles.div}
                  >
                    <span>{resArr[0][1][1]}</span>
                  </div>
                </div>
                <div>
                  <div
                    onClick={() => selectOption("option3")}
                    className={styles.div}
                  >
                    <span>{resArr[0][1][2]}</span>
                  </div>
                  <div
                    onClick={() => selectOption("option4")}
                    className={styles.div}
                  >
                    <span>{resArr[0][1][3]}</span>
                  </div>
                </div>
                <button
                  className={styles.button}
                  onClick={() => {
                    setState(2);
                    saveOption(1);
                    resArr[1][0].length === 0 && updateQuiz();
                  }}
                >
                  {resArr[1][0].length === 0 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          )}

        {quizInfo["optionType"] === "text" &&
          state === 2 &&
          resArr[1][0].length !== 0 && (
            <div className={styles.innerBox}>
              <div className={styles.number}>2</div>
              <h1 className={styles.heading}>{resArr[1][0]}</h1>
              <div className={styles.optionBox}>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option1")}
                  >
                    <span>{resArr[1][1][0]}</span>
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option2")}
                  >
                    <span>{resArr[1][1][1]}</span>
                  </div>
                </div>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option3")}
                  >
                    <span>{resArr[1][1][2]}</span>
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option4")}
                  >
                    <span>{resArr[1][1][3]}</span>
                  </div>
                </div>
                <button
                  className={styles.button}
                  onClick={() => {
                    setState(3);
                    saveOption(2);
                    resArr[2][0].length === 0 && updateQuiz();
                  }}
                >
                  {resArr[2][0].length === 0 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          )}

        {quizInfo["optionType"] === "text" &&
          state === 3 &&
          resArr[2][0].length !== 0 && (
            <div className={styles.innerBox}>
              <div className={styles.number}>3</div>
              <h1 className={styles.heading}>{resArr[2][0]}</h1>
              <div className={styles.optionBox}>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option1")}
                  >
                    <span>{resArr[2][1][0]}</span>
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option2")}
                  >
                    <span>{resArr[2][1][1]}</span>
                  </div>
                </div>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option3")}
                  >
                    <span>{resArr[2][1][2]}</span>
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option4")}
                  >
                    <span>{resArr[2][1][3]}</span>
                  </div>
                </div>
                <button
                  className={styles.button}
                  onClick={() => {
                    setState(4);
                    saveOption(3);
                    resArr[3][0].length === 0 && updateQuiz();
                  }}
                >
                  {resArr[3][0].length === 0 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          )}

        {quizInfo["optionType"] === "text" &&
          state === 4 &&
          resArr[3][0].length !== 0 && (
            <div className={styles.innerBox}>
              <div className={styles.number}>4</div>
              <h1 className={styles.heading}>{resArr[3][0]}</h1>
              <div className={styles.optionBox}>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option1")}
                  >
                    <span>{resArr[3][1][0]}</span>
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option2")}
                  >
                    <span>{resArr[3][1][1]}</span>
                  </div>
                </div>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option3")}
                  >
                    <span>{resArr[3][1][2]}</span>
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option4")}
                  >
                    <span>{resArr[3][1][3]}</span>
                  </div>
                </div>
                <button
                  className={styles.button}
                  onClick={() => {
                    saveOption(4);
                    setState(5);
                    resArr[4][0].length === 0 && updateQuiz();
                  }}
                >
                  {resArr[4][0].length === 0 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          )}

        {quizInfo["optionType"] === "text" &&
          state === 5 &&
          resArr[4][0].length !== 0 && (
            <div className={styles.innerBox}>
              <div className={styles.number}>5</div>
              <h1 className={styles.heading}>{resArr[4][0]}</h1>
              <div className={styles.optionBox}>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option1")}
                  >
                    <span>{resArr[4][1][0]}</span>
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option2")}
                  >
                    <span>{resArr[4][1][1]}</span>
                  </div>
                </div>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option3")}
                  >
                    <span>{resArr[4][1][2]}</span>
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option4")}
                  >
                    <span>{resArr[4][1][3]}</span>
                  </div>
                </div>
                <button
                  className={styles.button}
                  onClick={() => {
                    saveOption(5);
                    setState(5);
                    updateQuiz();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          )}

        {quizInfo["optionType"] === "image" &&
          state === 1 &&
          resArr[0][0].length !== 0 && (
            <div className={styles.innerBox}>
              <div className={styles.number}>1</div>
              <h1 className={styles.heading}>{resArr[0][0]}</h1>
              <div className={styles.optionBox}>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option1")}
                  >
                    <img src={resArr[0][1][0]} />
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option2")}
                  >
                    <img src={resArr[0][1][1]} />
                  </div>
                </div>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option3")}
                  >
                    <img src={resArr[0][1][2]} />
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option4")}
                  >
                    <img src={resArr[0][1][3]} />
                  </div>
                </div>
                <button
                  className={styles.button}
                  onClick={() => {
                    saveOption(1);
                    setState(2);
                    resArr[1][0].length === 0 && updateQuiz();
                  }}
                >
                  {resArr[1][0].length === 0 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          )}

        {quizInfo["optionType"] === "image" &&
          state === 2 &&
          resArr[1][0].length !== 0 && (
            <div className={styles.innerBox}>
              <div className={styles.number}>2</div>
              <h1 className={styles.heading}>{resArr[1][0]}</h1>
              <div className={styles.optionBox}>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option1")}
                  >
                    <img src={resArr[1][1][0]} />
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option2")}
                  >
                    <img src={resArr[1][1][1]} />
                  </div>
                </div>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option3")}
                  >
                    <img src={resArr[1][1][2]} />
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option4")}
                  >
                    <img src={resArr[1][1][3]} />
                  </div>
                </div>
                <button
                  className={styles.button}
                  onClick={() => {
                    saveOption(2);
                    setState(3);
                    resArr[2][0].length === 0 && updateQuiz();
                  }}
                >
                  {resArr[2][0].length === 0 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          )}

        {quizInfo["optionType"] === "image" &&
          state === 3 &&
          resArr[2][0].length !== 0 && (
            <div className={styles.innerBox}>
              <div className={styles.number}>3</div>
              <h1 className={styles.heading}>{resArr[2][0]}</h1>
              <div className={styles.optionBox}>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option1")}
                  >
                    <img src={resArr[2][1][0]} />
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option2")}
                  >
                    <img src={resArr[2][1][1]} />
                  </div>
                </div>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option3")}
                  >
                    <img src={resArr[2][1][2]} />
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option4")}
                  >
                    <img src={resArr[2][1][3]} />
                  </div>
                </div>
                <button
                  className={styles.button}
                  onClick={() => {
                    saveOption(3);
                    setState(4);
                    resArr[3][0].length === 0 && updateQuiz();
                  }}
                >
                  {resArr[3][0].length === 0 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          )}

        {quizInfo["optionType"] === "image" &&
          state === 4 &&
          resArr[3][0].length !== 0 && (
            <div className={styles.innerBox}>
              <div className={styles.number}>4</div>
              <h1 className={styles.heading}>{resArr[3][0]}</h1>
              <div className={styles.optionBox}>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option1")}
                  >
                    <img src={resArr[3][1][0]} />
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option2")}
                  >
                    <img src={resArr[3][1][1]} />
                  </div>
                </div>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option3")}
                  >
                    <img src={resArr[3][1][2]} />
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option4")}
                  >
                    <img src={resArr[3][1][3]} />
                  </div>
                </div>
                <button
                  className={styles.button}
                  onClick={() => {
                    saveOption(4);
                    setState(5);
                  }}
                >
                  {resArr[4][0].length === 0 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          )}

        {quizInfo["optionType"] === "image" &&
          state === 5 &&
          resArr[4][0].length !== 0 && (
            <div className={styles.innerBox}>
              <div className={styles.number}>5</div>
              <h1 className={styles.heading}>{resArr[4][0]}</h1>
              <div className={styles.optionBox}>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option1")}
                  >
                    <img src={resArr[4][1][0]} />
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option2")}
                  >
                    <img src={resArr[4][1][1]} />
                  </div>
                </div>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option3")}
                  >
                    <img src={resArr[4][1][2]} />
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option4")}
                  >
                    <img src={resArr[4][1][3]} />
                  </div>
                </div>
                <button
                  className={styles.button}
                  onClick={() => {
                    saveOption(5);
                    setState(5);
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          )}

        {quizInfo["optionType"] === "text-image" &&
          state === 1 &&
          resArr[0][0].length !== 0 && (
            <div className={styles.innerBox}>
              <div className={styles.number}>1</div>
              <h1 className={styles.heading}>{resArr[0][0]}</h1>
              <div className={styles.optionBox}>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option1")}
                  >
                    <span>{resArr[0][1][0][0]}</span>
                    <img src={resArr[0][1][0][1]} />
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option2")}
                  >
                    <span>{resArr[0][1][1][0]}</span>
                    <img src={resArr[0][1][1][1]} />
                  </div>
                </div>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option3")}
                  >
                    <span>{resArr[0][1][2][0]}</span>
                    <img src={resArr[0][1][2][1]} />
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option4")}
                  >
                    <span>{resArr[0][1][3][0]}</span>
                    <img src={resArr[0][1][3][1]} />
                  </div>
                </div>
                <button
                  className={styles.button}
                  onClick={() => {
                    saveOption(1);
                    setState(2);
                  }}
                >
                  {resArr[1][0].length === 0 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          )}

        {quizInfo["optionType"] === "text-image" &&
          state === 2 &&
          resArr[1][0].length !== 0 && (
            <div className={styles.innerBox}>
              <div className={styles.number}>2</div>
              <h1 className={styles.heading}>{resArr[1][0]}</h1>
              <div className={styles.optionBox}>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option1")}
                  >
                    <span>{resArr[1][1][0][0]}</span>
                    <img src={resArr[1][1][0][1]} />
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option2")}
                  >
                    <span>{resArr[1][1][1][0]}</span>
                    <img src={resArr[1][1][1][1]} />
                  </div>
                </div>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option3")}
                  >
                    <span>{resArr[1][1][2][0]}</span>
                    <img src={resArr[1][1][2][1]} />
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option4")}
                  >
                    <span>{resArr[1][1][3][0]}</span>
                    <img src={resArr[1][1][3][1]} />
                  </div>
                </div>
                <button
                  className={styles.button}
                  onClick={() => {
                    saveOption(2);
                    setState(3);
                  }}
                >
                  {resArr[2][0].length === 0 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          )}

        {quizInfo["optionType"] === "text-image" &&
          state === 3 &&
          resArr[2][0].length !== 0 && (
            <div className={styles.innerBox}>
              <div className={styles.number}>3</div>
              <h1 className={styles.heading}>{resArr[2][0]}</h1>
              <div className={styles.optionBox}>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option1")}
                  >
                    <span>{resArr[2][1][0][0]}</span>
                    <img src={resArr[2][1][0][1]} />
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option2")}
                  >
                    <span>{resArr[2][1][1][0]}</span>
                    <img src={resArr[2][1][1][1]} />
                  </div>
                </div>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option3")}
                  >
                    <span>{resArr[2][1][2][0]}</span>
                    <img src={resArr[2][1][2][1]} />
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option4")}
                  >
                    <span>{resArr[2][1][3][0]}</span>
                    <img src={resArr[2][1][3][1]} />
                  </div>
                </div>
                <button
                  className={styles.button}
                  onClick={() => {
                    saveOption(3);
                    setState(4);
                  }}
                >
                  {resArr[3][0].length === 0 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          )}

        {quizInfo["optionType"] === "text-image" &&
          state === 4 &&
          resArr[3][0].length !== 0 && (
            <div className={styles.innerBox}>
              <div className={styles.number}>4</div>
              <h1 className={styles.heading}>{resArr[3][0]}</h1>
              <div className={styles.optionBox}>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option1")}
                  >
                    <span>{resArr[3][1][0][0]}</span>
                    <img src={resArr[3][1][0][1]} />
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option2")}
                  >
                    <span>{resArr[3][1][1][0]}</span>
                    <img src={resArr[3][1][1][1]} />
                  </div>
                </div>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option3")}
                  >
                    <span>{resArr[3][1][2][0]}</span>
                    <img src={resArr[3][1][2][1]} />
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option4")}
                  >
                    <span>{resArr[3][1][3][0]}</span>
                    <img src={resArr[3][1][3][1]} />
                  </div>
                </div>
                <button
                  className={styles.button}
                  onClick={() => {
                    saveOption(4);
                    setState(5);
                  }}
                >
                  {resArr[4][0].length === 0 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          )}

        {quizInfo["optionType"] === "text-image" &&
          state === 5 &&
          resArr[4][0].length !== 0 && (
            <div className={styles.innerBox}>
              <div className={styles.number}>5</div>
              <h1 className={styles.heading}>{resArr[4][0]}</h1>
              <div className={styles.optionBox}>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option1")}
                  >
                    <span>{resArr[4][1][0][0]}</span>
                    <img src={resArr[4][1][0][1]} />
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option2")}
                  >
                    <span>{resArr[4][1][1][0]}</span>
                    <img src={resArr[4][1][1][1]} />
                  </div>
                </div>
                <div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option3")}
                  >
                    <span>{resArr[4][1][2][0]}</span>
                    <img src={resArr[4][1][2][1]} />
                  </div>
                  <div
                    className={styles.div}
                    onClick={() => selectOption("option4")}
                  >
                    <span>{resArr[4][1][3][0]}</span>
                    <img src={resArr[4][1][3][1]} />
                  </div>
                </div>
                <button
                  className={styles.button}
                  onClick={() => {
                    saveOption(5);
                    setState(5);
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default ShowQuiz;
