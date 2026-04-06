import React, { useState } from "react";
import { Link } from "react-router-dom";   // import Link
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
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
      

      // Simulate successful login and redirect to home page
      navigate("/");
      setIsLoggedIn(!isLoggedIn)
      // Add backend integration here
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome Back</h2>
      <p className={styles.subtitle}>Please login to your account</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          EMAIL
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
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