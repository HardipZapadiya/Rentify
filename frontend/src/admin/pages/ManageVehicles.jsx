import React, { useState } from 'react';
import styles from './ManageVehicles.module.css';
import { MOCK_VEHICLES } from '../../data/mockVehicles';
import AddVehicleForm from '../components/AddVehicleForm';

const ManageVehicles = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Extending mock data with admin-specific fields
  const vehicles = MOCK_VEHICLES.map((v, index) => ({
    ...v,
    status: index === 2 ? 'ON MAINTENANCE' : 'AVAILABLE',
  }));

  // Add one more manually if needed to match the screenshot "Swift"
  const extendedVehicles = [
    ...vehicles,
    {
      id: 4,
      title: 'Swift',
      brand: 'Suzuki',
      price: 3500,
      category: 'Hatchback • MANUAL • PETROL',
      image: 'https://images.unsplash.com/photo-1550570381-87abda34df39?auto=format&fit=crop&q=80&w=800',
      status: 'AVAILABLE'
    }
  ];

  const handleAddVehicle = (newData) => {
    console.log('New Vehicle Data:', newData);
    // In a real app, we would update state or send to API
    setShowAddForm(false);
    alert('Vehicle added successfully (logged to console)');
  };

  return (
    <div className={styles.manageContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Vehicles</h1>
        <button 
          className={styles.addBtn}
          onClick={() => setShowAddForm(true)}
        >
          + Add New Vehicle
        </button>
      </div>

      {showAddForm && (
        <AddVehicleForm 
          onClose={() => setShowAddForm(false)} 
          onSubmit={handleAddVehicle} 
        />
      )}

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>IMAGE</th>
              <th>MODEL</th>
              <th>BRAND</th>
              <th>PRICE/DAY</th>
              <th>TYPE</th>
              <th>STATUS</th>
              <th className={styles.actionsHeader}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {extendedVehicles.map((vehicle) => {
              // Extract Brand and Type from title/category
              const titleParts = vehicle.title.split(' ');
              const model = titleParts.slice(1).join(' ') || titleParts[0];
              const brand = vehicle.brand || titleParts[0];
              const type = vehicle.category.split(' • ')[0] || 'Unknown';
              const formattedPrice = typeof vehicle.price === 'number' ? `Rs. ${vehicle.price.toLocaleString()}` : vehicle.price;

              return (
                <tr key={vehicle.id}>
                  <td>
                    <div className={styles.imageWrapper}>
                      <img src={vehicle.image} alt={vehicle.title} className={styles.thumbnail} />
                    </div>
                  </td>
                  <td className={styles.modelCell}>{model} 2024</td>
                  <td>{brand}</td>
                  <td>{formattedPrice}</td>
                  <td>{type}</td>
                  <td>
                    <span className={`${styles.badge} ${vehicle.status === 'AVAILABLE' ? styles.available : styles.maintenance}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button className={`${styles.iconBtn} ${styles.editBtn}`}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></button>
                      <button className={`${styles.iconBtn} ${styles.deleteBtn}`}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <span className={styles.pageInfo}>Showing 4 of 25 vehicles</span>
          <div className={styles.pageControls}>
            <button className={styles.pageBtn} disabled>Previous</button>
            <button className={styles.pageBtn}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageVehicles;
