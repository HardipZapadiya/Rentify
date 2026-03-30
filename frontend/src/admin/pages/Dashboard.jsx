import React from 'react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const recentBookings = [
    { id: '#REN-1023', customer: 'Utsav', car: 'Toyota Corolla', dates: 'Feb 20 - Feb 22', status: 'PENDING' },
    { id: '#REN-1022', customer: 'Hardip', car: 'Honda Civic', dates: 'Feb 18 - Feb 25', status: 'ACTIVE' },
    { id: '#REN-1021', customer: 'Bhargav', car: 'Nissan X-Trail', dates: 'Feb 15 - Feb 17', status: 'COMPLETED' },
  ];

  const popularCars = [
    { name: 'Toyota Corolla', percentage: 85, color: '#3b82f6' },
    { name: 'Honda Civic', percentage: 70, color: '#10b981' },
    { name: 'Suzuki Swift', percentage: 45, color: '#f59e0b' },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard Overview</h1>
        <p className={styles.subtitle}>Welcome back, here's what's happening today.</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.blueCard}`}>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>TOTAL RENTALS</span>
            <span className={styles.statValue}>124</span>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={styles.statTop}>
              <span className={styles.statLabelDark}>ACTIVE BOOKINGS</span>
              <div className={`${styles.iconWrapper} ${styles.greenIcon}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
            </div>
            <span className={styles.statValueDark}>10</span>
            <span className={styles.statTrendGreen}>5 pending approval</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={styles.statTop}>
              <span className={styles.statLabelDark}>TOTAL REVENUE</span>
              <div className={`${styles.iconWrapper} ${styles.yellowIcon}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect><path d="M12 12h.01"></path></svg>
              </div>
            </div>
            <span className={styles.statValueDark}>Rs. 0.2M</span>
            <span className={styles.statTrendGray}>This month</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={styles.statTop}>
              <span className={styles.statLabelDark}>AVAILABLE CAR</span>
              <div className={`${styles.iconWrapper} ${styles.cyanIcon}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H8.5a1 1 0 00-.8.4L5 11l-5.16.86a1 1 0 00-.84.99V16h3m10 0a2 2 0 11-4 0m4 0a2 2 0 10-4 0m-8 0a2 2 0 11-4 0m4 0a2 2 0 10-4 0"/></svg>
              </div>
            </div>
            <span className={styles.statValueDark}>15/25</span>
            <span className={styles.statTrendGray}>10 cars rented out</span>
          </div>
        </div>
      </div>

      <div className={styles.bottomGrid}>
        
        <div className={styles.tableCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Recent Bookings</h2>
            <button className={styles.viewAllBtn}>View All</button>
          </div>
          
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>CUSTOMER</th>
                <th>CAR</th>
                <th>DATES</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking, idx) => (
                <tr key={idx}>
                  <td className={styles.idCell}>{booking.id}</td>
                  <td>{booking.customer}</td>
                  <td>{booking.car}</td>
                  <td className={styles.dateCell}>{booking.dates}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[booking.status.toLowerCase()]}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    {booking.status === 'PENDING' ? (
                      <div className={styles.actionButtons}>
                        <button className={`${styles.iconBtn} ${styles.approve}`}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg></button>
                        <button className={`${styles.iconBtn} ${styles.reject}`}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                      </div>
                    ) : (
                      <button className={styles.detailsBtn}>Details</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Popular Cars</h2>
          </div>
          <div className={styles.progressContainer}>
            {popularCars.map((car, idx) => (
              <div key={idx} className={styles.progressRow}>
                <div className={styles.progressLabelRow}>
                  <span className={styles.carName}>{car.name}</span>
                  <span className={styles.carPercent} style={{ backgroundColor: `${car.color}20`, color: car.color }}>{car.percentage}%</span>
                </div>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFill} style={{ width: `${car.percentage}%`, backgroundColor: car.color }}></div>
                </div>
              </div>
            ))}
            <div className={styles.placeholderBox}></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
