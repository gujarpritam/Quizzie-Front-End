import React from "react";
import styles from "./HomePage.module.css";
import Dashboard from "../../components/Dashboard/Dashboard";

function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h1 className={styles.heading}>QUIZZIE</h1>

        <div className={styles.buttonContainer}>
          <button className={styles.dashboard}>Dashboard</button>
          <button className={styles.analytics}>Analytics</button>
          <button className={styles.quiz}>Create Quiz</button>
        </div>

        <div className={styles.logout}>
          <hr className={styles.line}></hr>
          <button className={styles.logoutButton}>LOGOUT</button>
        </div>
      </div>

      <Dashboard />
    </div>
  );
}

export default HomePage;
