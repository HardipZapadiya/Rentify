import React, { useState } from "react";
import styles from "./Contact.module.css";

const ContactInfo = () => {
  return (
    <div className={styles.info}>
      <h3>Contact Information</h3>
      <p className={styles.desc}>
        Fill up the form and our team will get back to you within 24 hours.
      </p>

      <div className={styles.item}>
        <i className="fas fa-phone-alt"></i>
        <span> +91 11 234 5678</span>
      </div>

      <div className={styles.item}>
        <i className="fas fa-envelope"></i>
        <span> easyrental@gmail.com</span>
      </div>

      <div className={styles.item}>
        <i className="fas fa-map-marker-alt"></i>
        <span> Main street, Rajkot</span>
      </div>

      <h3>Follow Us</h3>
      <div className={styles.socials}>
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-linkedin-in"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
      </div>
    </div>
  );
};

const Contact = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError("Message is required");
    } else {
      setError("");
      alert("Message sent successfully (demo)!");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>GET IN TOUCH</h2>
      <p className={styles.subtitle}>
        We'd Love to Hear From You <br />
        Have questions about our fleet, pricing, or your booking? Our team is ready to assist you.
      </p>

      <div className={styles.row}>
        {/* Contact Information */}
        <ContactInfo />

        {/* Send Message Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>Send Message</h3>

          <label className={styles.label}>
            Full Name
            <input type="text" value="Bhargav Deshani" readOnly className={styles.input} />
          </label>

          <label className={styles.label}>
            Email
            <input type="email" value="bhargavdeshani@gmail.com" readOnly className={styles.input} />
          </label>

          <label className={styles.label}>
            Message
            <textarea
              placeholder="Your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={styles.textarea}
            />
            {error && <span className={styles.error}>{error}</span>}
          </label>

          <button type="submit" className={styles.button}>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;