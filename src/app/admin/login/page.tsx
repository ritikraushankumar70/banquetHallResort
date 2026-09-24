'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '../actions';
import Image from 'next/image';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const result = await loginAdmin(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      // Success - redirect to dashboard using hard navigation to bypass cache & middleware issues
      window.location.href = '/admin';
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--rv-navy)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card border-0 shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <div className="card-header bg-white text-center py-4 border-0">
                <h3 className="fw-bold mb-0" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--rv-navy)' }}>
                  RoyalVana
                </h3>
                <p className="text-muted small mb-0 text-uppercase letter-spacing-1">Admin Portal</p>
              </div>
              <div className="card-body p-5 bg-champagne">
                <h5 className="fw-bold mb-4 text-center">Secure Login</h5>
                
                {error && (
                  <div className="alert alert-danger py-2 small border-0 shadow-sm text-center">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label text-muted small fw-bold text-uppercase">Username</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <i className="bi bi-person-fill text-muted"></i>
                      </span>
                      <input 
                        type="text" 
                        className="form-control border-start-0 py-2" 
                        placeholder="Enter username..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-muted small fw-bold text-uppercase">Admin Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <i className="bi bi-lock-fill text-muted"></i>
                      </span>
                      <input 
                        type="password" 
                        className="form-control border-start-0 py-2" 
                        placeholder="Enter password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  
                  <button type="submit" className="btn btn-premium w-100 py-2 fw-bold shadow" disabled={loading || !username || !password}>
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : (
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                    )}
                    {loading ? 'Verifying...' : 'Access Dashboard'}
                  </button>
                </form>
              </div>
              <div className="card-footer bg-white text-center py-3 border-0">
                <small className="text-muted"><i className="bi bi-shield-lock-fill text-success me-1"></i> Secure Connection</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
