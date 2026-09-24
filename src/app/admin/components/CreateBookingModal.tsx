'use client';

import { useState, useRef } from 'react';
import { createManualBooking } from '../actions';

type Hall = {
  hall_id: string;
  hall_name: string;
  type: string;
  capacity_max: number;
};

export default function CreateBookingModal({ halls }: { halls: Hall[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  
  // Optional: A small hack to close the modal programmatically without bootstrap JS module
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await createManualBooking(formData);
      if (res.error) {
        setError(res.error);
      } else {
        // success
        formRef.current?.reset();
        closeButtonRef.current?.click(); // close modal
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade" id="createBookingModal" tabIndex={-1} aria-labelledby="createBookingModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="modal-header bg-navy text-white">
              <h5 className="modal-title fw-bold" id="createBookingModalLabel">Manually Create Booking</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" ref={closeButtonRef}></button>
            </div>
            <div className="modal-body">
              {error && (
                <div className="alert alert-danger py-2 small border-0 shadow-sm text-center">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
                </div>
              )}
              <h6 className="fw-bold mb-3 border-bottom pb-2 text-navy">1. Customer Details</h6>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-uppercase text-muted">Full Name *</label>
                  <input type="text" className="form-control" name="name" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-uppercase text-muted">Phone Number *</label>
                  <input type="tel" className="form-control" name="phone" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-uppercase text-muted">Email Address</label>
                  <input type="email" className="form-control" name="email" />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-uppercase text-muted">City</label>
                  <input type="text" className="form-control" name="city" />
                </div>
              </div>

              <h6 className="fw-bold mb-3 border-bottom pb-2 text-navy">2. Booking Details (Will be auto-confirmed)</h6>
              <div className="row g-3 mb-4">
                <div className="col-md-12">
                  <label className="form-label small fw-bold text-uppercase text-muted">Select Hall / Room *</label>
                  <select className="form-select" name="hall_id" required>
                    <option value="">-- Choose a Venue --</option>
                    {halls.map((hall) => (
                      <option key={hall.hall_id} value={hall.hall_id}>
                        {hall.hall_name} ({hall.type.toUpperCase()}) - Max {hall.capacity_max} Guests
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-uppercase text-muted">Event Type *</label>
                  <select className="form-select" name="eventType" required>
                    <option value="Wedding">Wedding / Reception</option>
                    <option value="Birthday">Birthday Party</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Resort Stay">Resort Stay</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-uppercase text-muted">Event Date *</label>
                  <input type="date" className="form-control" name="eventDate" min={new Date().toISOString().split('T')[0]} required />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-uppercase text-muted">No. of Guests</label>
                  <input type="number" className="form-control" name="guestCount" />
                </div>
                <div className="col-md-12">
                  <label className="form-label small fw-bold text-uppercase text-muted">Special Requests</label>
                  <textarea className="form-control" name="specialRequests" rows={3} placeholder="Admin notes or special requests..."></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" disabled={loading}>Cancel</button>
              <button type="submit" className="btn btn-primary fw-bold" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="bi bi-save me-2"></i>}
                Create Confirmed Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
