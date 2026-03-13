import React from "react";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome Back</h2>
      <p className={styles.subtitle}>Please login to your account</p>

      <form className={styles.form}>
        <label className={styles.label}>
          USERNAME
          <input
            type="text"
            placeholder="Enter username"
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          PASSWORD
          <input
            type="password"
            placeholder="Enter password (any for static)"
            className={styles.input}
          />
          <a href="#" className={styles.forgot}>
            Forgot Password?
          </a>
        </label>

        <button type="submit" className={styles.button}>
          LOG IN
        </button>
      </form>

      <p className={styles.register}>
        Don’t have an account? <a href="#" className={styles.link}>Register Now</a>
      </p>
    </div>
  );
};

export default Login;