'use client';

import { useState } from 'react';
import Image from 'next/image';

const amenitiesData = [
  {
    id: "swimming-pool",
    title: "Swimming Pool",
    description: "Dive into our crystal-clear temperature-controlled swimming pool. Perfect for a refreshing morning swim or a relaxing evening dip under the stars. Poolside loungers and dedicated staff ensure a premium experience.",
    features: ["Temperature Controlled", "Poolside Bar", "Towels Provided", "Lifeguard on Duty"],
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "spa-wellness",
    title: "Spa & Wellness",
    description: "Rejuvenate your mind, body, and soul at our signature Spa. We offer a holistic range of therapies, traditional massages, and advanced wellness treatments conducted by certified professionals.",
    features: ["Ayurvedic Massages", "Sauna & Steam", "Aromatherapy", "Couples Therapy"],
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "fine-dining",
    title: "Fine Dining Restaurant",
    description: "Savor exquisite cuisines prepared by our world-class chefs. Our restaurant offers a multi-cuisine menu, ranging from authentic local delicacies to global favorites, set in an elegant ambiance.",
    features: ["Multi-cuisine Menu", "Live Kitchen", "Private Dining Areas", "Extensive Wine Collection"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "room-service",
    title: "24/7 Room Service",
    description: "Enjoy the ultimate convenience with our round-the-clock room service. Whether it's a midnight snack or a full course breakfast in bed, our culinary team is ready to serve you at any hour.",
    features: ["24/7 Availability", "In-Room Dining", "Special Dietary Options", "Quick Service"],
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "gymnasium",
    title: "Gymnasium",
    description: "Keep up with your fitness regime in our fully-equipped modern gymnasium. Featuring state-of-the-art cardiovascular and strength training equipment in a spacious, energizing environment.",
    features: ["Modern Equipment", "Personal Trainers", "Yoga Mats", "Sanitized Daily"],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "lush-gardens",
    title: "Lush Gardens",
    description: "Take a tranquil stroll through our expansive, beautifully manicured gardens. A serene oasis perfect for morning walks, quiet reading, or simply enjoying the beauty of nature.",
    features: ["Walking Trails", "Fountains", "Seating Areas", "Perfect for Photography"],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function ResortAmenities() {
  const [activeId, setActiveId] = useState(amenitiesData[0].id);

  const activeData = amenitiesData.find((item) => item.id === activeId) || amenitiesData[0];

  return (
    <div className="mt-4">
      {/* Interactive Buttons */}
      <div className="row g-3 justify-content-center mb-5">
        {amenitiesData.map((amenity) => (
          <div key={amenity.id} className="col-lg-4 col-md-4 col-sm-6">
            <button
              onClick={() => setActiveId(amenity.id)}
              className={`w-100 p-3 border rounded shadow-sm fw-bold transition-all ${
                activeId === amenity.id 
                  ? 'bg-navy text-white border-navy scale-105' 
                  : 'bg-light text-navy hover-bg-navy hover-text-white'
              }`}
              style={{
                transition: 'all 0.3s ease',
                transform: activeId === amenity.id ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              {amenity.title}
            </button>
          </div>
        ))}
      </div>

      {/* Selected Amenity Info */}
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
          <div className="col-md-6 d-flex align-items-center bg-champagne">
            <div className="card-body p-5 text-start">
              <h3 className="fw-bold text-navy mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                {activeData.title}
              </h3>
              <p className="text-muted mb-4 lead" style={{ fontSize: '1.1rem' }}>
                {activeData.description}
              </p>
              
              <h6 className="fw-bold text-uppercase mb-3 text-gold">Highlights</h6>
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
