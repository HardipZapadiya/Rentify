import React from 'react';
import styles from './AdminFooter.module.css';

const AdminFooter = () => {
  return (
    <footer className={styles.adminFooter}>
      <h3 className={styles.footerBrand}>RENTIFY ADMIN PANEL</h3>
      <p className={styles.copyright}>© 2026 Rentify. All rights reserved.</p>
    </footer>
  );
};

export default AdminFooter;
