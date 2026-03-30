import React from 'react';
import { Link } from 'react-router-dom';
import styles from './VehicleCard.module.css';

const VehicleCard = ({
  id,
  image,
  title,
  rating,
  category,
  features,
  price
}) => {
  return (
    <div className={styles.card}>
      {/* Image Section */}
      <div className={styles.imageContainer}>
        {/* We can use the category string as the badge for now */}
        <span className={styles.badge}>{category.split(' • ')[0] || 'Car'}</span>
        <img src={image} alt={title} className={styles.carImage} loading="lazy" />
      </div>

      {/* Body Section */}
      <div className={styles.cardBody}>
        <div className={styles.headerRow}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.rating}>
            <span className={styles.starIcon}>★</span>
            {rating}
          </div>
        </div>
        <div className={styles.category}>{category}</div>

        {/* Features Checklist */}
        <div className={styles.featuresList}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>
              {feature}
            </div>
          ))}
        </div>

        {/* Footer/Price */}
        <div className={styles.footerRow}>
          <div className={styles.priceBlock}>
            <p className={styles.price}>{typeof price === 'number' ? `Rs. ${price.toLocaleString()}` : price}</p>
            <span className={styles.perDay}>DAY</span>
          </div>
          <Link to={`/vehicle/${id}`} className={styles.rentBtn} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Rent Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
