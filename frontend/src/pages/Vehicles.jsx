import React, { useState } from 'react';
import styles from './Vehicles.module.css';
import VehicleCard from '../components/VehicleCard';
import { MOCK_VEHICLES } from '../data/mockVehicles';

const Vehicles = () => {
  const [selectedBrands, setSelectedBrands] = useState(['Toyota', 'Honda', 'Nissan', 'BMW']);
  const [activeColor, setActiveColor] = useState('white');
  const [minRating, setMinRating] = useState('Any');

  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <div className={styles.vehiclesContainer}>
      
      {/* Sidebar Filters */}
      <aside className={styles.filtersSidebar}>
        <div className={styles.filterHeader}>
          <h2>Filters</h2>
          <button className={styles.resetBtn}>Reset</button>
        </div>

        {/* Price Range */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>PRICE RANGE (PER DAY)</h3>
          <div className={styles.priceBar}>
            <div className={styles.priceFill}></div>
          </div>
          <div className={styles.priceRangeLabels}>
            <span>Rs. 3000</span>
            <span>Rs. 15000</span>
          </div>
        </div>

        {/* Brand */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>BRAND</h3>
          <div className={styles.checkboxList}>
            {['Toyota', 'Honda', 'Nissan', 'BMW'].map(brand => (
              <label key={brand} className={styles.checkboxItem}>
                <input 
                  type="checkbox" 
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                />
                <span className={styles.checkboxLabel}>{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>COLOR</h3>
          <div className={styles.colorSwatches}>
            {['#ffffff', '#000000', '#94a3b8', '#ef4444', '#1a73e8'].map((color, idx) => {
              const colorNames = ['white', 'black', 'gray', 'red', 'blue'];
              return (
                <div 
                  key={idx}
                  className={`${styles.colorSwatch} ${activeColor === colorNames[idx] ? styles.active : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setActiveColor(colorNames[idx])}
                  title={colorNames[idx]}
                />
              )
            })}
          </div>
        </div>

        {/* Min Rating */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>MIN RATING</h3>
          <select 
            className={styles.selectInput}
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
          >
            <option value="Any">Any</option>
            <option value="4.5">4.5 & Above</option>
            <option value="4.0">4.0 & Above</option>
            <option value="3.0">3.0 & Above</option>
          </select>
        </div>
      </aside>

      {/* Main Grid Area */}
      <main className={styles.mainArea}>
        <header className={styles.mainHeader}>
          <h1 className={styles.pageTitle}>
            Available Vehicles <span className={styles.vehicleCount}>({MOCK_VEHICLES.length})</span>
          </h1>
          <div className={styles.sortGroup}>
            <span className={styles.sortLabel}>Sort By:</span>
            <select className={styles.sortSelect} defaultValue="Recommended">
              <option value="Recommended">Recommended</option>
              <option value="PriceLowToHigh">Price: Low to High</option>
              <option value="PriceHighToLow">Price: High to Low</option>
            </select>
          </div>
        </header>

        <div className={styles.vehicleGrid}>
          {MOCK_VEHICLES.map(vehicle => (
            <VehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </div>
      </main>

    </div>
  );
};

export default Vehicles;
