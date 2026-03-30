import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logoIcon from '../assets/icons/rentify_icon.png';

const Header = ({ isLoggedIn }) => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoContainer}>
        <img src={logoIcon} alt="Rentify Logo" className={styles.logoIcon} /><span className={styles.logoText}>RENTIFY</span>
      </Link>

      <nav className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>HOME</Link>
        <Link to="/vehicles" className={styles.navLink}>VEHICLES</Link>
        <Link to="/aboutus" className={styles.navLink}>ABOUT</Link>
        <Link to="/contact" className={styles.navLink}>CONTACT</Link>
      </nav>

      <div className={styles.actionContainer}>
        {isLoggedIn ? (
          <>
            <Link to="/profile" className={styles.profileLink}>
              <svg
                className={styles.profileIcon}
                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              PROFILE
            </Link>
            <Link to="/logout" className={styles.loginBtn}>LOGOUT</Link>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.loginBtn}>LOGIN</Link>
            <Link to="/register" className={styles.registerBtn}>REGISTER</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
