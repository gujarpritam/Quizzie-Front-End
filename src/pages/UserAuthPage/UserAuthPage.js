import React, { useEffect, useState } from "react";
import Register from "../../components/Register/Register";
import Login from "../../components/Login/Login";
import styles from "./UserAuthPage.module.css";

function UserAuthPage() {
  const [auth, setAuth] = useState(0);

  useEffect(() => {
    if (auth === 0) {
      document
        .getElementsByClassName(styles.login)[0]
        .setAttribute("style", "box-shadow: none;");
      document
        .getElementsByClassName(styles.signUp)[0]
        .setAttribute("style", "box-shadow: 0px 0px 50px 0px #0019FF3D;");
    } else {
      document
        .getElementsByClassName(styles.signUp)[0]
        .setAttribute("style", "box-shadow: none;");
      document
        .getElementsByClassName(styles.login)[0]
        .setAttribute("style", "box-shadow: 0px 0px 50px 0px #0019FF3D;");
    }
  }, [auth]);

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h1 className={styles.heading}>QUIZZIE</h1>
        <div className={styles.btnContainer}>
          <button className={styles.signUp} onClick={() => setAuth(0)}>
            Sign Up
          </button>
          <button className={styles.login} onClick={() => setAuth(1)}>
            Log In
          </button>
        </div>
        {auth === 0 && <Register auth={auth} setAuth={setAuth} />}
        {auth === 1 && <Login />}
      </div>
    </div>
  );
}

export default UserAuthPage;
