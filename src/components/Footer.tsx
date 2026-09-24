'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy text-light pt-5 pb-3">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            <h3 className="text-gold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>RoyalVana</h3>
            <p className="text-light opacity-75">
              Experience luxury celebrations, elegant banquet spaces and premium resort hospitality at RoyalVana Banquet & Resort. Celebrate Moments. Stay in Luxury.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light fs-5"><i className="bi bi-instagram"></i></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light fs-5"><i className="bi bi-facebook"></i></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-light fs-5"><i className="bi bi-youtube"></i></a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h5 className="text-white mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link href="/" className="text-light opacity-75 text-decoration-none hover-gold">Home</Link></li>
              <li className="mb-2"><Link href="/about" className="text-light opacity-75 text-decoration-none hover-gold">About</Link></li>
              <li className="mb-2"><Link href="/banquet" className="text-light opacity-75 text-decoration-none hover-gold">Banquet</Link></li>
              <li className="mb-2"><Link href="/resort" className="text-light opacity-75 text-decoration-none hover-gold">Resort</Link></li>
              <li className="mb-2"><Link href="/gallery" className="text-light opacity-75 text-decoration-none hover-gold">Gallery</Link></li>
              <li className="mb-2"><Link href="/contact" className="text-light opacity-75 text-decoration-none hover-gold">Contact</Link></li>
              <li className="mb-2"><Link href="/book" className="text-gold text-decoration-none hover-gold fw-bold">Book Now</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-4">Services</h5>
            <ul className="list-unstyled">
              <li className="mb-2 text-light opacity-75">Wedding Events</li>
              <li className="mb-2 text-light opacity-75">Corporate Events</li>
              <li className="mb-2 text-light opacity-75">Parties</li>
              <li className="mb-2 text-light opacity-75">Catering</li>
              <li className="mb-2 text-light opacity-75">Accommodation</li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-4">Contact</h5>
            <ul className="list-unstyled">
              <li className="mb-3 text-light opacity-75">
                <i className="bi bi-telephone text-gold me-2"></i> +1 (555) 123-4567
              </li>
              <li className="mb-3 text-light opacity-75">
                <i className="bi bi-envelope text-gold me-2"></i> info@royalvana.com
              </li>
              <li className="mb-3 text-light opacity-75">
                <i className="bi bi-geo-alt text-gold me-2"></i> 123 Luxury Avenue, Resort City, RC 90210
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="my-4 border-secondary" />
        
        <div className="row text-center">
          <div className="col-12">
            <p className="text-light opacity-75 mb-0">&copy; 2026 RoyalVana Banquet & Resort. All Rights Reserved.</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .hover-gold:hover {
          color: var(--rv-gold) !important;
        }
      `}</style>
    </footer>
  );
}
