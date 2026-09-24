'use client';

import { useState } from 'react';
import Image from 'next/image';

const featuresData = [
  {
    id: 'premium-hospitality',
    icon: 'bi-star',
    title: 'Premium Hospitality',
    shortDesc: 'Our dedicated staff ensures every guest feels like royalty.',
    description: 'At RoyalVana, hospitality is an art. From the moment you step through our doors, our warm, attentive staff anticipates your every need. Experience a harmonious blend of traditional grace and modern luxury designed to make you feel truly valued.',
    features: ['Personalized Welcome', 'Dedicated Concierge', '24/7 Guest Assistance', 'Tailored Experiences'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'elegant-venues',
    icon: 'bi-building',
    title: 'Elegant Venues',
    shortDesc: 'Architecturally stunning spaces designed for grandeur.',
    description: 'Our venues speak volumes of elegance. From high-ceiling banquets adorned with crystal chandeliers to lush outdoor gardens, our versatile spaces offer the perfect canvas for your most cherished memories. Every corner is meticulously maintained to pristine standards.',
    features: ['Crystal Chandeliers', 'Customizable Layouts', 'Lush Outdoor Spaces', 'Ample Parking'],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'professional-service',
    icon: 'bi-shield-check',
    title: 'Professional Service',
    shortDesc: 'Flawless execution from planning to the final moment.',
    description: 'We pride ourselves on executing flawless events. Our experienced event managers and culinary experts work cohesively to ensure your vision comes to life seamlessly. Leave the logistics to us, and enjoy a stress-free celebration.',
    features: ['Expert Event Planners', 'Seamless Coordination', 'Top-tier Culinary Team', 'Attention to Detail'],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop'
  }
];

export default function WhyChooseUs() {
  const [activeId, setActiveId] = useState(featuresData[0].id);
  const activeData = featuresData.find(item => item.id === activeId) || featuresData[0];

  return (
    <div className="mt-4">
      {/* Interactive Buttons */}
      <div className="row g-4 mb-5 justify-content-center">
        {featuresData.map((feature) => (
          <div key={feature.id} className="col-md-4" style={{ cursor: 'pointer' }} onClick={() => setActiveId(feature.id)}>
            <div className={`p-4 rounded shadow-sm h-100 transition-all ${
              activeId === feature.id 
                ? 'bg-navy text-white scale-105' 
                : 'bg-white text-navy hover-bg-navy hover-text-white'
            }`}
            style={{
              transition: 'all 0.3s ease',
              transform: activeId === feature.id ? 'scale(1.05)' : 'scale(1)'
            }}>
              <i className={`bi ${feature.icon} display-4 mb-3 ${activeId === feature.id ? 'text-gold' : 'text-gold'}`}></i>
              <h5 className={`fw-bold ${activeId === feature.id ? 'text-white' : ''}`}>{feature.title}</h5>
              <p className={`small mb-0 ${activeId === feature.id ? 'text-light' : 'text-muted'}`}>{feature.shortDesc}</p>
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
          <div className="col-md-6 d-flex align-items-center bg-white">
            <div className="card-body p-5">
              <h3 className="fw-bold text-navy mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                {activeData.title}
              </h3>
              <p className="text-muted mb-4 lead" style={{ fontSize: '1.1rem' }}>
                {activeData.description}
              </p>
              
              <h6 className="fw-bold text-uppercase mb-3 text-gold">Highlights</h6>
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
