import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    identity: "",
    idFront: null,
    idBack: null,
    license: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.identity.trim()) newErrors.identity = "Identity number is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      alert("Registration successful (demo)!");
      // Add backend integration here
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Account</h2>
      <p className={styles.subtitle}>Join us today and start your journey</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Personal + Account Setup row */}
        <div className={styles.row}>
          <fieldset className={styles.section}>
            <legend>Personal Details</legend>

            <label className={styles.label}>
              Full Name
              <input
                type="text"
                name="fullName"
                placeholder="First_name Last_name"
                value={formData.fullName}
                onChange={handleChange}
                className={styles.input}
              />
              {errors.fullName && <span className={styles.error}>{errors.fullName}</span>}
            </label>

            <label className={styles.label}>
              Email Address
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </label>

            <label className={styles.label}>
              Phone Number
              <input
                type="tel"
                name="phone"
                placeholder="+91 63539 28778"
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
              />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </label>
          </fieldset>

          <fieldset className={styles.section}>
            <legend>Account Setup</legend>

            <label className={styles.label}>
              Username
              <input
                type="text"
                name="username"
                placeholder="Choose username"
                value={formData.username}
                onChange={handleChange}
                className={styles.input}
              />
              {errors.username && <span className={styles.error}>{errors.username}</span>}
            </label>

            <label className={styles.label}>
              Password
              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
              />
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </label>

            <label className={styles.label}>
              NIC / Passport / License No
              <input
                type="text"
                name="identity"
                placeholder="Identity Number"
                value={formData.identity}
                onChange={handleChange}
                className={styles.input}
              />
              {errors.identity && <span className={styles.error}>{errors.identity}</span>}
            </label>
          </fieldset>
        </div>

        {/* Verification Documents row */}
        <fieldset className={styles.section}>
          <legend>Verification Documents</legend>
          <div className={styles.docRow}>
            <label className={styles.label}>
              ID Front
              <input type="file" name="idFront" onChange={handleChange} className={styles.fileInput} />
            </label>

            <label className={styles.label}>
              ID Back
              <input type="file" name="idBack" onChange={handleChange} className={styles.fileInput} />
            </label>

            <label className={styles.label}>
              Driving License
              <input type="file" name="license" onChange={handleChange} className={styles.fileInput} />
            </label>
          </div>
        </fieldset>

        <button type="submit" className={styles.button}>Register Account</button>

        <p className={styles.loginLink}>
          Already have an account?{" "}
          <Link to="/" className={styles.link}>Login Here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;