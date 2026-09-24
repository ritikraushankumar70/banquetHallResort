'use client';

import { useState } from 'react';
import Image from 'next/image';

const servicesData = [
  {
    id: 'wedding-events',
    icon: 'bi-gem',
    title: 'Wedding Events',
    shortDesc: 'Fairy-tale weddings tailored to your dreams.',
    description: 'Transform your special day into an unforgettable fairy-tale. Our luxurious wedding venues offer the perfect backdrop for ceremonies, receptions, and pre-wedding celebrations. From magnificent decor to impeccable service, we handle every detail so you can cherish every moment.',
    features: ['Grand Banquet Halls', 'Custom Floral Decor', 'Bridal Suites', 'Dedicated Event Planners'],
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop'
  },
  {
    id: 'corporate-events',
    icon: 'bi-briefcase',
    title: 'Corporate Events',
    shortDesc: 'Professional settings for conferences and meetings.',
    description: 'Elevate your business gatherings in our state-of-the-art conference rooms. Whether it is a high-profile board meeting, a product launch, or an annual corporate retreat, our professional environments are designed to inspire success and foster networking.',
    features: ['Advanced AV Equipment', 'High-Speed Wi-Fi', 'Custom Seating Plans', 'Business Center Access'],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop'
  },
  {
    id: 'catering',
    icon: 'bi-cup-hot',
    title: 'Catering',
    shortDesc: 'Exquisite culinary experiences for your guests.',
    description: 'Delight your guests with exquisite culinary masterpieces prepared by our renowned chefs. From grand buffet spreads to personalized plated dinners, we offer a diverse range of multi-cuisine menus crafted with the freshest ingredients to suit any palate.',
    features: ['Multi-Cuisine Menus', 'Live Cooking Stations', 'Custom Dietary Options', 'Premium Bar Services'],
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'accommodation',
    icon: 'bi-house-door',
    title: 'Accommodation',
    shortDesc: 'Luxury suites and rooms for a comfortable stay.',
    description: 'Experience ultimate comfort in our beautifully appointed rooms and luxury suites. Perfect for your guests or a weekend getaway, our accommodations blend elegance with modern amenities to ensure a restful and rejuvenating stay.',
    features: ['Plush Bedding', '24/7 Room Service', 'Panoramic Views', 'Access to Resort Amenities'],
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop'
  }
];

export default function PremiumServices() {
  const [activeId, setActiveId] = useState(servicesData[0].id);

  const activeData = servicesData.find((item) => item.id === activeId) || servicesData[0];

  return (
    <div className="mt-4">
      {/* Interactive Service Cards */}
      <div className="row g-4 mb-5">
        {servicesData.map((srv) => (
          <div key={srv.id} className="col-lg-3 col-md-6" style={{ cursor: 'pointer' }} onClick={() => setActiveId(srv.id)}>
            <div className={`premium-card p-4 text-center h-100 transition-all ${activeId === srv.id ? 'bg-navy text-white shadow-lg scale-105' : 'bg-white hover-shadow'}`} style={{ transition: 'all 0.3s ease', transform: activeId === srv.id ? 'scale(1.05)' : 'scale(1)' }}>
              <div className={`mb-3 ${activeId === srv.id ? 'text-gold' : 'text-gold'}`}>
                <i className={`bi ${srv.icon} display-4`}></i>
              </div>
              <h4 className={`mb-3 ${activeId === srv.id ? 'text-white' : ''}`}>{srv.title}</h4>
              <p className={`mb-0 ${activeId === srv.id ? 'text-light' : 'text-muted'}`}>{srv.shortDesc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Service Info */}
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ minHeight: '400px' }}>
        <div className="row g-0">
          <div className="col-md-6 position-relative" style={{ minHeight: '300px' }}>
            <Image 
              src={activeData.image}
              alt={activeData.title}
              fill
              className="object-fit-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="col-md-6 d-flex align-items-center bg-white">
            <div className="card-body p-5 text-start">
              <h3 className="fw-bold text-navy mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                {activeData.title}
              </h3>
              <p className="text-muted mb-4 lead" style={{ fontSize: '1.1rem' }}>
                {activeData.description}
              </p>
              
              <h6 className="fw-bold text-uppercase mb-3 text-gold">What's Included</h6>
              <div className="row g-2">
                {activeData.features.map((feature, idx) => (
                  <div key={idx} className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <span className="text-muted fw-medium">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
