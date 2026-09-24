export default function AdminLoading() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light" style={{ paddingTop: '100px' }}>
      <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <h3 className="mt-4 text-secondary">Loading Dashboard...</h3>
      <p className="text-muted">Fetching the latest bookings and leads</p>
    </div>
  );
}
