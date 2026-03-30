import React from 'react';
import styles from './CustomerManagement.module.css';

const CustomerManagement = () => {
  const customers = [
    { id: '#USR-5501', name: 'Utsav', email: 'utsav@gmail.com', phone: '77123 45670', license: '951234567V', date: '12 Jan 2024', status: 'Active' },
    { id: '#USR-5502', name: 'Hardip', email: 'hardip@gmail.com', phone: '71987 65431', license: '987654321V', date: '15 Feb 2024', status: 'Active' },
    { id: '#USR-5503', name: 'Bhargav', email: 'bhargav@gmail.com', phone: '77555 19234', license: '920011452V', date: '22 Feb 2024', status: 'Blocked' },
  ];

  return (
    <div className={styles.customerContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Customer Management</h1>
        <div className={styles.searchBox}>
          <input type="text" placeholder="Search customer..." className={styles.searchInput} />
          <button className={styles.searchBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </div>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>USER ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>LICENSE</th>
              <th>DATE JOINED</th>
              <th>STATUS</th>
              <th className={styles.actionsHeader}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              <tr key={cust.id}>
                <td className={styles.idCell}>{cust.id}</td>
                <td className={styles.nameCell}>{cust.name}</td>
                <td className={styles.emailCell}>{cust.email}</td>
                <td>{cust.phone}</td>
                <td>{cust.license}</td>
                <td>{cust.date}</td>
                <td>
                  <span className={`${styles.badge} ${cust.status === 'Active' ? styles.active : styles.blocked}`}>
                    {cust.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <button className={`${styles.iconBtn} ${styles.viewBtn}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </button>
                    {cust.status === 'Active' ? (
                      <button className={`${styles.iconBtn} ${styles.blockBtn}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
                      </button>
                    ) : (
                      <button className={`${styles.iconBtn} ${styles.unblockBtn}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <div className={styles.pageControls}>
            <button className={styles.pageBtn}>Previous</button>
            <button className={`${styles.pageBtn} ${styles.activePage}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;
