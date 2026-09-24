'use client';

import { useState } from 'react';

type Hall = {
  hall_id: string;
  hall_name: string;
  type: string;
  capacity_max: number;
  price_per_day: number;
};

export default function BookingForm({ halls }: { halls: Hall[] }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  
  const maxDateObj = new Date();
  maxDateObj.setMonth(maxDateObj.getMonth() + 3);
  const maxDate = maxDateObj.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    hall_id: '',
    eventType: 'Wedding',
    eventDate: '',
    guestCount: '',
    specialRequests: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      setSuccess(true);
      setFormData({
        name: '', phone: '', email: '', city: '', hall_id: '',
        eventType: 'Wedding', eventDate: '', guestCount: '', specialRequests: ''
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
        <h3 className="mt-4 fw-bold">Booking Request Sent!</h3>
        <p className="text-muted">Thank you for choosing RoyalVana. Our management team will review your request and confirm your booking shortly.</p>
        <button onClick={() => setSuccess(false)} className="btn btn-outline-primary mt-3">Make Another Booking</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger py-2 small border-0 shadow-sm text-center">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
        </div>
      )}

      <h5 className="fw-bold mb-3 border-bottom pb-2 text-navy">1. Personal Details</h5>
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <label className="form-label small fw-bold text-uppercase text-muted">Full Name *</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label small fw-bold text-uppercase text-muted">Phone Number *</label>
          <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label small fw-bold text-uppercase text-muted">Email Address</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label small fw-bold text-uppercase text-muted">City</label>
          <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
        </div>
      </div>

      <h5 className="fw-bold mb-3 border-bottom pb-2 text-navy">2. Event Details</h5>
      <div className="row g-3 mb-4">
        <div className="col-md-12">
          <label className="form-label small fw-bold text-uppercase text-muted">Select Hall / Room *</label>
          <select className="form-select" name="hall_id" value={formData.hall_id} onChange={handleChange} required>
            <option value="">-- Choose a Venue --</option>
            {halls.map((hall) => (
              <option key={hall.hall_id} value={hall.hall_id}>
                {hall.hall_name} ({hall.type.toUpperCase()}) - Max {hall.capacity_max} Guests - ₹{hall.price_per_day}/day
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label small fw-bold text-uppercase text-muted">Event Type *</label>
          <select className="form-select" name="eventType" value={formData.eventType} onChange={handleChange} required>
            <option value="Wedding">Wedding / Reception</option>
            <option value="Birthday">Birthday Party</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Resort Stay">Resort Stay</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label small fw-bold text-uppercase text-muted">Event Date *</label>
          <input type="date" className="form-control" name="eventDate" value={formData.eventDate} onChange={handleChange} min={minDate} max={maxDate} required />
        </div>
        <div className="col-md-4">
          <label className="form-label small fw-bold text-uppercase text-muted">No. of Guests</label>
          <input type="number" className="form-control" name="guestCount" value={formData.guestCount} onChange={handleChange} min="1" />
        </div>
        <div className="col-md-12">
          <label className="form-label small fw-bold text-uppercase text-muted">Special Requests</label>
          <textarea className="form-control" name="specialRequests" rows={3} value={formData.specialRequests} onChange={handleChange} placeholder="Any catering, decoration, or special arrangements needed?"></textarea>
        </div>
      </div>

      <button type="submit" className="btn btn-premium w-100 py-3 fw-bold shadow-sm" disabled={loading}>
        {loading ? (
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        ) : (
          <i className="bi bi-calendar-check-fill me-2"></i>
        )}
        {loading ? 'Processing...' : 'CONFIRM BOOKING REQUEST'}
      </button>
    </form>
  );
}
