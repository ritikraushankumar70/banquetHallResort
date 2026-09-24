import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import PremiumServices from './PremiumServices';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="position-relative vh-100 d-flex align-items-center justify-content-center text-center text-white" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        {/* Dark overlay for base contrast */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)' }}></div>
        
        <div className="container position-relative z-1 img-reveal p-5 rounded-5" style={{ 
          backgroundColor: 'rgba(15, 23, 42, 0.65)', 
          backdropFilter: 'blur(12px)', 
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          maxWidth: '900px'
        }}>
          <div className="d-flex align-items-center justify-content-center mb-4">
             <span style={{ width: '80px', height: '1px', backgroundColor: 'var(--rv-gold)' }} className="me-4 opacity-75"></span>
             <p className="text-gold text-uppercase fw-bold mb-0" style={{ letterSpacing: '5px', fontSize: '0.9rem' }}>Welcome to RoyalVana</p>
             <span style={{ width: '80px', height: '1px', backgroundColor: 'var(--rv-gold)' }} className="ms-4 opacity-75"></span>
          </div>
          
          <h1 className="display-1 fw-bold mb-4 text-white" style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 10px 30px rgba(0,0,0,0.8)', lineHeight: '1.15' }}>
            Where Celebrations<br/>
            <span className="text-gold" style={{ fontStyle: 'italic', fontWeight: 400 }}>Become Memories</span>
          </h1>
          
          <p className="lead mb-5 mx-auto text-light" style={{ maxWidth: '700px', fontSize: '1.2rem', textShadow: '0 2px 8px rgba(0,0,0,0.6)', fontWeight: 300, letterSpacing: '0.5px', lineHeight: '1.8' }}>
            Experience the pinnacle of luxury and hospitality. The perfect destination for your dream wedding, corporate event, or a relaxing weekend getaway.
          </p>
          
          <div className="d-flex gap-4 justify-content-center flex-wrap mt-4">
            <Link href="/banquet" className="btn btn-premium px-5 py-3 rounded-pill d-flex align-items-center gap-2" style={{ letterSpacing: '2px', boxShadow: '0 10px 25px rgba(212, 175, 55, 0.4)', border: '1px solid var(--rv-gold)' }}>
              <span>Explore Venue</span>
              <i className="bi bi-arrow-right"></i>
            </Link>
            <Link href="/book" className="btn btn-outline-premium text-white border-white px-5 py-3 rounded-pill d-flex align-items-center gap-2" style={{ letterSpacing: '2px', backdropFilter: 'blur(8px)', borderWidth: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
              <span>Book Now</span>
              <i className="bi bi-calendar-check"></i>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="position-absolute start-50 translate-middle-x" style={{ bottom: '30px', opacity: 0.8, animation: 'reveal 2s infinite' }}>
          <span className="d-block text-white mb-2" style={{ fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase' }}>Scroll</span>
          <div className="mx-auto" style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--rv-gold), transparent)' }}></div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6">
              <div className="position-relative" style={{ height: '500px', borderRadius: '8px', overflow: 'hidden' }}>
                <Image src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" alt="RoyalVana Experience" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <SectionHeading title="Experience RoyalVana" subtitle="The Art of Hospitality" centered={false} />
              <p className="lead text-muted mb-4">
                Nestled in the heart of the city, RoyalVana offers an unparalleled blend of luxury, comfort, and world-class hospitality.
              </p>
              <p className="text-muted mb-5">
                Our elegant spaces are designed to host memorable celebrations, from grand weddings to intimate gatherings. With premium resort facilities, we ensure your stay is as magnificent as your celebration.
              </p>
              <Link href="/about" className="btn btn-outline-premium">Discover More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-champagne">
        <div className="container text-center">
          <SectionHeading title="Our Premium Services" subtitle="What We Offer" />
          <PremiumServices />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding text-white text-center" style={{ backgroundColor: 'var(--rv-navy)' }}>
        <div className="container">
          <h2 className="display-4 fw-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Planning Your Next Celebration?</h2>
          <p className="lead mb-5 mx-auto text-light" style={{ maxWidth: '700px' }}>
            Let our expert team help you plan the perfect event. Contact us today for a personalized quote and venue tour.
          </p>
          <Link href="/book" className="btn btn-premium px-5 py-3">Book Now</Link>
        </div>
      </section>
    </>
  );
}
