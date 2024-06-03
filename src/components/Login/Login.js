import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/auth";
import styles from "./Login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
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

    const result = await loginUser(formData);

    if (result) {
      navigate("/home");
      return;
    }

    toast("Invalid Credentials", {
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
        <label htmlFor="email">Email</label>
        <input
          className={styles.input}
          name="email"
          id="email"
          value={formData.email}
          onChange={handleFormChange}
          type={"email"}
        ></input>
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          className={styles.input}
          name="password"
          id="password"
          value={formData.password}
          onChange={handleFormChange}
          type={"password"}
        ></input>
      </div>

      <button onClick={() => handleSubmit()} className={styles.button}>
        Log In
      </button>
      <ToastContainer />
    </div>
  );
}

export default Login;
