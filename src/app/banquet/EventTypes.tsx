'use client';

import { useState } from 'react';
import Image from 'next/image';

const eventsData = [
  {
    id: 'weddings',
    title: 'Weddings',
    description: 'Exchange vows in a setting that reflects the magnitude of your love. Our grand banquet halls and serene lawns offer breathtaking backdrops, while our expert team ensures your special day is executed with flawless perfection.',
    features: ['Grand Entrances', 'Custom Mandaps', 'Bridal Preparation Suites', 'Dedicated Coordination'],
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop'
  },
  {
    id: 'receptions',
    title: 'Receptions',
    description: 'Celebrate your union in an atmosphere of pure elegance and joy. Let the music flow as you dine under crystal chandeliers, with gourmet multi-cuisine options designed to delight every guest.',
    features: ['Spacious Dance Floors', 'Exquisite Banquet Buffets', 'Ambient Lighting', 'Premium Bar Setups'],
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop'
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    description: 'Host impactful seminars, product launches, and annual galas. Our venues provide the sophisticated environment and cutting-edge technology necessary for successful professional gatherings.',
    features: ['Audio-Visual Equipment', 'Custom Seating Arrangements', 'High-speed Internet', 'Networking Lounges'],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop'
  },
  {
    id: 'social',
    title: 'Social Gatherings',
    description: 'From milestone birthdays and anniversaries to family reunions, our spaces offer the perfect blend of warmth and grandeur to make your private celebrations truly memorable.',
    features: ['Intimate Spaces Available', 'Thematic Decor Options', 'Custom Menus', 'Entertainment Provisions'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'
  }
];

export default function EventTypes() {
  const [activeId, setActiveId] = useState(eventsData[0].id);
  const activeData = eventsData.find(item => item.id === activeId) || eventsData[0];

  return (
    <div className="mt-4">
      {/* Interactive Buttons */}
      <div className="row g-4 mb-5 justify-content-center">
        {eventsData.map((event) => (
          <div key={event.id} className="col-lg-3 col-sm-6" style={{ cursor: 'pointer' }} onClick={() => setActiveId(event.id)}>
            <div className={`premium-card text-center p-4 border transition-all ${
              activeId === event.id 
                ? 'bg-gold text-navy border-gold shadow-lg scale-105' 
                : 'border-secondary hover-bg-gold hover-text-navy'
            }`}
            style={{
              backgroundColor: activeId === event.id ? 'var(--rv-gold)' : 'rgba(255,255,255,0.05)',
              transition: 'all 0.3s ease',
              transform: activeId === event.id ? 'scale(1.05)' : 'scale(1)'
            }}>
              <h5 className={`fw-bold mb-0 ${activeId === event.id ? 'text-navy' : 'text-white'}`}>
                {event.title}
              </h5>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Feature Info */}
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden text-start" style={{ minHeight: '400px' }}>
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
          <div className="col-md-6 d-flex align-items-center bg-white text-dark">
            <div className="card-body p-5">
              <h3 className="fw-bold text-navy mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                {activeData.title}
              </h3>
              <p className="text-muted mb-4 lead" style={{ fontSize: '1.1rem' }}>
                {activeData.description}
              </p>
              
              <h6 className="fw-bold text-uppercase mb-3 text-gold">Key Offerings</h6>
              <div className="row g-2">
                {activeData.features.map((highlight, idx) => (
                  <div key={idx} className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <span className="text-muted fw-medium">{highlight}</span>
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
