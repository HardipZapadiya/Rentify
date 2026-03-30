import React from 'react';
import styles from './AdminNotifications.module.css';

const AdminNotifications = () => {
  const reviews = [
    {
      id: 1,
      user: 'Utsav',
      car: 'TOYOTA COROLLA',
      rating: 5,
      comment: 'Excellent car condition and smooth process. Highly recommended!',
      initial: 'U'
    },
    {
      id: 2,
      user: 'Bhargav',
      car: 'HONDA CIVIC',
      rating: 3,
      comment: "Car was okay but the AC wasn't cooling enough.",
      initial: 'B'
    },
    {
      id: 3,
      user: 'Hardip',
      car: 'TESLA MODEL 3',
      rating: 4,
      comment: 'Great electric vehicle experience. Battery was 100% at pickup.',
      initial: 'H'
    }
  ];

  const recentNotifications = [
    { id: 1, title: 'Summer Sale Announcement', time: '2 days ago' },
    { id: 2, title: 'System Maintenance Update', time: '1 week ago' }
  ];

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < rating ? "#f59e0b" : "#e2e8f0"} stroke="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
      </svg>
    ));
  };

  return (
    <div className={styles.splitLayout}>
      
      {/* Left Column: Reviews */}
      <div className={styles.columnCard}>
        <h2 className={styles.columnTitle}>Customer Ratings & Reviews</h2>
        <div className={styles.reviewsList}>
          {reviews.map((rev) => (
            <div key={rev.id} className={styles.reviewItem}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewerInfo}>
                  <div className={styles.avatar}>{rev.initial}</div>
                  <div className={styles.reviewerDetails}>
                    <div className={styles.nameRow}>
                      <span className={styles.reviewerName}>{rev.user}</span>
                      <span className={styles.carBadge}>{rev.car}</span>
                    </div>
                    <div className={styles.stars}>{renderStars(rev.rating)}</div>
                  </div>
                </div>
                <button className={styles.deleteBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>
              <p className={styles.comment}>{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Push Notifications */}
      <div className={styles.columnCard}>
        <h2 className={styles.columnTitle}>Push Notifications</h2>
        <form className={styles.pushForm}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Target Audience</label>
            <select className={styles.select}>
              <option>All Customers</option>
              <option>Only Active Users</option>
              <option>Specific Region</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Notification Title</label>
            <input type="text" className={styles.input} placeholder="e.g. Flash Discount Alert!" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Message</label>
            <textarea className={styles.textarea} placeholder="Type your message here..."></textarea>
          </div>

          <button type="button" className={styles.sendBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            Send Notification
          </button>
        </form>

        <div className={styles.recentSection}>
          <h3 className={styles.recentTitle}>RECENT NOTIFICATIONS</h3>
          <div className={styles.recentList}>
            {recentNotifications.map((notif) => (
              <div key={notif.id} className={styles.recentItem}>
                <div className={styles.checkIcon}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className={styles.notifTitle}>{notif.title}</span>
                <span className={styles.notifTime}>{notif.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminNotifications;
