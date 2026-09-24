'use client';
import { useState, useEffect } from 'react';
import SectionHeading from '@/components/SectionHeading';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', eventType: '', eventDate: '', guestCount: '', message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const subject = searchParams.get('subject');
      if (subject) {
        requestAnimationFrame(() => {
          setFormData(prev => ({ ...prev, message: `I would like to inquire about: ${subject}\n\n` }));
        });
      }
    }
  }, []);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Use a free reverse geocoding API like OpenStreetMap Nominatim
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          const city = data.address.city || data.address.town || data.address.village || data.address.county || 'your area';
          
          setFormData(prev => ({ 
            ...prev, 
            message: prev.message + `\nI am inquiring from: ${city} (Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)})` 
          }));
        } catch (error) {
          alert('Could not detect location name, but coordinates retrieved.');
          setFormData(prev => ({ 
            ...prev, 
            message: prev.message + `\nMy coordinates are: Lat: ${position.coords.latitude.toFixed(4)}, Lon: ${position.coords.longitude.toFixed(4)}` 
          }));
        } finally {
          setLocating(false);
        }
      },
      (error) => {
        alert('Unable to retrieve your location. Please check your permissions.');
        setLocating(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to submit enquiry');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', eventType: '', eventDate: '', guestCount: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="bg-navy text-white text-center" style={{ padding: '120px 0 60px' }}>
        <div className="container">
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Contact Us</h1>
          <p className="lead text-light">We would love to hear from you. Plan your dream event today.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-5">
              <SectionHeading title="Get In Touch" centered={false} />
              <p className="text-muted mb-4">
                Whether you have a question about our facilities, pricing, or want to book a tour, our team is ready to answer all your questions.
              </p>
              
              <div className="d-flex align-items-center mb-4">
                <div className="bg-champagne p-3 rounded-circle text-gold me-3">
                  <i className="bi bi-geo-alt fs-4"></i>
                </div>
                <div>
                  <h5 className="mb-1 fw-bold">Visit Us</h5>
                  <p className="text-muted mb-0">123 Luxury Avenue, Resort City, RC 90210</p>
                </div>
              </div>

              <div className="d-flex align-items-center mb-4">
                <div className="bg-champagne p-3 rounded-circle text-gold me-3">
                  <i className="bi bi-telephone fs-4"></i>
                </div>
                <div>
                  <h5 className="mb-1 fw-bold">Call Us</h5>
                  <p className="text-muted mb-0">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div className="bg-champagne p-3 rounded-circle text-gold me-3">
                  <i className="bi bi-envelope fs-4"></i>
                </div>
                <div>
                  <h5 className="mb-1 fw-bold">Email Us</h5>
                  <p className="text-muted mb-0">info@royalvana.com</p>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="premium-card p-5">
                <h4 className="fw-bold mb-4">Send an Enquiry</h4>
                {status === 'success' && (
                  <div className="alert alert-success">Your enquiry has been successfully submitted! Our team will contact you shortly.</div>
                )}
                {status === 'error' && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name</label>
                      <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email Address</label>
                      <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone Number</label>
                      <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Event Type</label>
                      <select className="form-select" name="eventType" value={formData.eventType} onChange={handleChange} required>
                        <option value="">Select Event Type...</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Corporate">Corporate Event</option>
                        <option value="Birthday">Birthday Party</option>
                        <option value="Resort Stay">Resort Stay</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Event Date</label>
                      <input type="date" className="form-control" name="eventDate" value={formData.eventDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Number of Guests</label>
                      <input type="number" className="form-control" name="guestCount" value={formData.guestCount} onChange={handleChange} />
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-end mb-2">
                        <label className="form-label mb-0">Additional Message</label>
                        <button type="button" className="btn btn-sm btn-outline-premium" onClick={handleDetectLocation} disabled={locating}>
                          <i className="bi bi-geo-alt me-1"></i>
                          {locating ? 'Detecting...' : 'Detect My Location'}
                        </button>
                      </div>
                      <textarea className="form-control" rows={4} name="message" value={formData.message} onChange={handleChange}></textarea>
                    </div>
                    <div className="col-12 mt-4">
                      <button type="submit" className="btn btn-premium w-100" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Submitting...' : 'Submit Enquiry'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
