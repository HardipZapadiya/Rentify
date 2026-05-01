import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    licenseNo: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOTP = async () => {
    setError('');
    setLoading(true);
    try {
      const { data } = await API.post('/otp/send-otp', { email });
      if (data.success) {
        setOtpSent(true);
        setSuccess('OTP sent to your email.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    }
    setLoading(false);
  };

  const verifyOTP = async () => {
    setError('');
    setLoading(true);
    try {
      const { data } = await API.post('/otp/verify-otp', { email, otp });
      if (data.success) {
        setOtpVerified(true);
        setSuccess('Email verified successfully!');
        setTimeout(() => {
          setStep(2);
          setSuccess('');
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP');
    }
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    setError('');
    try {
      const { data } = await API.post('/auth/register', {
        name: formData.fullName,
        email,
        password: formData.password,
        phone_number: formData.phone,
        address: formData.licenseNo // Using licenseNo as placeholder or adding it to model
      });
      
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <main className="d-flex align-items-center bg-light" style={{ minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card border-0 p-4 p-md-5 shadow-lg rounded-4">
              <div className="text-center mb-4">
                <h3 className="fw-bold text-dark">Create Account</h3>
                <p className="text-muted">Step {step} of 3</p>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              {/* Progress Bar */}
              <div className="progress mb-4" style={{ height: '5px' }}>
                <div 
                  className="progress-bar bg-primary" 
                  role="progressbar" 
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>

              {step === 1 && (
                <div className="animate__animated animate__fadeIn">
                  <h6 className="text-primary fw-bold text-uppercase mb-3">Email Verification</h6>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">EMAIL ADDRESS</label>
                    <div className="input-group">
                      <input 
                        type="email" 
                        className="form-control bg-light border-0 p-3" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email" 
                        disabled={otpSent}
                      />
                      {!otpSent && (
                        <button className="btn btn-primary px-4" onClick={sendOTP} disabled={loading}>
                          {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                      )}
                    </div>
                  </div>

                  {otpSent && !otpVerified && (
                    <div className="mb-3 animate__animated animate__fadeIn">
                      <label className="form-label small fw-bold">ENTER 6-DIGIT OTP</label>
                      <input 
                        type="text" 
                        className="form-control bg-light border-0 p-3 text-center fw-bold letter-spacing-lg" 
                        maxLength="6"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="000000"
                      />
                      <button className="btn btn-primary w-100 mt-3 py-3 rounded-pill fw-bold" onClick={verifyOTP} disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify Email'}
                      </button>
                      <button className="btn btn-link w-100 mt-2 text-muted small text-decoration-none" onClick={sendOTP}>
                        Resend OTP
                      </button>
                    </div>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="animate__animated animate__fadeIn">
                  <h6 className="text-primary fw-bold text-uppercase mb-3">Personal Details</h6>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">FULL NAME</label>
                    <input 
                      type="text" 
                      className="form-control bg-light border-0 p-3" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name" 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">PHONE NUMBER</label>
                    <input 
                      type="text" 
                      className="form-control bg-light border-0 p-3" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number" 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">LICENSE NUMBER</label>
                    <input 
                      type="text" 
                      className="form-control bg-light border-0 p-3" 
                      name="licenseNo"
                      value={formData.licenseNo}
                      onChange={handleInputChange}
                      placeholder="Driving License Number" 
                    />
                  </div>
                  <button className="btn btn-primary w-100 py-3 rounded-pill fw-bold" onClick={() => setStep(3)}>
                    Continue
                  </button>
                  <button className="btn btn-link w-100 mt-2 text-muted" onClick={() => setStep(1)}>Back</button>
                </div>
              )}

              {step === 3 && (
                <form className="animate__animated animate__fadeIn" onSubmit={handleRegister}>
                  <h6 className="text-primary fw-bold text-uppercase mb-3">Account Setup</h6>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">USERNAME</label>
                    <input 
                      type="text" 
                      className="form-control bg-light border-0 p-3" 
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Choose a username" 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">PASSWORD</label>
                    <input 
                      type="password" 
                      className="form-control bg-light border-0 p-3" 
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create password" 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">CONFIRM PASSWORD</label>
                    <input 
                      type="password" 
                      className="form-control bg-light border-0 p-3" 
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm password" 
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                  <button type="button" className="btn btn-link w-100 mt-2 text-muted" onClick={() => setStep(2)}>Back</button>
                </form>
              )}

              <div className="text-center mt-4 pt-3 border-top">
                <span className="text-muted small">Already have an account?</span>
                <Link to="/login" className="fw-bold text-decoration-none ms-1">Login Here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
