import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './RentVehicle.module.css';
import { MOCK_VEHICLES } from '../data/mockVehicles';
import { CITY_POINTS } from '../data/cityPoints';

const RentVehicle = () => {
  const { id } = useParams();
  const vehicle = MOCK_VEHICLES.find(v => v.id === parseInt(id));

  const [paymentMethod, setPaymentMethod] = useState('online');
  const [pickPoint, setPickPoint] = useState(CITY_POINTS[0]);
  const [dropPoint, setDropPoint] = useState(CITY_POINTS[0]);

  if (!vehicle) {
    return (
      <div style={{ padding: '80px', textAlign: 'center' }}>
        <h2>Vehicle not found.</h2>
        <Link to="/vehicles">Return to Vehicles List</Link>
      </div>
    );
  }

  // Formatting price to include commas
  const formattedPrice = typeof vehicle.price === 'number' 
    ? `Rs. ${vehicle.price.toLocaleString()}` 
    : vehicle.price;

  return (
    <div className={styles.rentVehicleContainer}>
      
      {/* Left Column (Details) */}
      <div className={styles.leftColumn}>
        
        {/* Hero Image */}
        <div className={styles.heroImageContainer}>
          <img src={vehicle.image} alt={vehicle.title} className={styles.heroImage} />
        </div>

        {/* Title and Rating */}
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>{vehicle.title}</h1>
            <div className={styles.ratingContainer}>
              <span className={styles.stars}>★★★★★</span>
              <span>({vehicle.reviewsCount} Reviews)</span>
            </div>
          </div>
        </div>

        {/* Overview Overview */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Vehicle Overview</h2>
          <p className={styles.overviewText}>
            {vehicle.overview}
          </p>
        </div>

        {/* Specifications */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Specifications</h2>
          <div className={styles.specsGrid}>
            {vehicle.specifications?.map((spec, index) => (
              <div key={index} className={styles.specItem}>
                <svg className={styles.specIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={spec.icon} />
                </svg>
                <span className={styles.specLabel}>{spec.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews */}
        <div className={styles.section}>
          <div className={styles.reviewsHeader}>
            <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Customer Reviews</h2>
            <button className={styles.writeReviewBtn}>Write a Review</button>
          </div>
          
          <div className={styles.reviewsList}>
            {vehicle.reviews?.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.avatar} style={{ backgroundColor: review.avatarBg }}>
                  {review.avatarInitial}
                </div>
                <div className={styles.reviewContent}>
                  <div className={styles.reviewHeaderRow}>
                    <h3 className={styles.reviewerName}>{review.user}</h3>
                    <span className={styles.reviewDate}>• {review.date}</span>
                  </div>
                  <div className={styles.reviewStars}>
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                  <p className={styles.reviewText}>{review.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Column (Sticky Booking Sidebar) */}
      <aside>
        <div className={styles.sidebar}>
          
          <div className={styles.priceHeader}>
            <h2 className={styles.priceAmount}>{formattedPrice}</h2>
            <span className={styles.priceUnit}>/ day</span>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>PICK-UP DATE</label>
            <input type="date" className={styles.inputField} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>PICK-UP POINT</label>
            <select 
              className={styles.inputField} 
              value={pickPoint} 
              onChange={(e) => setPickPoint(e.target.value)}
            >
              {CITY_POINTS.map((point, index) => (
                <option key={index} value={point}>{point}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>DROP-OFF DATE</label>
            <input type="date" className={styles.inputField} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>DROP-OFF POINT</label>
            <select 
              className={styles.inputField} 
              value={dropPoint} 
              onChange={(e) => setDropPoint(e.target.value)}
            >
              {CITY_POINTS.map((point, index) => (
                <option key={index} value={point}>{point}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>COUPON CODE</label>
            <div className={styles.couponGroup}>
              <input type="text" className={styles.inputField} style={{ flex: 1 }} placeholder="Enter code" />
              <button className={styles.applyBtn}>Apply</button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>PAYMENT METHOD</label>
            <div className={styles.paymentToggle}>
              <button 
                className={`${styles.paymentBtn} ${paymentMethod === 'online' ? styles.active : ''}`}
                onClick={() => setPaymentMethod('online')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                Online
              </button>
              <button 
                className={`${styles.paymentBtn} ${paymentMethod === 'cash' ? styles.active : ''}`}
                onClick={() => setPaymentMethod('cash')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect><path d="M12 12h.01"></path></svg>
                Cash
              </button>
            </div>
          </div>

          <div className={styles.summaryBox}>
            <div className={styles.summaryRow}>
              <span>Rental Fee</span>
              <span style={{ fontWeight: 600, color: '#1e293b' }}>{formattedPrice}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.discount}`}>
              <span>Discount</span>
              <span>- Rs. 0</span>
            </div>
            
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalAmount}>{formattedPrice}</span>
            </div>

            <button className={styles.bookBtn}>Book Now</button>
            
            <div className={styles.secureLabel}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Secure Transaction
            </div>
          </div>

        </div>
      </aside>

    </div>
  );
};

export default RentVehicle;
