import React, { useState, useEffect } from 'react';
import API from '../services/api';

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await API.get('/admin/reviews');
        setReviews(data);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchReviews();
  }, []);

  const deleteReview = async (id) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await API.delete(`/admin/reviews/${id}`);
      setReviews(reviews.filter(r => r.review_id !== id));
      setAlert({ type: 'success', msg: 'Review deleted.' });
    } catch (err) {
      setAlert({ type: 'danger', msg: 'Failed to delete review.' });
    }
  };

  const renderStars = (rating) => '★'.repeat(rating) + '☆'.repeat(5 - rating);

  if (loading) return <div className="container py-5 mt-5 text-center"><div className="spinner-border text-primary"></div></div>;

  return (
    <main className="container-fluid my-5 pt-5 px-md-5">
      <div className="row mt-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold text-dark mb-0">Reviews</h2>
              <p className="text-muted small">Customer reviews and ratings</p>
            </div>
          </div>

          {alert && (
            <div className={`alert alert-${alert.type} alert-dismissible`}>
              {alert.msg}
              <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
            </div>
          )}

          <div className="row g-3">
            {reviews.map((r) => (
              <div className="col-md-6 col-lg-4" key={r.review_id}>
                <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center fw-bold text-primary me-3" style={{ width: '42px', height: '42px' }}>
                        {r.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="fw-bold small">{r.user?.name}</div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>{r.car?.brand} {r.car?.name}</div>
                      </div>
                    </div>
                    <button className="btn btn-sm btn-light rounded-circle border shadow-sm" onClick={() => deleteReview(r.review_id)}>
                      <i className="fas fa-trash text-danger"></i>
                    </button>
                  </div>
                  <div className="text-warning mb-2" style={{ fontSize: '1.1rem' }}>{renderStars(r.rating)}</div>
                  <p className="text-muted small mb-2">{r.comment || 'No comment provided.'}</p>
                  <div className="text-muted mt-auto" style={{ fontSize: '0.75rem' }}>
                    {new Date(r.created_at).toLocaleDateString('en-IN')}
                  </div>
                </div>
              </div>
            ))}
            {reviews.length === 0 && (
              <div className="col-12 text-center py-5 text-muted">
                <i className="fas fa-star fa-3x mb-3 opacity-25"></i>
                <p>No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminReviewsPage;
