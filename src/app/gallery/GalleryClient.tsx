'use client';
import { useState } from 'react';
import Image from 'next/image';

type GalleryImage = {
  image_id: string;
  category: string;
  image_url: string;
};

const categories = ['ALL', 'BANQUET', 'WEDDINGS', 'RESORT', 'ROOMS', 'EVENTS', 'DINING'];

const categoryInfo = {
  BANQUET: {
    title: 'Grand Banquet Halls',
    description: 'Our luxurious banquet halls offer spacious, pillar-less designs with crystal chandeliers, perfect for accommodating hundreds of guests in absolute comfort and style.'
  },
  WEDDINGS: {
    title: 'Fairy-tale Weddings',
    description: 'From majestic mandaps to elegant floral decorations, we turn your dream wedding into a royal reality with breathtaking venues and impeccable service.'
  },
  RESORT: {
    title: 'The Royal Resort Experience',
    description: 'Immerse yourself in nature with our lush green landscapes, serene pools, and resort amenities designed for the ultimate relaxation.'
  },
  ROOMS: {
    title: 'Luxury Accommodation',
    description: 'Experience unparalleled comfort in our premium suites and deluxe rooms, featuring modern amenities and elegant interiors.'
  },
  EVENTS: {
    title: 'Corporate & Private Events',
    description: 'Whether it is a corporate gala, a birthday celebration, or a private gathering, our versatile spaces are equipped to handle events of any scale.'
  },
  DINING: {
    title: 'Fine Dining & Culinary Excellence',
    description: 'Savor world-class cuisines crafted by master chefs in our royal dining halls, offering a gastronomic journey like no other.'
  }
};

export default function GalleryClient({ galleryImages }: { galleryImages: GalleryImage[] }) {
  const [filter, setFilter] = useState('ALL');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = filter === 'ALL' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <>
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
        {categories.map((cat, idx) => (
          <button 
            key={idx} 
            className={`btn ${filter === cat ? 'btn-premium' : 'btn-outline-premium text-navy border-secondary'}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filter !== 'ALL' && (
        <div className="text-center mb-5 fade-in">
          <h3 className="h4 text-navy fw-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            {categoryInfo[filter as keyof typeof categoryInfo]?.title}
          </h3>
          <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
            {categoryInfo[filter as keyof typeof categoryInfo]?.description}
          </p>
        </div>
      )}

      {filter === 'ALL' && (
        <div className="text-center mb-5 fade-in">
          <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
            Explore our majestic spaces, beautifully curated events, and luxurious accommodations that redefine elegance and comfort.
          </p>
        </div>
      )}

      <div className="row g-4">
        {filteredImages.length > 0 ? (
          filteredImages.map((img) => (
            <div key={img.image_id} className="col-lg-4 col-md-6 img-reveal" onClick={() => setSelectedImage(img)}>
              <div className="position-relative premium-card" style={{ height: '300px', cursor: 'pointer' }}>
                <Image src={img.image_url} alt={img.category} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} className="transition-all" unoptimized={true} />
                <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center opacity-0 bg-dark bg-opacity-50" style={{ transition: 'opacity 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}>
                  <i className="bi bi-zoom-in text-white display-4"></i>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted">
            <p>Loading images or no images available yet...</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75 z-3"
          style={{ zIndex: 1050 }}
          onClick={() => setSelectedImage(null)}
        >
          <div className="position-relative" style={{ width: '90%', maxWidth: '900px', height: '80vh' }} onClick={e => e.stopPropagation()}>
            <button 
              className="btn btn-dark position-absolute top-0 end-0 m-3 z-3 shadow" 
              onClick={() => setSelectedImage(null)}
              style={{ borderRadius: '50%' }}
            >
              <i className="bi bi-x-lg"></i>
            </button>
            <Image src={selectedImage.image_url} alt={selectedImage.category} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw" style={{ objectFit: 'contain' }} unoptimized={true} />
            <div className="position-absolute bottom-0 start-0 w-100 text-center p-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
              <h5 className="text-white mb-0">{selectedImage.category}</h5>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
