import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const carId = searchParams.get('carId');
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    pickupLocation: '',
    dropLocation: '',
    paymentMethod: 'Cash',
    isPermanentLocation: false
  });
  const [sameAsPickup, setSameAsPickup] = useState(false);
  const [priceSummary, setPriceSummary] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discountInfo, setDiscountInfo] = useState({ percent: 0, code: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [couponMessage, setCouponMessage] = useState({ type: '', text: '' });
  const [locatingField, setLocatingField] = useState(null);

  useEffect(() => {
    if (!carId) {
      navigate('/cars');
      return;
    }

    const fetchCar = async () => {
      try {
        const { data } = await API.get(`/cars/${carId}`);
        setCar(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load car details');
        setLoading(false);
      }
    };
    fetchCar();
  }, [carId, navigate]);

  useEffect(() => {
    // When sameAsPickup is checked, copy pickup location to drop location
    if (sameAsPickup && !bookingData.isPermanentLocation) {
      setBookingData(prev => ({ ...prev, dropLocation: prev.pickupLocation }));
    }
  }, [sameAsPickup, bookingData.pickupLocation, bookingData.isPermanentLocation]);

  useEffect(() => {
    // When Permanent Location is checked, set addresses to car.address
    if (bookingData.isPermanentLocation && car) {
      setBookingData(prev => ({ 
        ...prev, 
        pickupLocation: car.address || 'Car Permanent Location', 
        dropLocation: car.address || 'Car Permanent Location' 
      }));
    } else if (!bookingData.isPermanentLocation) {
      // Clear if switching back, or let user type
    }
  }, [bookingData.isPermanentLocation, car]);

  // Removed City Selection Logic as requested
  const fetchPoints = () => {}; 
  const selectedCity = car?.city || '';
  const setSelectedCity = () => {};

  useEffect(() => {
    if (bookingData.startDate && bookingData.endDate && car) {
      const start = new Date(bookingData.startDate);
      const end = new Date(bookingData.endDate);
      if (end >= start) {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        const subtotal = diffDays * car.price_per_day;
        const deliveryFee = bookingData.isPermanentLocation ? 0 : (parseFloat(car.delivery_fee) || 0);
        const discount = (subtotal * discountInfo.percent) / 100;
        const total = subtotal + deliveryFee - discount;
        
        setPriceSummary({
          days: diffDays,
          subtotal: subtotal,
          deliveryFee: deliveryFee,
          discount: discount,
          total: total
        });
      } else {
        setPriceSummary(null);
      }
    }
  }, [bookingData.startDate, bookingData.endDate, bookingData.isPermanentLocation, car, discountInfo]);

  const handleUseCurrentLocation = (field) => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setLocatingField(field);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await res.json();
        if (data && data.display_name) {
          setBookingData(prev => ({ ...prev, [field === 'pickup' ? 'pickupLocation' : 'dropLocation']: data.display_name }));
        }
      } catch (err) {
        console.error('Reverse geocoding failed:', err);
        alert('Failed to get address for your location');
      }
      setLocatingField(null);
    }, (err) => {
      console.error('Geolocation error:', err);
      alert('Failed to get your current location. Please ensure permissions are enabled.');
      setLocatingField(null);
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData({ ...bookingData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setCouponMessage({ type: '', text: '' });
    try {
      const { data } = await API.post('/bookings/validate-coupon', { code: couponCode });
      setDiscountInfo({ percent: data.discount_percent, code: data.code });
      setCouponMessage({ type: 'success', text: `Coupon applied! You saved ${data.discount_percent}%` });
    } catch (err) {
      setCouponMessage({ type: 'danger', text: err.response?.data?.message || 'Invalid coupon' });
      setDiscountInfo({ percent: 0, code: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      navigate('/login', { state: { from: { pathname: `/booking?carId=${carId}` } } });
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const { data } = await API.post('/bookings', {
        car_id: carId,
        start_date: bookingData.startDate,
        end_date: bookingData.endDate,
        total_days: priceSummary.days,
        pickup_location: bookingData.pickupLocation,
        drop_location: bookingData.dropLocation,
        is_permanent_location: bookingData.isPermanentLocation,
        delivery_fee: priceSummary.deliveryFee,
        total_price: priceSummary.subtotal,
        discount_amount: priceSummary.discount,
        final_price: priceSummary.total,
        coupon_code: discountInfo.code,
        payment_method: bookingData.paymentMethod
      });

      if (data.success) {
        alert('Booking Confirmed!');
        navigate('/profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    }
    setSubmitting(false);
  };

  if (loading) return <div className="container py-5 mt-5 text-center"><div className="spinner-border"></div></div>;

  return (
    <main className="container my-5 pt-5">
      <div className="row justify-content-center mt-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="card-body p-4 p-md-5">
              <h3 className="fw-bold mb-4 text-dark">
                <i className="fas fa-calendar-check text-primary me-3"></i>Confirm Your Booking
              </h3>

              {error && <div className="alert alert-danger mb-4 rounded-3"><i className="fas fa-exclamation-circle me-2"></i>{error}</div>}

              {car && (
                <div className="d-flex align-items-center mb-5 p-3 rounded-4 bg-light border border-white shadow-sm">
                  <img 
                    src={car.image_url || '/assets/img/car.png'} 
                    alt={car.name} 
                    className="rounded-3 shadow-sm" 
                    style={{ width: '150px', height: '100px', objectFit: 'cover' }}
                  />
                  <div className="ms-4">
                    <h5 className="fw-bold mb-1">{car.name}</h5>
                    <p className="text-muted small mb-1">{car.brand} &bull; {car.transmission} &bull; {car.fuel_type}</p>
                    <span className="text-primary fw-bold fs-5">Rs. {car.price_per_day} <span className="text-muted small fw-normal">/day</span></span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted text-uppercase tracking-wider">Pickup Date</label>
                    <input 
                      type="date" 
                      className="form-control bg-light border-0 p-3 rounded-3" 
                      name="startDate"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={bookingData.startDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted text-uppercase tracking-wider">Return Date</label>
                    <input 
                      type="date" 
                      className="form-control bg-light border-0 p-3 rounded-3" 
                      name="endDate"
                      required
                      min={bookingData.startDate || new Date().toISOString().split('T')[0]}
                      value={bookingData.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12">
                    <div className="p-3 rounded-4 bg-primary bg-opacity-10 border border-primary-subtle d-flex align-items-center mb-2">
                      <i className="fas fa-map-marker-alt text-primary fs-4 me-3"></i>
                      <div>
                        <label className="form-label small fw-bold text-muted text-uppercase tracking-wider mb-0">Car Registered City</label>
                        <p className="fw-bold mb-0 text-dark">{car.city || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mt-2">
                    <div className="form-check form-switch custom-switch p-3 border rounded-3 bg-light">
                      <input 
                        className="form-check-input ms-0 me-3" 
                        type="checkbox" 
                        name="isPermanentLocation"
                        id="isPermanentLocation"
                        checked={bookingData.isPermanentLocation}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label fw-bold text-dark" htmlFor="isPermanentLocation">
                        <i className="fas fa-home text-primary me-2"></i>Delivery & Pick-up from Car Permanent Location(No Extra Charge)
                      </label>
                      <p className="small text-muted mb-0 ms-5">{car.address || 'Car will be picked up from its primary park location.'}</p>
                    </div>
                  </div>

                  {!bookingData.isPermanentLocation && (
                    <>
                      <div className="col-12">
                        <label className="form-label small fw-bold text-muted text-uppercase tracking-wider">Pickup Address</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-0"><i className="fas fa-map-pin text-primary"></i></span>
                          <input 
                            type="text" 
                            className="form-control bg-light border-0 p-3" 
                            name="pickupLocation"
                            placeholder="Enter detailed pickup address"
                            required
                            value={bookingData.pickupLocation}
                            onChange={handleInputChange}
                          />
                          <button 
                            className="btn btn-light border-start border-white px-3" 
                            type="button"
                            onClick={() => handleUseCurrentLocation('pickup')}
                            disabled={locatingField === 'pickup'}
                            title="Use Current Location"
                          >
                            {locatingField === 'pickup' ? (
                              <span className="spinner-border spinner-border-sm text-primary"></span>
                            ) : (
                              <i className="fas fa-location-crosshairs text-primary"></i>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <label className="form-label small fw-bold text-muted text-uppercase tracking-wider mb-0">Return Address</label>
                          <div className="form-check form-check-inline mb-0">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              id="sameAsPickup" 
                              checked={sameAsPickup}
                              onChange={(e) => setSameAsPickup(e.target.checked)}
                            />
                            <label className="form-check-label small fw-bold text-muted" htmlFor="sameAsPickup">Same as pickup</label>
                          </div>
                        </div>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-0"><i className="fas fa-undo text-primary"></i></span>
                          <input 
                            type="text" 
                            className="form-control bg-light border-0 p-3" 
                            name="dropLocation"
                            placeholder="Enter detailed return address"
                            required={!sameAsPickup}
                            disabled={sameAsPickup}
                            value={sameAsPickup ? bookingData.pickupLocation : bookingData.dropLocation}
                            onChange={handleInputChange}
                          />
                          {!sameAsPickup && (
                            <button 
                              className="btn btn-light border-start border-white px-3" 
                              type="button"
                              onClick={() => handleUseCurrentLocation('drop')}
                              disabled={locatingField === 'drop'}
                              title="Use Current Location"
                            >
                              {locatingField === 'drop' ? (
                                <span className="spinner-border spinner-border-sm text-primary"></span>
                              ) : (
                                <i className="fas fa-location-crosshairs text-primary"></i>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="col-12 mt-4">
                    <label className="form-label small fw-bold text-muted text-uppercase tracking-wider d-block mb-3">Payment Method</label>
                    <div className="d-flex gap-4">
                      <div className="form-check custom-radio">
                        <input className="form-check-input" type="radio" name="paymentMethod" id="payCash" value="Cash" checked onChange={handleInputChange} />
                        <label className="form-check-label fw-bold" htmlFor="payCash">
                          <i className="fas fa-money-bill-wave text-success me-2"></i> Cash on Pickup
                        </label>
                      </div>
                      <div className="form-check custom-radio opacity-50">
                        <input className="form-check-input" type="radio" name="paymentMethod" id="payOnline" value="Online" disabled />
                        <label className="form-check-label fw-bold" htmlFor="payOnline">
                          <i className="fas fa-credit-card text-primary me-2"></i> Online Payment (Coming Soon)
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Coupon Section */}
                  <div className="col-12 mt-4 pt-3 border-top">
                    <label className="form-label small fw-bold text-muted text-uppercase tracking-wider d-block mb-3">Apply Coupon</label>
                    <div className="input-group">
                      <input 
                        type="text" 
                        className="form-control bg-light border-0 p-3 rounded-start-3" 
                        placeholder="ENTER COUPON CODE" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <button 
                        className="btn btn-primary px-4 fw-bold rounded-end-3 shadow-sm"
                        type="button"
                        onClick={handleApplyCoupon}
                        disabled={!couponCode}
                      >
                        APPLY
                      </button>
                    </div>
                    {couponMessage.text && (
                      <div className={`form-text ps-1 mt-2 fw-medium ${couponMessage.type === 'success' ? 'text-success' : 'text-danger'}`}>
                        <i className={`fas fa-${couponMessage.type === 'success' ? 'check-circle' : 'exclamation-circle'} me-1`}></i>
                        {couponMessage.text}
                      </div>
                    )}
                  </div>
                </div>

                {priceSummary && (
                  <div className="mt-5 p-4 rounded-4 bg-primary bg-opacity-10 border border-primary-subtle animate__animated animate__fadeIn">
                    <h6 className="fw-bold mb-4 text-dark text-uppercase tracking-widest">Price Breakdown</h6>
                    <div className="d-flex justify-content-between mb-3 border-bottom border-primary-subtle pb-2">
                      <span className="text-muted">Rental Duration</span>
                      <span className="fw-bold">{priceSummary.days} Days</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Daily Rate</span>
                      <span className="fw-bold">Rs. {car.price_per_day}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Subtotal</span>
                      <span className="fw-bold">Rs. {priceSummary.subtotal}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Delivery & Pick-up Charge</span>
                      <span className={`fw-bold ${priceSummary.deliveryFee > 0 ? 'text-danger' : 'text-success'}`}>
                        {priceSummary.deliveryFee > 0 ? `+ Rs. ${priceSummary.deliveryFee}` : 'Free'}
                      </span>
                    </div>
                    {priceSummary.discount > 0 && (
                      <div className="d-flex justify-content-between mb-3 text-success">
                        <span className="small fw-bold">Coupon Discount ({discountInfo.percent}%)</span>
                        <span className="small fw-bold">- Rs. {priceSummary.discount}</span>
                      </div>
                    )}
                    <div className="d-flex justify-content-between align-items-center pt-3 border-top border-primary-subtle">
                      <span className="h5 fw-bold mb-0">Total Amount</span>
                      <span className="h4 fw-bold text-primary mb-0">Rs. {priceSummary.total}</span>
                    </div>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 mt-5 py-3 fw-bold rounded-pill shadow-lg"
                  disabled={submitting || !priceSummary}
                >
                  {submitting ? (
                    <><span className="spinner-border spinner-border-sm me-2"></span>CONFIRMING...</>
                  ) : (
                    <><i className="fas fa-check-circle me-2"></i>CONFIRM BOOKING</>
                  )}
                </button>
              </form>
              
              <p className="text-center mt-4 text-muted small">
                By clicking "Confirm Booking", you agree to our <Link to="/terms" className="text-primary text-decoration-none">Terms and Conditions</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingPage;
