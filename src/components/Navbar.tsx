'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = `navbar navbar-expand-lg fixed-top transition-all ${isScrolled ? 'shadow glass-nav' : 'bg-transparent'}`;
  
  // Custom transition for background and text color based on scroll state
  const linkClass = (path: string) => 
    `nav-link ${pathname === path ? 'text-gold fw-bold' : (isScrolled ? 'text-light' : 'text-white')}`;

  return (
    <nav className={navClass} style={{ transition: 'all 0.3s ease' }}>
      <div className="container">
        <Link className="navbar-brand text-gold fs-3 fw-bold" href="/" style={{ fontFamily: 'Playfair Display, serif' }}>
          RoyalVana
        </Link>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" style={{ filter: isScrolled ? 'invert(1)' : 'invert(1)' }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={linkClass('/')} href="/">HOME</Link>
            </li>
            <li className="nav-item">
              <Link className={linkClass('/about')} href="/about">ABOUT</Link>
            </li>
            <li className="nav-item">
              <Link className={linkClass('/banquet')} href="/banquet">BANQUET</Link>
            </li>
            <li className="nav-item">
              <Link className={linkClass('/resort')} href="/resort">RESORT</Link>
            </li>
            <li className="nav-item">
              <Link className={linkClass('/gallery')} href="/gallery">GALLERY</Link>
            </li>
            <li className="nav-item">
              <Link className={linkClass('/contact')} href="/contact">CONTACT</Link>
            </li>
          </ul>
          <div className="d-flex ms-lg-4 mt-3 mt-lg-0">
            <Link href="/book" className="btn btn-premium w-100">BOOK NOW</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
