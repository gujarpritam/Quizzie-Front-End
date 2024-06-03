import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./ShareQuiz.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import cross from "../../assets/icons/cross.png";

function ShareQuiz({ quiz, setQuiz, isPoll }) {
  const quizIdState = useSelector((state) => state.quizId);
  const [quizLink, setQuizLink] = useState("");
  console.log(quizIdState);

  useEffect(() => {
    createQuizLink();
  }, []);

  const createQuizLink = () => {
    let link =
      "https://quizzie-front-end-seven.vercel.app/quiz/" + quizIdState?.value;
    setQuizLink(link);
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <img onClick={() => setQuiz(0)} src={cross} className={styles.close} />
        <div className={styles.innerContainer}>
          <h1 className={styles.heading}>
            Congrats your {isPoll === true ? "Poll" : "Quiz"} is Published!
          </h1>
          <div>{quizLink}</div>
          <CopyToClipboard
            text={quizLink}
            onCopy={() =>
              toast("Link copied to Clipboard", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              })
            }
          >
            <button className={styles.share}>Share</button>
          </CopyToClipboard>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ShareQuiz;
