import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [reviewModal, setReviewModal] = useState(null); // { bookingId, carName }
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await API.get('/bookings/my');
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await API.put(`/bookings/${bookingId}/cancel`);
      setAlert({ type: 'success', msg: 'Booking cancelled successfully.' });
      fetchBookings();
    } catch (err) {
      setAlert({ type: 'danger', msg: 'Failed to cancel booking.' });
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await API.post('/bookings/review', { bookingId: reviewModal.bookingId, ...reviewData });
      setAlert({ type: 'success', msg: 'Review submitted successfully!' });
      setReviewModal(null);
      fetchBookings();
    } catch (err) {
      setAlert({ type: 'danger', msg: 'Failed to submit review.' });
    }
  };

  const statusBadge = (status) => {
    const map = { Pending: 'warning text-dark', Confirmed: 'primary', Completed: 'success', Cancelled: 'danger' };
    return <span className={`badge bg-${map[status] || 'secondary'} rounded-pill px-3`}>{status}</span>;
  };

  const paymentBadge = (status) => {
    const map = { Paid: 'success', Refunded: 'info', Unpaid: 'secondary' };
    return <span className={`badge bg-${map[status] || 'secondary'} rounded-pill px-3`}>{status}</span>;
  };

  if (loading) return <div className="container py-5 mt-5 text-center"><div className="spinner-border text-primary"></div></div>;

  return (
    <main className="container my-5 pt-5">
      <div className="d-flex align-items-center mb-4">
        <div className="bg-primary bg-opacity-10 rounded-3 p-3 me-3">
          <i className="fas fa-receipt text-primary fa-lg"></i>
        </div>
        <div>
          <h3 className="fw-bold mb-0">My Bookings</h3>
          <p className="text-muted small mb-0">View and manage all your rental history</p>
        </div>
        <Link to="/cars" className="btn btn-primary rounded-pill px-4 ms-auto">
          <i className="fas fa-plus me-2"></i>Book a Car
        </Link>
      </div>

      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible d-flex align-items-center`}>
          <i className={`fas fa-${alert.type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2`}></i>
          {alert.msg}
          <button type="button" className="btn-close ms-auto" onClick={() => setAlert(null)}></button>
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="text-center py-5 card border-0 shadow-sm rounded-4">
          <i className="fas fa-calendar-times fa-3x text-muted mb-3"></i>
          <h5 className="text-muted">No bookings yet</h5>
          <p className="text-muted">Browse our fleet and book your first ride!</p>
          <Link to="/cars" className="btn btn-primary rounded-pill px-5 mx-auto">Browse Cars</Link>
        </div>
      ) : (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="border-0 text-muted small fw-bold text-uppercase ps-4">#</th>
                  <th className="border-0 text-muted small fw-bold text-uppercase">Car</th>
                  <th className="border-0 text-muted small fw-bold text-uppercase">Dates</th>
                  <th className="border-0 text-muted small fw-bold text-uppercase">Locations</th>
                  <th className="border-0 text-muted small fw-bold text-uppercase">Price</th>
                  <th className="border-0 text-muted small fw-bold text-uppercase">Status</th>
                  <th className="border-0 text-muted small fw-bold text-uppercase">Payment</th>
                  <th className="border-0 text-muted small fw-bold text-uppercase text-center pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.booking_id}>
                    <td className="ps-4 text-muted">#{b.booking_id}</td>
                    <td>
                      <div className="fw-bold">{b.Car?.name || 'N/A'}</div>
                      <div className="text-muted small">{b.Car?.brand}</div>
                    </td>
                    <td>
                      <div className="small">{b.start_date} → {b.end_date}</div>
                      <span className="badge bg-light text-dark border">{b.total_days} day(s)</span>
                    </td>
                    <td>
                      <div className="small"><i className="fas fa-map-marker-alt text-success me-1"></i>{b.pickup_location || 'N/A'}</div>
                      <div className="small"><i className="fas fa-map-marker-alt text-danger me-1"></i>{b.drop_location || 'N/A'}</div>
                    </td>
                    <td>
                      {b.discount_amount > 0 && (
                        <div className="text-muted small"><s>Rs. {b.total_price}</s></div>
                      )}
                      <strong>Rs. {b.final_price}</strong>
                    </td>
                    <td>{statusBadge(b.booking_status)}</td>
                    <td>{paymentBadge(b.payment_status)}</td>
                    <td className="pe-4 text-center">
                      <div className="d-flex gap-2 justify-content-center flex-wrap">
                        {(b.booking_status === 'Pending' || b.booking_status === 'Confirmed') && (
                          <button className="btn btn-sm btn-outline-danger rounded-pill" onClick={() => cancelBooking(b.booking_id)}>
                            <i className="fas fa-times me-1"></i>Cancel
                          </button>
                        )}
                        {b.booking_status === 'Completed' && b.payment_status === 'Paid' && (
                          <button className="btn btn-sm btn-outline-warning rounded-pill" onClick={() => { setReviewModal({ bookingId: b.booking_id, carName: b.Car?.name }); setReviewData({ rating: 5, comment: '' }); }}>
                            <i className="fas fa-star me-1"></i>Review
                          </button>
                        )}
                        {b.payment_status === 'Paid' && (
                          <Link to={`/invoice/${b.booking_id}`} target="_blank" className="btn btn-sm btn-outline-info rounded-pill">
                            <i className="fas fa-file-invoice me-1"></i>Invoice
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg">
              <div className="modal-header border-0 p-4">
                <h5 className="modal-title fw-bold">Review — {reviewModal.carName}</h5>
                <button type="button" className="btn-close" onClick={() => setReviewModal(null)}></button>
              </div>
              <form onSubmit={submitReview}>
                <div className="modal-body p-4 pt-0">
                  <label className="form-label fw-bold">Rating</label>
                  <div className="d-flex gap-2 mb-3 fs-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} style={{ cursor: 'pointer', color: star <= reviewData.rating ? '#ffc107' : '#ddd' }} onClick={() => setReviewData({ ...reviewData, rating: star })}>★</span>
                    ))}
                  </div>
                  <label className="form-label fw-bold">Comment</label>
                  <textarea className="form-control bg-light border-0" rows="4" placeholder="Share your experience..." value={reviewData.comment} onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}></textarea>
                </div>
                <div className="modal-footer border-0 p-4 pt-0">
                  <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => setReviewModal(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary rounded-pill px-5 fw-bold">Submit Review</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MyBookingsPage;
