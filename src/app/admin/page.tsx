import { supabase } from '@/lib/supabase';
import SectionHeading from '@/components/SectionHeading';
import Link from 'next/link';
import { ConfirmBookingButton, ConfirmLeadButton, DeleteBookingButton, RejectBookingButton, LogoutButton } from './components/ActionButtons';
import CreateBookingModal from './components/CreateBookingModal';

export const revalidate = 0; // Don't cache admin page

type Lead = {
  enquiry_id: string;
  source: string;
  customer_name: string;
  phone: string;
  follow_up_date: string | null;
  status: string;
  notes: string;
  created_at: string;
};

type Booking = {
  booking_id: string;
  event_type: string;
  event_date: string;
  booking_status: string;
  guest_count: number;
  customers: { name: string; phone: string } | { name: string; phone: string }[] | null;
};

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import AutoLogout from './components/AutoLogout';

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('royalvana_admin_session');

  if (!sessionCookie || sessionCookie.value !== 'authenticated') {
    redirect('/admin/login');
  }

  // Fetch all data in parallel to significantly reduce page load time
  const [
    { data: leadsData },
    { data: bookingsData },
    { count: customersCount },
    { count: newBookingsCount },
    { count: newLeadsCount },
    { data: hallsData }
  ] = await Promise.all([
    supabase.from('enquiries_leads').select('*').order('created_at', { ascending: false }),
    supabase.from('bookings').select('booking_id, event_type, event_date, booking_status, guest_count, customers(name, phone)').order('event_date', { ascending: true }),
    supabase.from('customers').select('*', { count: 'exact', head: true }),
    supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('booking_status', 'enquiry'),
    supabase.from('enquiries_leads').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('halls_rooms').select('hall_id, hall_name, type, capacity_max').order('hall_name')
  ]);

  const leads: Lead[] = leadsData || [];
  const bookings: Booking[] = bookingsData || [];
  const halls = hallsData || [];

  return (
    <div className="bg-light min-vh-100" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <AutoLogout />
      <div className="container">
        
        <div className="d-flex justify-content-between align-items-center mb-5">
          <SectionHeading title="Admin Dashboard" subtitle="Manage your business" centered={false} />
          <div>
            <Link href="/" className="btn btn-outline-secondary me-2">Back to Site</Link>
            <LogoutButton />
          </div>
        </div>

        {/* Dashboard Metrics */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm text-center p-4 bg-white h-100">
              <i className="bi bi-people-fill text-primary display-4 mb-3"></i>
              <h3 className="fw-bold">{customersCount || 0}</h3>
              <p className="text-muted mb-0 text-uppercase">Total Customers</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm text-center p-4 bg-white h-100">
              <i className="bi bi-calendar-check-fill text-success display-4 mb-3"></i>
              <h3 className="fw-bold">{newBookingsCount || 0}</h3>
              <p className="text-muted mb-0 text-uppercase">Pending Bookings</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm text-center p-4 bg-white h-100">
              <i className="bi bi-envelope-paper-fill text-warning display-4 mb-3"></i>
              <h3 className="fw-bold">{newLeadsCount || 0}</h3>
              <p className="text-muted mb-0 text-uppercase">New Leads</p>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Leads Section */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-navy text-white d-flex justify-content-between align-items-center py-3">
                <h5 className="mb-0 fw-bold">Recent Leads / Enquiries</h5>
                <span className="badge bg-gold text-dark">{leads.length}</span>
              </div>
              <div className="card-body p-0" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {leads.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    {leads.map(lead => (
                      <li key={lead.enquiry_id} className="list-group-item p-4">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h5 className="fw-bold text-navy mb-1">{lead.customer_name}</h5>
                            <a href={`tel:${lead.phone}`} className="text-decoration-none"><i className="bi bi-telephone-fill text-muted me-2"></i>{lead.phone}</a>
                          </div>
                          <span className={`badge ${lead.status === 'new' ? 'bg-success' : 'bg-secondary'}`}>{lead.status.toUpperCase()}</span>
                        </div>
                        <div className="bg-light p-3 rounded mt-3">
                          <small className="fw-bold text-uppercase text-muted d-block mb-2">Enquiry Details:</small>
                          <p className="mb-0 small" style={{ whiteSpace: 'pre-wrap' }}>{lead.notes}</p>
                        </div>
                        <div className="mt-3 d-flex justify-content-between align-items-center">
                          <small className="text-muted">Received: {new Date(lead.created_at).toLocaleDateString()}</small>
                          <ConfirmLeadButton enquiryId={lead.enquiry_id} status={lead.status} />
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-5 text-center text-muted">
                    <p className="mb-0">No new enquiries yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bookings Section */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-navy text-white d-flex justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center gap-3">
                  <h5 className="mb-0 fw-bold">Upcoming Bookings</h5>
                  <span className="badge bg-gold text-dark">{bookings.length}</span>
                </div>
                <button className="btn btn-sm btn-outline-light" data-bs-toggle="modal" data-bs-target="#createBookingModal">
                  <i className="bi bi-plus-lg me-1"></i> New Booking
                </button>
              </div>
              <div className="card-body p-0" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {bookings.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="px-4">Date</th>
                          <th>Event</th>
                          <th>Customer</th>
                          <th className="px-4 text-end">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map(b => (
                          <tr key={b.booking_id}>
                            <td className="px-4 fw-bold">{new Date(b.event_date).toLocaleDateString()}</td>
                            <td>
                              <span className="d-block fw-bold text-capitalize">{b.event_type}</span>
                              <small className="text-muted"><i className="bi bi-people-fill me-1"></i>{b.guest_count} guests</small>
                            </td>
                            <td>
                              {b.customers ? (
                                <>
                                  <span className="d-block">{Array.isArray(b.customers) ? b.customers[0]?.name : b.customers.name}</span>
                                  <small className="text-muted">{Array.isArray(b.customers) ? b.customers[0]?.phone : b.customers.phone}</small>
                                </>
                              ) : (
                                <span className="text-muted">Unknown</span>
                              )}
                            </td>
                            <td className="px-4 text-end">
                              <div className="d-flex align-items-center justify-content-end gap-2">
                                <span className={`badge ${
                                  b.booking_status === 'confirmed' ? 'bg-success' : 
                                  b.booking_status === 'cancelled' || b.booking_status === 'rejected' ? 'bg-danger' : 'bg-warning text-dark'
                                }`}>
                                  {b.booking_status === 'cancelled' ? 'REJECTED' : b.booking_status.toUpperCase()}
                                </span>
                                <ConfirmBookingButton bookingId={b.booking_id} status={b.booking_status} />
                                <RejectBookingButton bookingId={b.booking_id} status={b.booking_status} />
                                <DeleteBookingButton bookingId={b.booking_id} />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-5 text-center text-muted">
                    <p className="mb-0">No bookings found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Create Booking Modal */}
        <CreateBookingModal halls={halls} />

      </div>
    </div>
  );
}
