'use client';

import { useState } from 'react';
import { confirmBooking, confirmLead, deleteBooking, rejectBooking } from '../actions';

export function ConfirmBookingButton({ bookingId, status }: { bookingId: string, status: string }) {
  const [loading, setLoading] = useState(false);

  if (status === 'confirmed' || status === 'completed' || status === 'cancelled' || status === 'rejected') {
    return null;
  }

  const handleConfirm = async (e: React.MouseEvent) => {
    const btn = e.currentTarget as HTMLButtonElement;
    const row = btn.closest('tr');
    
    // Optimistic UI update
    if (row) {
      const badge = row.querySelector('.badge');
      if (badge) {
        badge.className = 'badge bg-success';
        badge.textContent = 'CONFIRMED';
      }
      btn.style.display = 'none';
      const rejectBtn = row.querySelector('.btn-outline-warning') as HTMLElement;
      if (rejectBtn) rejectBtn.style.display = 'none';
    }

    setLoading(true);
    try {
      await confirmBooking(bookingId);
    } catch (error) {
      console.error(error);
      alert('Failed to confirm booking.');
      // Simple reload to revert state
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      className="btn btn-sm btn-success ms-3" 
      onClick={handleConfirm}
      disabled={loading}
    >
      {loading ? '...' : 'Confirm'}
    </button>
  );
}

export function RejectBookingButton({ bookingId, status }: { bookingId: string, status: string }) {
  const [loading, setLoading] = useState(false);

  if (status === 'confirmed' || status === 'completed' || status === 'cancelled' || status === 'rejected') {
    return null;
  }

  const handleReject = async (e: React.MouseEvent) => {
    if (confirm('Are you sure you want to reject this booking request? An email will be sent to the customer.')) {
      const btn = e.currentTarget as HTMLButtonElement;
      const row = btn.closest('tr');
      
      // Optimistic UI update
      if (row) {
        const badge = row.querySelector('.badge');
        if (badge) {
          badge.className = 'badge bg-danger';
          badge.textContent = 'REJECTED';
        }
        btn.style.display = 'none';
        const confirmBtn = row.querySelector('.btn-success') as HTMLElement;
        if (confirmBtn) confirmBtn.style.display = 'none';
      }

      setLoading(true);
      try {
        await rejectBooking(bookingId);
      } catch (error) {
        console.error(error);
        alert('Failed to reject booking.');
        window.location.reload();
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button 
      className="btn btn-sm btn-outline-warning ms-2" 
      onClick={handleReject}
      disabled={loading}
    >
      {loading ? '...' : 'Reject'}
    </button>
  );
}

export function ConfirmLeadButton({ enquiryId, status }: { enquiryId: string, status: string }) {
  const [loading, setLoading] = useState(false);

  if (status === 'contacted' || status === 'converted' || status === 'lost') {
    return null;
  }

  const handleConfirm = async (e: React.MouseEvent) => {
    const btn = e.currentTarget as HTMLButtonElement;
    const li = btn.closest('li');
    
    // Optimistic UI update
    if (li) {
      const badge = li.querySelector('.badge');
      if (badge) {
        badge.className = 'badge bg-secondary';
        badge.textContent = 'CONTACTED';
      }
      btn.style.display = 'none';
    }

    setLoading(true);
    try {
      await confirmLead(enquiryId);
    } catch (error) {
      console.error(error);
      alert('Failed to update lead.');
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      className="btn btn-sm btn-outline-success mt-2" 
      onClick={handleConfirm}
      disabled={loading}
    >
      {loading ? '...' : 'Mark Contacted'}
    </button>
  );
}


export function DeleteBookingButton({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    if (confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      const btn = e.currentTarget as HTMLButtonElement;
      const row = btn.closest('tr');
      
      // Optimistic UI update: hide the row immediately
      if (row) {
        row.style.display = 'none';
      }

      setLoading(true);
      try {
        await deleteBooking(bookingId);
      } catch (error) {
        console.error(error);
        // Revert on error
        if (row) {
          row.style.display = '';
          alert('Failed to delete booking.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button 
      className="btn btn-sm btn-outline-danger ms-2" 
      onClick={handleDelete}
      disabled={loading}
      title="Delete Booking"
    >
      {loading ? <span className="spinner-border spinner-border-sm"></span> : <i className="bi bi-trash"></i>}
    </button>
  );
}

import { logoutAdmin } from '../actions';

export function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutAdmin();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <button 
      className="btn btn-outline-danger" 
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
