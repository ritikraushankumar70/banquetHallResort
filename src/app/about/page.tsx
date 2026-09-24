import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import Link from 'next/link';
import WhyChooseUs from './WhyChooseUs';

export default function About() {
  return (
    <>
      <section className="bg-navy text-white text-center" style={{ padding: '120px 0 60px' }}>
        <div className="container">
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>About RoyalVana</h1>
          <p className="lead text-light">A legacy of luxury, hospitality, and unforgettable celebrations.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6">
              <SectionHeading title="Our Story" subtitle="Tradition & Elegance" centered={false} />
              <p className="text-muted mb-4">
                Founded with a vision to redefine luxury celebrations, RoyalVana Banquet & Resort has grown into a premier destination for weddings, corporate events, and tranquil getaways. Our architectural elegance combined with state-of-the-art facilities makes us the ideal choice for any grand occasion.
              </p>
              <p className="text-muted">
                Every detail at RoyalVana is meticulously crafted to ensure perfection. From our sprawling banquet halls to our lavish resort suites, we believe in creating an experience that resonates with sophistication and warmth.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="position-relative" style={{ height: '400px', borderRadius: '8px', overflow: 'hidden' }}>
                <Image src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop" alt="Our Story" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-champagne text-center">
        <div className="container">
          <SectionHeading title="Why Choose RoyalVana" />
          <WhyChooseUs />
        </div>
      </section>
      
      <section className="section-padding bg-navy text-white text-center">
        <div className="container">
          <h2 className="display-5 fw-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Ready to Experience Luxury?</h2>
          <Link href="/contact" className="btn btn-premium px-5 py-3 mt-3">Contact Us Today</Link>
        </div>
      </section>
    </>
  );
}
