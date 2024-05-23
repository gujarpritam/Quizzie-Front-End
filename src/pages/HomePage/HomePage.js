import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import Dashboard from "../../components/Dashboard/Dashboard";
import Analytics from "../../components/Analytics/Analytics";
import CreateQuiz from "../../components/CreateQuiz/CreateQuiz";
import { useNavigate } from "react-router-dom";
import Quiz from "../../components/Quiz/Quiz";

function HomePage() {
  const [component, setComponent] = useState(1);
  const [quiz, setQuiz] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (component === 1) {
      document
        .getElementsByClassName(styles.analytics)[0]
        .setAttribute("style", "box-shadow:none;");
      document
        .getElementsByClassName(styles.dashboard)[0]
        .setAttribute("style", "box-shadow:0px 0px 14px 0px #0000001F;");
    }

    if (component === 2) {
      document
        .getElementsByClassName(styles.analytics)[0]
        .setAttribute("style", "box-shadow:0px 0px 14px 0px #0000001F;");
      document
        .getElementsByClassName(styles.dashboard)[0]
        .setAttribute("style", "box-shadow:none;");
    }
  }, [component]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h1 className={styles.heading}>QUIZZIE</h1>

        <div className={styles.buttonContainer}>
          <button className={styles.dashboard} onClick={() => setComponent(1)}>
            Dashboard
          </button>
          <button className={styles.analytics} onClick={() => setComponent(2)}>
            Analytics
          </button>
          <button className={styles.quiz} onClick={() => setQuiz(1)}>
            Create Quiz
          </button>
        </div>

        <div className={styles.logout}>
          <hr className={styles.line}></hr>
          <button className={styles.logoutButton} onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </div>

      {component === 1 && <Dashboard />}
      {component === 2 && <Analytics />}
      {quiz === 1 && <CreateQuiz quiz={quiz} setQuiz={setQuiz} />}
      {quiz === 2 && <Quiz quiz={quiz} setQuiz={setQuiz} />}
    </div>
  );
}

export default HomePage;
