import React from 'react';
import styles from './ContactMessages.module.css';

const ContactMessages = () => {
  const messages = [
    {
      id: 1,
      sender: 'Utsav',
      email: 'utsav@gmail.com',
      subject: 'Inquiry about SUV availability',
      date: 'Today, 10:30 AM',
      status: 'NEW',
      initial: 'U'
    },
    {
      id: 2,
      sender: 'Hardip',
      email: 'hardip@gmail.com',
      subject: 'Refund Status',
      date: 'Yesterday',
      status: 'REPLIED',
      initial: 'H'
    },
    {
      id: 3,
      sender: 'Bhargav',
      email: 'bhargav@gmail.com',
      subject: 'Weekend rental special discount?',
      date: '2 days ago',
      status: 'NEW',
      initial: 'B'
    }
  ];

  return (
    <div className={styles.messagesContainer}>
      <div className={styles.tableCard}>
        <div className={styles.cardHeader}>
          <div className={styles.headerLeft}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.mailIcon}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <h2 className={styles.cardTitle}>Contact Messages</h2>
          </div>
          <span className={styles.newBadge}>3 New</span>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Sender</th>
              <th>Subject</th>
              <th>Date</th>
              <th className={styles.actionsHeader}>Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td>
                  <span className={`${styles.statusLabel} ${styles[msg.status.toLowerCase()]}`}>
                    {msg.status}
                  </span>
                </td>
                <td>
                  <div className={styles.senderInfo}>
                    <div className={styles.avatar}>{msg.initial}</div>
                    <div className={styles.senderDetails}>
                      <span className={styles.senderName}>{msg.sender}</span>
                      <span className={styles.senderEmail}>{msg.email}</span>
                    </div>
                  </div>
                </td>
                <td className={styles.subjectCell}>{msg.subject}</td>
                <td className={styles.dateCell}>{msg.date}</td>
                <td>
                  <div className={styles.actionButtons}>
                    {msg.status === 'NEW' ? (
                      <button className={styles.replyBtn}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        Read / Reply
                      </button>
                    ) : (
                      <button className={styles.viewBtn}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        View
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <button className={styles.pageBtn}>Previous</button>
          <div className={styles.pageNumbers}>
            <button className={`${styles.pageBtn} ${styles.activePage}`}>1</button>
            <button className={styles.pageBtn}>2</button>
          </div>
          <button className={styles.pageBtn}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default ContactMessages;
