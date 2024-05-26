import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Quiz.module.css";
import add from "../../assets/icons/add-button.png";
import cross from "../../assets/icons/cross.png";
import { ToastContainer, toast } from "react-toastify";
import { addQuiz } from "../../apis/quizzie";
import { setQuizId } from "../../slices/quizIdSlice";

function Quiz({ quiz, setQuiz }) {
  const [quizDetails, setQuizDetails] = useState();
  const quizDataState = useSelector((state) => state.quizInfo.value);
  const [questionCount, setQuestionCount] = useState([]);
  // const [selectedOption, setSelectedOption] = useState("text");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [queNames] = useState(["ques1", "ques2", "ques3", "ques4", "ques5"]);
  const dispatch = useDispatch();

  const [quizInfo, setQuizInfo] = useState({
    quizName: "" || quizDetails?.quizName,
    isPoll: "" || quizDetails?.isPoll,
    optionType: "" || quizDetails?.optionType,
    timer: "" || quizDetails?.timer,
    ques1: ["", [[], [], [], []]] || quizDetails?.ques1,
    ques2: quizDetails?.ques2 || ["", [[], [], [], []]],
    ques3: quizDetails?.ques3 || ["", [[], [], [], []]],
    ques4: quizDetails?.ques4 || ["", [[], [], [], []]],
    ques5: quizDetails?.ques5 || ["", [[], [], [], []]],
    email: "" || quizDetails?.email,
  });

  useEffect(() => {
    let name = quizDataState.quizName;
    let quizType = quizDataState.isPoll;
    let emailId = localStorage.getItem("email");
    setQuizInfo({
      ...quizInfo,
      ["quizName"]: name,
      ["isPoll"]: quizType.toString(),
      ["optionType"]: "text",
      ["timer"]: "0",
      ["email"]: emailId,
    });

    // console.log(quizDataState.quizName, " ", typeof quizInfo.isPoll);
  }, []);

  const addQuestion = () => {
    let arr = questionCount;
    if (arr.length >= 4) {
      return;
    }
    if (arr.length === 0) {
      arr.push(1);
      setQuestionCount([...arr]);
      console.log(questionCount);
      return;
    }
    let lastElement = questionCount[questionCount.length - 1];

    arr.push(lastElement + 1);
    setQuestionCount([...arr]);
    // console.log(questionCount);
  };

  const selectSlide = (id) => {
    setCurrentQuestion(id);
    toast.dismiss(toastId);
    var toastId = toast(`You are on Question ${id + 1}`, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const closeButton = (e, item) => {
    const newArr = questionCount.filter((number) => number !== item);
    setQuestionCount([...newArr]);

    console.log(e, item);

    setQuizInfo({ ...quizInfo, [queNames[item]]: ["", [[], [], [], []]] });
    if (currentQuestion === item) {
      selectSlide(0);
    }
    e.stopPropagation();
  };

  // const handleOption = (e) => {
  //   setSelectedOption(e.target.id);
  // };

  const handleCancel = () => {
    setQuiz(0);
  };

  const handleContinue = async () => {
    console.log(localStorage.getItem("email"));

    console.log(quizInfo);
    const result = await addQuiz(quizInfo);

    if (result) {
      setQuiz(3);
      dispatch(setQuizId(result));
    }
  };

  const handleChange = (e) => {
    let quesArr = quizInfo[queNames[currentQuestion]];
    // console.log(quesArr);
    console.log(e.target.name);

    if (e.target.name === "question") {
      quesArr = Array.from(quesArr);
      quesArr[0] = e.target.value;

      setQuizInfo({ ...quizInfo, [queNames[currentQuestion]]: quesArr });
    } else if (
      e.target.name === "input1" ||
      e.target.name === "input2" ||
      e.target.name === "input3" ||
      e.target.name === "input4"
    ) {
      // console.log(quizInfo.ques1[1]);
      quesArr = Array.from(quesArr);
      if (e.target.name === "input1") {
        quesArr[1][0] = e.target.value;
      } else if (e.target.name === "input2") {
        quesArr[1][1] = e.target.value;
      } else if (e.target.name === "input3") {
        quesArr[1][2] = e.target.value;
      } else if (e.target.name === "input4") {
        quesArr[1][3] = e.target.value;
      }
      setQuizInfo({ ...quizInfo, [queNames[currentQuestion]]: quesArr });
    } else if (
      e.target.name === "text1" ||
      e.target.name === "text2" ||
      e.target.name === "text3" ||
      e.target.name === "text4"
    ) {
      quesArr = Array.from(quesArr);
      if (e.target.name === "text1") {
        quesArr[1][0][0] = e.target.value;
      } else if (e.target.name === "text2") {
        quesArr[1][1][0] = e.target.value;
      } else if (e.target.name === "text3") {
        quesArr[1][2][0] = e.target.value;
      } else if (e.target.name === "text4") {
        quesArr[1][3][0] = e.target.value;
      }
      setQuizInfo({ ...quizInfo, [queNames[currentQuestion]]: quesArr });
    } else if (
      e.target.name === "image1" ||
      e.target.name === "image2" ||
      e.target.name === "image3" ||
      e.target.name === "image4"
    ) {
      quesArr = Array.from(quesArr);
      if (e.target.name === "image1") {
        quesArr[1][0][1] = e.target.value;
      } else if (e.target.name === "image2") {
        quesArr[1][1][1] = e.target.value;
      } else if (e.target.name === "image3") {
        quesArr[1][2][1] = e.target.value;
      } else if (e.target.name === "image4") {
        quesArr[1][3][1] = e.target.value;
      }
      setQuizInfo({ ...quizInfo, [queNames[currentQuestion]]: quesArr });
    } else if (e.target.name === "optionType") {
      setQuizInfo({ ...quizInfo, ["optionType"]: e.target.id });
    }

    console.log(e.target.name);
    if (
      (e.target.name === "option1" ||
        e.target.name === "option2" ||
        e.target.name === "option3" ||
        e.target.name === "option4" ||
        e.target.name === "option5") &&
      quizInfo.isPoll === "false"
    ) {
      if (e.target.name === "option1") {
        //option1, option2 represents ques1, ques2
        let arr = quizInfo.ques1;

        console.log("classname", e.target.className);
        if (e.target.className === "radioButton1") {
          arr[2] = "option1";
        }
        if (e.target.className === "radioButton2") {
          arr[2] = "option2";
        }
        if (e.target.className === "radioButton3") {
          arr[2] = "option3";
        }
        if (e.target.className === "radioButton4") {
          arr[2] = "option4";
        }
        setQuizInfo({ ...quizInfo, ["ques1"]: arr });

        console.log(quizInfo);
      }
      if (e.target.name === "option2") {
        //option1, option2 represents ques1, ques2
        let arr = quizInfo.ques2;

        console.log(e.target.className);
        if (e.target.className === "radioButton1") {
          arr[2] = "option1";
        }
        if (e.target.className === "radioButton2") {
          arr[2] = "option2";
        }
        if (e.target.className === "radioButton3") {
          arr[2] = "option3";
        }
        if (e.target.className === "radioButton4") {
          arr[2] = "option4";
        }
        setQuizInfo({ ...quizInfo, ["ques2"]: arr });

        console.log(quizInfo);
      }
      if (e.target.name === "option3") {
        //option1, option2 represents ques1, ques2
        let arr = quizInfo.ques3;

        console.log(e.target.className);
        if (e.target.className === "radioButton1") {
          arr[2] = "option1";
        }
        if (e.target.className === "radioButton2") {
          arr[2] = "option2";
        }
        if (e.target.className === "radioButton3") {
          arr[2] = "option3";
        }
        if (e.target.className === "radioButton4") {
          arr[2] = "option4";
        }
        setQuizInfo({ ...quizInfo, ["ques3"]: arr });

        console.log(quizInfo);
      }
      if (e.target.name === "option4") {
        //option1, option2 represents ques1, ques2
        let arr = quizInfo.ques4;

        console.log(e.target.className);
        if (e.target.className === "radioButton1") {
          arr[2] = "option1";
        }
        if (e.target.className === "radioButton2") {
          arr[2] = "option2";
        }
        if (e.target.className === "radioButton3") {
          arr[2] = "option3";
        }
        if (e.target.className === "radioButton4") {
          arr[2] = "option4";
        }
        setQuizInfo({ ...quizInfo, ["ques4"]: arr });

        console.log(quizInfo);
      }
      if (e.target.name === "option5") {
        //option1, option2 represents ques1, ques2
        let arr = quizInfo.ques5;

        console.log(e.target.className);
        if (e.target.className === "radioButton1") {
          arr[2] = "option1";
        }
        if (e.target.className === "radioButton2") {
          arr[2] = "option2";
        }
        if (e.target.className === "radioButton3") {
          arr[2] = "option3";
        }
        if (e.target.className === "radioButton4") {
          arr[2] = "option4";
        }
        setQuizInfo({ ...quizInfo, ["ques5"]: arr });

        console.log(quizInfo);
      }
    }
  };

  console.log(quizDataState);
  console.log("quizInfo", quizInfo);
  // console.log("selectedOption", selectedOption);
  // console.log("currentQuestion", currentQuestion);

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.buttonContainer}>
            <button
              className={styles.questionNumber}
              onClick={() => selectSlide(0)}
            >
              1
            </button>

            {questionCount.map((item) => {
              return (
                <button
                  onClick={() => selectSlide(item)}
                  className={styles.questionNumber}
                  id={item}
                >
                  {item + 1}
                  <img
                    onClick={(event) => closeButton(event, item)}
                    src={cross}
                    className={styles.close}
                  />
                </button>
              );
            })}

            <img
              src={add}
              onClick={() => addQuestion()}
              className={styles.addButton}
            />
          </div>

          {currentQuestion === 0 && (
            <input
              name="question"
              value={quizInfo.ques1[0]}
              onChange={(e) => handleChange(e)}
              className={styles.input}
              placeholder="Poll Question"
            />
          )}
          {currentQuestion === 1 && (
            <input
              name="question"
              value={quizInfo.ques2[0]}
              onChange={(e) => handleChange(e)}
              className={styles.input}
              placeholder="Poll Question"
            />
          )}
          {currentQuestion === 2 && (
            <input
              name="question"
              value={quizInfo.ques3[0]}
              onChange={(e) => handleChange(e)}
              className={styles.input}
              placeholder="Poll Question"
            />
          )}
          {currentQuestion === 3 && (
            <input
              name="question"
              value={quizInfo.ques4[0]}
              onChange={(e) => handleChange(e)}
              className={styles.input}
              placeholder="Poll Question"
            />
          )}
          {currentQuestion === 4 && (
            <input
              name="question"
              value={quizInfo.ques5[0]}
              onChange={(e) => handleChange(e)}
              className={styles.input}
              placeholder="Poll Question"
            />
          )}

          <div className={styles.options}>
            <label>Option Type</label>
            <input
              className={styles.radioButton}
              type="radio"
              id="text"
              name="optionType"
              // selectedOption
              onChange={handleChange}
              checked={quizInfo.optionType === "text"}
            />
            <label htmlFor="text">Text</label>

            <input
              className={styles.radioButton}
              type="radio"
              id="image"
              name="optionType"
              checked={quizInfo.optionType === "image"}
              onChange={handleChange}
            />
            <label htmlFor="image">Image URL</label>

            <input
              className={styles.radioButton}
              type="radio"
              id="text-image"
              name="optionType"
              checked={quizInfo.optionType === "text-image"}
              onChange={handleChange}
            />
            <label htmlFor="text-image">Text & Image URL</label>
          </div>

          <div className={styles.optionBox}>
            {quizInfo.optionType === "text" && (
              <>
                {currentQuestion === 0 && (
                  <div className={styles.option}>
                    <div>
                      <input
                        className="radioButton1"
                        type="radio"
                        // id="option1"
                        name="option1"
                        checked={quizInfo.ques1[2] === "option1"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="input1"
                        value={quizInfo.ques1[1][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton2"
                        type="radio"
                        // id="option2"
                        name="option1"
                        checked={quizInfo.ques1[2] === "option2"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="input2"
                        value={quizInfo.ques1[1][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                    </div>
                  </div>
                )}

                {currentQuestion === 1 && (
                  <div className={styles.option}>
                    <div>
                      <input
                        className="radioButton1"
                        type="radio"
                        // id="option1"
                        name="option2"
                        checked={quizInfo.ques2[2] === "option1"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="input1"
                        value={quizInfo.ques2[1][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton2"
                        type="radio"
                        // id="option2"
                        name="option2"
                        checked={quizInfo.ques2[2] === "option2"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="input2"
                        value={quizInfo.ques2[1][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                    </div>
                  </div>
                )}

                {currentQuestion === 2 && (
                  <div className={styles.option}>
                    <div>
                      <input
                        className="radioButton1"
                        type="radio"
                        // id="option1"
                        name="option3"
                        checked={quizInfo.ques3[2] === "option1"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="input1"
                        value={quizInfo.ques3[1][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton2"
                        type="radio"
                        // id="option2"
                        name="option3"
                        checked={quizInfo.ques3[2] === "option2"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="input2"
                        value={quizInfo.ques3[1][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                    </div>
                  </div>
                )}

                {currentQuestion === 3 && (
                  <div className={styles.option}>
                    <div>
                      <input
                        className="radioButton1"
                        type="radio"
                        // id="option1"
                        name="option4"
                        checked={quizInfo.ques4[2] === "option1"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="input1"
                        value={quizInfo.ques4[1][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton2"
                        type="radio"
                        // id="option2"
                        name="option4"
                        checked={quizInfo.ques4[2] === "option2"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="input2"
                        value={quizInfo.ques4[1][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                    </div>
                  </div>
                )}

                {currentQuestion === 4 && (
                  <div className={styles.option}>
                    <div>
                      <input
                        className="radioButton1"
                        type="radio"
                        // id="option1"
                        name="option5"
                        checked={quizInfo.ques5[2] === "option1"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="input1"
                        value={quizInfo.ques5[1][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton2"
                        type="radio"
                        // id="option2"
                        name="option5"
                        checked={quizInfo.ques5[2] === "option2"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="input2"
                        value={quizInfo.ques5[1][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* image */}

            {quizInfo.optionType === "image" && (
              <>
                {currentQuestion === 0 && (
                  <div className={styles.option}>
                    <div>
                      <input
                        className="radioButton1"
                        type="radio"
                        // id="imgOption1"
                        name="option1"
                        checked={quizInfo.ques1[2] === "option1"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="input1"
                        value={quizInfo.ques1[1][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton2"
                        type="radio"
                        // id="imgOption2"
                        name="option1"
                        checked={quizInfo.ques1[2] === "option2"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="input2"
                        value={quizInfo.ques1[1][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>
                  </div>
                )}

                {currentQuestion === 1 && (
                  <div className={styles.option}>
                    <div>
                      <input
                        className="radioButton1"
                        type="radio"
                        // id="imgOption1"
                        name="option2"
                        checked={quizInfo.ques2[2] === "option1"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="input1"
                        value={quizInfo.ques2[1][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton2"
                        type="radio"
                        // id="imgOption2"
                        name="option2"
                        checked={quizInfo.ques2[2] === "option2"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="input2"
                        value={quizInfo.ques2[1][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>
                  </div>
                )}

                {currentQuestion === 2 && (
                  <div className={styles.option}>
                    <div>
                      <input
                        className="radioButton1"
                        type="radio"
                        // id="imgOption1"
                        name="option3"
                        checked={quizInfo.ques3[2] === "option1"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="input1"
                        value={quizInfo.ques3[1][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton2"
                        type="radio"
                        // id="imgOption2"
                        name="option3"
                        checked={quizInfo.ques3[2] === "option2"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="input2"
                        value={quizInfo.ques3[1][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>
                  </div>
                )}

                {currentQuestion === 3 && (
                  <div className={styles.option}>
                    <div>
                      <input
                        className="radioButton1"
                        type="radio"
                        // id="imgOption1"
                        name="option4"
                        checked={quizInfo.ques4[2] === "option1"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="input1"
                        value={quizInfo.ques4[1][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton2"
                        type="radio"
                        // id="imgOption2"
                        name="option4"
                        checked={quizInfo.ques4[2] === "option2"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="input2"
                        value={quizInfo.ques4[1][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>
                  </div>
                )}
                {currentQuestion === 4 && (
                  <div className={styles.option}>
                    <div>
                      <input
                        className="radioButton1"
                        type="radio"
                        // id="imgOption1"
                        name="option5"
                        checked={quizInfo.ques5[2] === "option1"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="input1"
                        value={quizInfo.ques5[1][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton2"
                        type="radio"
                        // id="imgOption2"
                        name="option5"
                        checked={quizInfo.ques5[2] === "option2"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="input2"
                        value={quizInfo.ques5[1][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {quizInfo.optionType === "text-image" && (
              <>
                {currentQuestion === 0 && (
                  <div className={styles.option}>
                    <div>
                      <input
                        className="radioButton1"
                        type="radio"
                        // id="imgOption1"
                        name="option1"
                        checked={quizInfo.ques1[2] === "option1"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="text1"
                        value={quizInfo.ques1[1][0][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                      <input
                        className={styles.optionInput}
                        type="text"
                        name="image1"
                        value={quizInfo.ques1[1][0][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton2"
                        type="radio"
                        // id="imgOption1"
                        name="option1"
                        checked={quizInfo.ques1[2] === "option2"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="text2"
                        value={quizInfo.ques1[1][1][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                      <input
                        className={styles.optionInput}
                        type="text"
                        name="image2"
                        value={quizInfo.ques1[1][1][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton3"
                        type="radio"
                        // id="imgOption1"
                        name="option1"
                        checked={quizInfo.ques1[2] === "option3"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="text3"
                        value={quizInfo.ques1[1][2][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                      <input
                        className={styles.optionInput}
                        type="text"
                        name="image3"
                        value={quizInfo.ques1[1][2][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton4"
                        type="radio"
                        // id="imgOption1"
                        name="option1"
                        checked={quizInfo.ques1[2] === "option4"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="text4"
                        value={quizInfo.ques1[1][3][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                      <input
                        className={styles.optionInput}
                        type="text"
                        name="image4"
                        value={quizInfo.ques1[1][3][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>
                  </div>
                )}

                {currentQuestion === 1 && (
                  <div className={styles.option}>
                    <div>
                      <input
                        className="radioButton1"
                        type="radio"
                        // id="imgOption1"
                        name="option2"
                        checked={quizInfo.ques2[2] === "option1"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="text1"
                        value={quizInfo.ques2[1][0][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                      <input
                        className={styles.optionInput}
                        type="text"
                        name="image1"
                        value={quizInfo.ques2[1][0][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton2"
                        type="radio"
                        // id="imgOption1"
                        name="option2"
                        checked={quizInfo.ques2[2] === "option2"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="text2"
                        value={quizInfo.ques2[1][1][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                      <input
                        className={styles.optionInput}
                        type="text"
                        name="image2"
                        value={quizInfo.ques2[1][1][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton3"
                        type="radio"
                        // id="imgOption1"
                        name="option2"
                        checked={quizInfo.ques2[2] === "option3"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="text3"
                        value={quizInfo.ques2[1][2][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                      <input
                        className={styles.optionInput}
                        type="text"
                        name="image3"
                        value={quizInfo.ques2[1][2][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton4"
                        type="radio"
                        // id="imgOption1"
                        name="option2"
                        checked={quizInfo.ques2[2] === "option4"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="text4"
                        value={quizInfo.ques2[1][3][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                      <input
                        className={styles.optionInput}
                        type="text"
                        name="image4"
                        value={quizInfo.ques2[1][3][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>
                  </div>
                )}

                {currentQuestion === 2 && (
                  <div className={styles.option}>
                    <div>
                      <input
                        className="radioButton1"
                        type="radio"
                        // id="imgOption1"
                        name="option3"
                        checked={quizInfo.ques3[2] === "option1"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="text1"
                        value={quizInfo.ques3[1][0][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                      <input
                        className={styles.optionInput}
                        type="text"
                        name="image1"
                        value={quizInfo.ques3[1][0][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton2"
                        type="radio"
                        // id="imgOption1"
                        name="option3"
                        checked={quizInfo.ques3[2] === "option2"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="text2"
                        value={quizInfo.ques3[1][1][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                      <input
                        className={styles.optionInput}
                        type="text"
                        name="image2"
                        value={quizInfo.ques3[1][1][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton3"
                        type="radio"
                        // id="imgOption1"
                        name="option3"
                        checked={quizInfo.ques3[2] === "option3"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="text3"
                        value={quizInfo.ques3[1][2][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                      <input
                        className={styles.optionInput}
                        type="text"
                        name="image3"
                        value={quizInfo.ques3[1][2][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton4"
                        type="radio"
                        // id="imgOption1"
                        name="option3"
                        checked={quizInfo.ques3[2] === "option4"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="text4"
                        value={quizInfo.ques3[1][3][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                      <input
                        className={styles.optionInput}
                        type="text"
                        name="image4"
                        value={quizInfo.ques3[1][3][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>
                  </div>
                )}

                {currentQuestion === 3 && (
                  <div className={styles.option}>
                    <div>
                      <input
                        className="radioButton1"
                        type="radio"
                        // id="imgOption1"
                        name="option4"
                        checked={quizInfo.ques4[2] === "option1"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="text1"
                        value={quizInfo.ques4[1][0][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                      <input
                        className={styles.optionInput}
                        type="text"
                        name="image1"
                        value={quizInfo.ques4[1][0][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton2"
                        type="radio"
                        // id="imgOption1"
                        name="option4"
                        checked={quizInfo.ques4[2] === "option2"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="text2"
                        value={quizInfo.ques4[1][1][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                      <input
                        className={styles.optionInput}
                        type="text"
                        name="image2"
                        value={quizInfo.ques4[1][1][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton3"
                        type="radio"
                        // id="imgOption1"
                        name="option4"
                        checked={quizInfo.ques4[2] === "option3"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="text3"
                        value={quizInfo.ques4[1][2][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                      <input
                        className={styles.optionInput}
                        type="text"
                        name="image3"
                        value={quizInfo.ques4[1][2][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton4"
                        type="radio"
                        // id="imgOption1"
                        name="option4"
                        checked={quizInfo.ques4[2] === "option4"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="text4"
                        value={quizInfo.ques4[1][3][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                      <input
                        className={styles.optionInput}
                        type="text"
                        name="image4"
                        value={quizInfo.ques4[1][3][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>
                  </div>
                )}

                {currentQuestion === 4 && (
                  <div className={styles.option}>
                    <div>
                      <input
                        className="radioButton1"
                        type="radio"
                        // id="imgOption1"
                        name="option5"
                        checked={quizInfo.ques5[2] === "option1"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="text1"
                        value={quizInfo.ques5[1][0][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                      <input
                        className={styles.optionInput}
                        type="text"
                        name="image1"
                        value={quizInfo.ques5[1][0][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton2"
                        type="radio"
                        // id="imgOption1"
                        name="option5"
                        checked={quizInfo.ques5[2] === "option2"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="text2"
                        value={quizInfo.ques5[1][1][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                      <input
                        className={styles.optionInput}
                        type="text"
                        name="image2"
                        value={quizInfo.ques5[1][1][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton3"
                        type="radio"
                        // id="imgOption1"
                        name="option5"
                        checked={quizInfo.ques5[2] === "option3"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="text3"
                        value={quizInfo.ques5[1][2][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                      <input
                        className={styles.optionInput}
                        type="text"
                        name="image3"
                        value={quizInfo.ques5[1][2][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>

                    <div>
                      <input
                        className="radioButton4"
                        type="radio"
                        // id="imgOption1"
                        name="option5"
                        checked={quizInfo.ques5[2] === "option4"}
                        onChange={(e) => handleChange(e)}
                      />

                      <input
                        className={styles.optionInput}
                        type="text"
                        name="text4"
                        value={quizInfo.ques5[1][3][0]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Text"
                      />
                      <input
                        className={styles.optionInput}
                        type="text"
                        name="image4"
                        value={quizInfo.ques5[1][3][1]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            <div className={styles.timer}></div>
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
              Create Quiz
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Quiz;

// if (
//   quizInfo.optionType === "text-image" &&
//   (quizInfo.ques1[0].length === 0 ||
//     (typeof quizInfo.ques1[1][0] !== "string" &&
//       quizInfo.ques1[1][0]?.length < 2) ||
//     (typeof quizInfo.ques1[1][1] !== "string" &&
//       quizInfo.ques1[1][1]?.length < 2) ||
//     typeof quizInfo.ques1[1][0] === "string" ||
//     typeof quizInfo.ques1[1][1] === "string")
// ) {
//   toast(`Please fill the details of Question 1`, {
//     position: "top-left",
//     autoClose: 4000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: false,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//   });
//   return;
// }
// if (
//   quizInfo.optionType !== "text-image" &&
//   (quizInfo.ques1[0].length === 0 ||
//     typeof quizInfo.ques1[1][0] !== "string" ||
//     typeof quizInfo.ques1[1][1] !== "string")
// ) {
//   toast(`Please fill the details of Question 1`, {
//     position: "top-left",
//     autoClose: 4000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: false,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//   });
//   return;
// }
// if (isEmptyField()) {
//   document
//     .getElementsByClassName(styles.inputError)[0]
//     .setAttribute("style", `display: flex;`);
//   return;
// }
// if (storyDetails?.category) {
//   await updateStoryPostById(storyDetails?._id, storyData);
//   dispatch(unSetSlide());
//   dispatch(unSetEditPost());
//   return;
// }
