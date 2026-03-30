import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './AdminHeader.module.css';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/');
  };

  return (
    <header className={styles.adminHeader}>
      <div className={styles.logoContainer}>
        <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <span className={styles.logoText}>Rentify</span>
      </div>

      <nav className={styles.adminNav}>
        <NavLink to="/admin/dashboard" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          Dashboard
        </NavLink>
        <NavLink to="/admin/vehicles" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H8.5a1 1 0 00-.8.4L5 11l-5.16.86a1 1 0 00-.84.99V16h3m10 0a2 2 0 11-4 0m4 0a2 2 0 10-4 0m-8 0a2 2 0 11-4 0m4 0a2 2 0 10-4 0"/></svg>
          Vehicles
        </NavLink>
        <NavLink to="/admin/messages" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          Messages
        </NavLink>
        <NavLink to="/admin/customers" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          Customers
        </NavLink>
        <NavLink to="/admin/coupons" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect><path d="M12 11h.01"></path></svg>
          Coupons
        </NavLink>
        <NavLink to="/admin/notifications" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          Notifications
          <span className={styles.notificationDot}></span>
        </NavLink>
      </nav>

      <div className={styles.profileSection}>
        <NavLink to="/admin/profile" className={styles.profileInfo}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span className={styles.adminName}>Admin</span>
        </NavLink>
        <button className={styles.exitBtn} onClick={handleExit}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          Exit
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
