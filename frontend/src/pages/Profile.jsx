import React, { useState } from 'react';
import styles from './Profile.module.css';

// --- Sub-components ---

const ProfileDetails = () => {
  const [formData, setFormData] = useState({
    firstName: 'Bhargav',
    lastName: 'Deshani',
    email: 'deshanibhargav@gmail.com',
    phone: '+91 63539 28778',
    address: 'Main Street, Thoriyali'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // clear error on type
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Profile saved:', formData);
      alert('Profile details saved successfully!');
    }
  };

  return (
    <div>
      <h2 className={styles.sectionTitle}>Profile Details</h2>
      <form onSubmit={handleSave}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`${styles.inputField} ${errors.firstName ? styles.inputError : ''}`}
            />
            {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`${styles.inputField} ${errors.lastName ? styles.inputError : ''}`}
            />
            {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              //onChange={handleChange}
              className={`${styles.inputField} ${errors.email ? styles.inputError : ''}`} readOnly
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`${styles.inputField} ${errors.phone ? styles.inputError : ''}`}
            />
            {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`${styles.inputField} ${errors.address ? styles.inputError : ''}`}
            />
            {errors.address && <span className={styles.errorText}>{errors.address}</span>}
          </div>
        </div>

        <button type="submit" className={styles.saveBtn}>Save Changes</button>
      </form>
    </div>
  );
};

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const bookings = [
    {
      id: '#RENT-12345',
      car: 'Toyota Corolla',
      status: 'PENDING',
      pickup: 'Feb 20, 2026',
      dropoff: 'Feb 22, 2026',
      total: 'Rs. 10,000',
      type: 'upcoming'
    }
  ];

  const filteredBookings = bookings.filter(b => b.type === activeTab);

  return (
    <div>
      <h2 className={styles.sectionTitle}>My Bookings</h2>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'upcoming' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'past' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past
        </button>
      </div>

      <div className={styles.bookingsList}>
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking, index) => (
            <div key={index} className={styles.bookingCard}>
              <div className={styles.bookingHeader}>
                <div>
                  <h3 className={styles.carName}>{booking.car}</h3>
                  <p className={styles.bookingId}>Booking ID: {booking.id}</p>
                </div>
                <span className={styles.statusBadge}>{booking.status}</span>
              </div>

              <div className={styles.bookingDetails}>
                <div className={styles.detailCol}>
                  <span className={styles.detailLabel}>Pick-up</span>
                  <p className={styles.detailValue}>{booking.pickup}</p>
                </div>
                <div className={styles.detailCol}>
                  <span className={styles.detailLabel}>Drop-off</span>
                  <p className={styles.detailValue}>{booking.dropoff}</p>
                </div>
                <div className={`${styles.detailCol} ${styles.rightAlign}`}>
                  <span className={styles.detailLabel}>Total</span>
                  <p className={`${styles.detailValue} ${styles.priceValue}`}>{booking.total}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

const Notifications = () => {
  const notifs = [
    {
      type: 'success',
      title: 'Booking Confirmed',
      text: 'Your booking #RENT-09876 has been confirmed.',
      time: '2 days ago',
      icon: '✓'
    },
    {
      type: 'promo',
      title: 'New Promo!',
      text: <>Use code <span className={styles.promoCode}>SAVE10</span> for 10% off your next rental.</>,
      time: '1 week ago',
      icon: '🏷️'
    },
    {
      type: 'info',
      title: 'Profile Updated',
      text: 'You have successfully updated your account settings.',
      time: '2 weeks ago',
      icon: 'ⓘ'
    }
  ];

  return (
    <div>
      <div className={styles.notificationsHeader}>
        <h2 className={styles.sectionTitle}>Notifications</h2>
        <button className={styles.markRead}>Mark all as read</button>
      </div>

      <div className={styles.notificationList}>
        {notifs.map((n, idx) => (
          <div key={idx} className={styles.notificationItem}>
            <div className={`${styles.notifIcon} ${styles.iconSuccess && n.type === 'success' ? styles.iconSuccess : ''} ${styles.iconPromo && n.type === 'promo' ? styles.iconPromo : ''} ${styles.iconInfo && n.type === 'info' ? styles.iconInfo : ''}`}>
              {n.icon}
            </div>
            <div className={styles.notifContent}>
              <h4 className={styles.notifTitle}>{n.title}</h4>
              <p className={styles.notifText}>{n.text}</p>
            </div>
            <div className={styles.notifTime}>{n.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};


// --- Main Layout Component ---

const Profile = () => {
  const [activeMenu, setActiveMenu] = useState('profile');

  const renderContent = () => {
    switch (activeMenu) {
      case 'profile': return <ProfileDetails />;
      case 'bookings': return <MyBookings />;
      case 'notifications': return <Notifications />;
      default: return <ProfileDetails />;
    }
  };

  return (
    <div className={styles.profileContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {/* Simple icon or initials */}
            <span>👤</span>
          </div>
          <h3 className={styles.userName}>Bhargav Deshani</h3>
          <p className={styles.userMemberSince}>Member since 2025</p>
        </div>

        <div className={styles.navLinks}>
          <button
            className={`${styles.navItem} ${activeMenu === 'profile' ? styles.active : ''}`}
            onClick={() => setActiveMenu('profile')}
          >
            <span>👤 My Profile</span>
          </button>

          <button
            className={`${styles.navItem} ${activeMenu === 'bookings' ? styles.active : ''}`}
            onClick={() => setActiveMenu('bookings')}
          >
            <span>📅 My Bookings</span>
          </button>

          <button
            className={`${styles.navItem} ${activeMenu === 'notifications' ? styles.active : ''}`}
            onClick={() => setActiveMenu('notifications')}
          >
            <span>🔔 Notifications</span>
            <span className={styles.badge}>2</span>
          </button>

          <button className={`${styles.navItem} ${styles.logoutBtn}`}>
            <span>🚪 Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.contentArea}>
        {renderContent()}
      </main>
    </div>
  );
};

export default Profile;
