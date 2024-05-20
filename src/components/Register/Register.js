import React, { useState } from "react";
import { registerUser } from "../../apis/auth";
import styles from "./Register.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register({ auth, setAuth }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });

    if (document.getElementById(event.target.name).style.border !== "none") {
      document
        .getElementById(event.target.name)
        .setAttribute("style", `border: none;`);
      console.log();
      if (event.target.id === "name") {
        document
          .getElementsByClassName(styles.error)[0]
          .setAttribute("style", `display: none;`);
      } else if (event.target.id === "email") {
        document
          .getElementsByClassName(styles.error)[1]
          .setAttribute("style", `display: none;`);
      } else if (event.target.id === "password") {
        document
          .getElementsByClassName(styles.error)[2]
          .setAttribute("style", `display: none;`);
      } else if (event.target.id === "confirmPassword") {
        document
          .getElementsByClassName(styles.error)[3]
          .setAttribute("style", `display: none;`);
      }
    }
  };

  const handleSubmit = async () => {
    if (!userData.name) {
      document
        .getElementsByClassName(styles.input)[0]
        .setAttribute("style", `border: 1px solid red;`);
      document
        .getElementsByClassName(styles.error)[0]
        .setAttribute("style", `display: flex`);
    }

    if (!userData.email) {
      document
        .getElementsByClassName(styles.input)[1]
        .setAttribute("style", `border: 1px solid red;`);
      document
        .getElementsByClassName(styles.error)[1]
        .setAttribute("style", `display: flex`);
    }
    if (!userData.password) {
      document
        .getElementsByClassName(styles.input)[2]
        .setAttribute("style", `border: 1px solid red;`);
      document
        .getElementsByClassName(styles.error)[2]
        .setAttribute("style", `display: flex`);
    }
    if (!userData.confirmPassword) {
      document
        .getElementsByClassName(styles.input)[3]
        .setAttribute("style", `border: 1px solid red;`);
      document
        .getElementsByClassName(styles.error)[3]
        .setAttribute("style", `display: flex`);
    }

    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.confirmPassword
    ) {
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      document
        .getElementsByClassName(styles.passwordError)[0]
        .setAttribute("style", `display: flex`);
      return;
    }

    const result = await registerUser(userData);

    console.log(result);

    if (result) {
      setAuth(1);
      return;
    }

    toast("User already exists", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className={styles.formContainer}>
      <div>
        <label htmlFor="name">Name</label>
        <span className={styles.span}>
          <input
            className={styles.input}
            name="name"
            id="name"
            value={userData.name}
            onChange={handleFormChange}
            type={"text"}
          ></input>
          <span className={styles.error}>Invalid name</span>
        </span>
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <span className={styles.span}>
          <input
            className={styles.input}
            name="email"
            id="email"
            value={userData.email}
            onChange={handleFormChange}
            type={"email"}
          ></input>
          <span className={styles.error}>Invalid email</span>
        </span>
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <span className={styles.span}>
          <input
            className={styles.input}
            name="password"
            id="password"
            value={userData.password}
            onChange={handleFormChange}
            type={"password"}
          ></input>
          <span className={styles.error}>Invalid password</span>
        </span>
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <span className={styles.span}>
          <input
            className={styles.input}
            name="confirmPassword"
            id="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleFormChange}
            type={"password"}
          ></input>
          <span className={styles.error}>Invalid password</span>
          <span className={styles.passwordError}>Password doesn't match</span>
        </span>
      </div>

      <button onClick={() => handleSubmit()} className={styles.button}>
        Sign Up
      </button>
      <ToastContainer />
    </div>
  );
}

export default Register;
