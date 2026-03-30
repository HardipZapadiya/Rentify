import React from 'react';
import styles from './AdminProfile.module.css';

const AdminProfile = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.cardHeader}>
          <div className={styles.headerTitle}>
            <div className={styles.userIconWrapper}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <h2 className={styles.title}>Admin Profile</h2>
          </div>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarPlaceholder}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <button className={styles.cameraBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
              </button>
            </div>
            <h3 className={styles.userName}>Admin User</h3>
            <span className={styles.roleBadge}>Administrator</span>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>USERNAME</label>
              <input type="text" className={styles.input} defaultValue="Utsav" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>EMAIL</label>
              <input type="email" className={styles.input} defaultValue="admin@easyrental.com" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>ROLE</label>
              <input type="text" className={styles.input} defaultValue="Admin" disabled />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>JOINED DATE</label>
              <input type="text" className={styles.input} defaultValue="Jan 01, 2026" disabled />
            </div>
          </div>

          <div className={styles.actionSection}>
            <button className={styles.editBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              Edit Profile
            </button>
            <button className={styles.passwordBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
