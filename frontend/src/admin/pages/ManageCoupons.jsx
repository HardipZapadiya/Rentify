import React from 'react';
import styles from './ManageCoupons.module.css';

const ManageCoupons = () => {
  const coupons = [
    {
      code: 'SAVE10',
      discount: '10% Discount',
      validUntil: '31 Dec 2026',
      used: '45 times',
      status: 'Active',
      theme: 'blue'
    },
    {
      code: 'WELCOME500',
      discount: 'Flat Rs. 500 Off',
      validUntil: '31 Jan 2026',
      used: '120 times',
      status: 'Inactive',
      theme: 'white'
    },
    {
      code: 'FESTIVE25',
      discount: '25% Weekend Special',
      validUntil: '15 Oct 2026',
      used: '0 times',
      status: 'Inactive',
      theme: 'white'
    }
  ];

  return (
    <div className={styles.couponsContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Coupons</h1>
        <button className={styles.createBtn}>+ Create Coupon</button>
      </div>

      <div className={styles.couponGrid}>
        {coupons.map((coupon, idx) => (
          <div key={idx} className={`${styles.couponCard} ${styles[coupon.theme]}`}>
            <div className={styles.cardHeader}>
              <h2 className={styles.couponCode}>{coupon.code}</h2>
              <span className={`${styles.statusBadge} ${styles[coupon.status.toLowerCase()]}`}>
                {coupon.status}
              </span>
            </div>
            <p className={styles.discountText}>{coupon.discount}</p>
            
            <div className={styles.divider}></div>
            
            <div className={styles.infoRow}>
              <span className={styles.label}>Valid Until:</span>
              <span className={styles.value}>{coupon.validUntil}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Used:</span>
              <span className={styles.value}>{coupon.used}</span>
            </div>

            <button className={styles.actionBtn}>
              {coupon.theme === 'blue' ? 'Edit Coupon' : 'View Details'}
            </button>
            
            {coupon.theme === 'blue' && <div className={styles.abstractCircle}></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCoupons;
