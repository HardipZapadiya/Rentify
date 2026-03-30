import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import VehicleCard from '../components/VehicleCard';
import { MOCK_VEHICLES } from '../data/mockVehicles';

const FEATURED_VEHICLES = MOCK_VEHICLES.slice(0, 3);

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Drive Your Dream Car Today</h1>
        <p className={styles.heroSubtitle}>
          Experience the ultimate freedom with our Cars. No paperwork, 
          just drive your journey to the next level.
        </p>
        <Link to="/vehicles" className={styles.bookNowBtn}>Book Now</Link>
      </section>

      {/* Floating Search Feature */}
      <div className={styles.searchContainer}>
        <div className={styles.searchField}>
          <label className={styles.searchLabel}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            Location
          </label>
          <select className={styles.searchSelect} defaultValue="Rajkot, Gujarat">
            <option value="Rajkot, Gujarat">Rajkot, Gujarat</option>
            <option value="Ahmedabad, Gujarat">Ahmedabad, Gujarat</option>
            <option value="Surat, Gujarat">Surat, Gujarat</option>
            <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
          </select>
        </div>

        <div className={styles.searchField}>
          <label className={styles.searchLabel}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Pick-up
          </label>
          <input type="date" className={styles.searchInput} />
        </div>

        <div className={styles.searchField}>
          <label className={styles.searchLabel}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Drop-off
          </label>
          <input type="date" className={styles.searchInput} />
        </div>

        <button className={styles.findBtn}>Find Vehicle</button>
      </div>

      {/* Premium Services */}
      <section className={styles.servicesSection}>
        <h4 className={styles.sectionPreTitle}>Why Choose Us</h4>
        <h2 className={styles.sectionTitle}>Our Premium Services</h2>
        
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
            </div>
            <h3>GPS Navigation</h3>
            <p>All cars equipped with latest high-precision GPS systems.</p>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22v-8c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v8"></path><path d="M11 20v-4.5"></path><path d="M15 20v-4.5"></path><path d="M7 2h10v4H7z"></path></svg>
            </div>
            <h3>Full Tank Info</h3>
            <p>Transparent fuel policies and premium refueling options.</p>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <h3>24/7 Support</h3>
            <p>We are here to help you anytime, anywhere in your journey.</p>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className={styles.featuredSection}>
        <div className={styles.featuredContainer}>
          <div className={styles.featuredHeader}>
            <div>
              <h4 className={styles.sectionPreTitle}>Our Fleet</h4>
              <h2 className={styles.sectionTitle} style={{ marginBottom: 0 }}>Featured Vehicles</h2>
            </div>
            <Link to="/vehicles" className={styles.viewAllLink}>
              View All Cars
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>

          <div className={styles.featuredGrid}>
            {FEATURED_VEHICLES.map(vehicle => (
              <VehicleCard key={vehicle.id} {...vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* Dev Toggle for Login State (Kept from previous steps for testing purposes) */}
      <div style={{ padding: '24px', textAlign: 'center', backgroundColor: '#fff', borderTop: '1px solid #eee' }}>
        <button 
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          style={{ padding: '8px 16px', background: '#e2e8f0', color: '#1e293b', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
        >
          Dev Config: Toggle Auth State ({isLoggedIn ? 'Logged In' : 'Logged Out'})
        </button>
      </div>

    </div>
  );
};

export default Home;