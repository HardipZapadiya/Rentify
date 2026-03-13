import React, { useState } from "react";
import { Link } from "react-router-dom";   // import Link
import styles from "./Login.module.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      alert("Login successful (demo)!");
      // Add backend integration here
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome Back</h2>
      <p className={styles.subtitle}>Please login to your account</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          USERNAME
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.username && <span className={styles.error}>{errors.username}</span>}
        </label>

        <label className={styles.label}>
          PASSWORD
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.password && <span className={styles.error}>{errors.password}</span>}
          <a href="#" className={styles.forgot}>Forgot Password?</a>
        </label>

        <button type="submit" className={styles.button}>LOG IN</button>
      </form>

      <p className={styles.register}>
        Don’t have an account?{" "}
        <Link to="/register" className={styles.link}>Register Now</Link>
      </p>
    </div>
  );
};

export default Login;