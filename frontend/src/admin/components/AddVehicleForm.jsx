import React, { useState } from 'react';
import styles from './AddVehicleForm.module.css';

const AddVehicleForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    price: '',
    type: 'Sedan',
    transmission: 'Automatic',
    fuel: 'Petrol',
    image: '',
    overview: '',
    seats: '5',
    mileage: '',
    features: {
      AC: true,
      Bluetooth: false,
      GPS: false,
      '4 Passengers': false,
      'Off-road': false,
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Consolidate categories into the format expected by the app
    const category = `${formData.type.toUpperCase()} • ${formData.transmission.toUpperCase()} • ${formData.fuel.toUpperCase()}`;
    
    const formattedData = {
      ...formData,
      category,
      price: parseInt(formData.price),
      specifications: [
        { id: 'fuel', icon: 'M8 2h8m-4 0v2m-4 8h8M6 8h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z', label: formData.fuel },
        { id: 'transmission', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\nM12 8v4l3 3', label: formData.transmission },
        { id: 'seats', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\nM23 21v-2a4 4 0 0 0-3-3.87\nM16 3.13a4 4 0 0 1 0 7.75', label: `${formData.seats} Seats` },
        { id: 'mileage', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', label: `${formData.mileage}km/L` }
      ],
      features: Object.keys(formData.features).filter(f => formData.features[f]),
      reviewsCount: 0,
      rating: '0.0',
      reviews: []
    };

    onSubmit(formattedData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add New Vehicle</h2>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            {/* Basic Info */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Basic Information</h3>
              <div className={styles.fieldGroup}>
                <label>Vehicle Name</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="e.g. Toyota Corolla (2025)"
                  required 
                />
              </div>
              <div className={styles.fieldGroup}>
                <label>Brand</label>
                <input 
                  type="text" 
                  name="brand" 
                  value={formData.brand} 
                  onChange={handleChange} 
                  placeholder="e.g. Toyota"
                  required 
                />
              </div>
              <div className={styles.fieldGroup}>
                <label>Price per Day (Rs.)</label>
                <input 
                  type="number" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleChange} 
                  placeholder="e.g. 5000"
                  required 
                />
              </div>
            </div>

            {/* Classification */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Classification</h3>
              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <label>Type</label>
                  <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
                <div className={styles.fieldGroup}>
                  <label>Transmission</label>
                  <select name="transmission" value={formData.transmission} onChange={handleChange}>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <label>Fuel Type</label>
                <select name="fuel" value={formData.fuel} onChange={handleChange}>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="EV">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            {/* Media & Details */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Media & Description</h3>
              <div className={styles.fieldGroup}>
                <label>Image URL</label>
                <input 
                  type="text" 
                  name="image" 
                  value={formData.image} 
                  onChange={handleChange} 
                  placeholder="https://images.unsplash.com/..."
                  required 
                />
              </div>
              <div className={styles.fieldGroup}>
                <label>Overview</label>
                <textarea 
                  name="overview" 
                  value={formData.overview} 
                  onChange={handleChange} 
                  placeholder="Provide a brief description of the vehicle..."
                  rows="4"
                  required
                />
              </div>
            </div>

            {/* Specs & Features */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Specifications & Features</h3>
              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <label>Seats</label>
                  <input type="number" name="seats" value={formData.seats} onChange={handleChange} />
                </div>
                <div className={styles.fieldGroup}>
                  <label>Mileage (km/L)</label>
                  <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} required />
                </div>
              </div>
              <div className={styles.featuresGroup}>
                <label>Features</label>
                <div className={styles.checkboxGrid}>
                  {Object.keys(formData.features).map(feature => (
                    <label key={feature} className={styles.checkboxLabel}>
                      <input 
                        type="checkbox" 
                        checked={formData.features[feature]} 
                        onChange={() => handleFeatureChange(feature)} 
                      />
                      <span>{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.submitBtn}>Add Vehicle</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleForm;
