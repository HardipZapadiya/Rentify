import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Contact from './pages/Contact.jsx';
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Profile from './pages/Profile.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Vehicles from './pages/Vehicles.jsx';
import RentVehicle from './pages/RentVehicle.jsx';

// Admin Imports
import AdminLayout from './admin/AdminLayout.jsx';
import Dashboard from './admin/pages/Dashboard.jsx';
import ManageVehicles from './admin/pages/ManageVehicles.jsx';
import CustomerManagement from './admin/pages/CustomerManagement.jsx';
import ManageCoupons from './admin/pages/ManageCoupons.jsx';
import ContactMessages from './admin/pages/ContactMessages.jsx';
import AdminNotifications from './admin/pages/AdminNotifications.jsx';
import AdminProfile from './admin/pages/AdminProfile.jsx';

// Main Layout Wrapper
const MainLayout = ({ isLoggedIn, setIsLoggedIn }) => (
  <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Header isLoggedIn={isLoggedIn} />
    <Outlet />
    <Footer />
  </div>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="vehicles" element={<ManageVehicles />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="coupons" element={<ManageCoupons />} />
          <Route path="messages" element={<ContactMessages />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* Main App Routes */}
        <Route element={<MainLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
          <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicle/:id" element={<RentVehicle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;