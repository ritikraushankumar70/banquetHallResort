import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import EventTypes from './EventTypes';

// Define the Hall type based on the halls_rooms table
type Hall = {
  hall_id: string;
  hall_name: string;
  type: string;
  capacity_min: number;
  capacity_max: number;
  area_sqft: number;
  floor: number;
  ac_non_ac: string;
  amenities: string[];
  price_per_day: number;
  price_per_hour: number;
  price_per_plate: number;
  images: string[];
  status: string;
};

// Next.js Revalidation config
export const revalidate = 60;

export default async function Banquet() {
  // Fetch banquet halls and lawns from Supabase
  const { data: hallsData, error } = await supabase
    .from('halls_rooms')
    .select('*')
    .in('type', ['banquet', 'lawn'])
    .order('hall_name');

  const halls: Hall[] = hallsData || [];

  if (error) {
    console.error('Error fetching banquet halls:', error);
  }

  // Fallback image
  const fallbackImage = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop';

  return (
    <>
      <section className="bg-navy text-white text-center" style={{ padding: '120px 0 60px' }}>
        <div className="container">
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Banquets & Lawns</h1>
          <p className="lead text-light">The perfect setting for your majestic celebrations.</p>
        </div>
      </section>

      {halls.length > 0 ? (
        halls.map((hall, index) => {
          // Alternate background colors
          const isEven = index % 2 === 0;
          const bgClass = isEven ? 'bg-white' : 'bg-champagne';
          
          let amenitiesList: string[] = [];
          try {
            amenitiesList = typeof hall.amenities === 'string' ? JSON.parse(hall.amenities) : hall.amenities;
          } catch (e) {
            amenitiesList = [];
          }

          let imageUrl = fallbackImage;
          if (hall.images && hall.images.length > 0) {
            try {
              const parsedImages = typeof hall.images === 'string' ? JSON.parse(hall.images) : hall.images;
              if (Array.isArray(parsedImages) && parsedImages.length > 0) {
                imageUrl = parsedImages[0];
              }
            } catch (e) {
              // ignore
            }
          }

          return (
            <section key={hall.hall_id} className={`section-padding ${bgClass}`}>
              <div className="container">
                <div className={`row align-items-center gy-5 ${!isEven ? 'flex-row-reverse' : ''}`}>
                  <div className="col-lg-6">
                    <div className="position-relative shadow-lg" style={{ height: '500px', borderRadius: '8px', overflow: 'hidden' }}>
                      <Image src={imageUrl} alt={hall.hall_name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                      <div className="position-absolute top-0 start-0 m-3 badge bg-gold text-white px-3 py-2 text-uppercase fs-6 shadow">
                        {hall.type}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <SectionHeading title={hall.hall_name} subtitle="Elegance & Grandeur" centered={false} />
                    <p className="text-muted mb-4">
                      Our {hall.hall_name} is a masterpiece of design, providing a versatile and breathtaking backdrop. Whether you are hosting a wedding reception, a corporate gala, or a milestone birthday, this space is tailored to perfection.
                    </p>
                    <div className="row g-3 mb-4">
                      <div className="col-sm-6">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-people-fill text-gold fs-4 me-3"></i>
                          <div>
                            <small className="text-muted d-block text-uppercase">Capacity</small>
                            <strong>{hall.capacity_min} - {hall.capacity_max} Guests</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-arrows-fullscreen text-gold fs-4 me-3"></i>
                          <div>
                            <small className="text-muted d-block text-uppercase">Area</small>
                            <strong>{hall.area_sqft ? `${hall.area_sqft} sq.ft.` : 'N/A'}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-wind text-gold fs-4 me-3"></i>
                          <div>
                            <small className="text-muted d-block text-uppercase">Environment</small>
                            <strong>{hall.ac_non_ac}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-tags-fill text-gold fs-4 me-3"></i>
                          <div>
                            <small className="text-muted d-block text-uppercase">Starting Price</small>
                            <strong>
                              {hall.price_per_day ? `₹${hall.price_per_day} /day` : hall.price_per_plate ? `₹${hall.price_per_plate} /plate` : 'Contact for price'}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {amenitiesList && amenitiesList.length > 0 && (
                      <ul className="list-unstyled mb-4">
                        {amenitiesList.map((amenity, i) => (
                          <li key={i} className="mb-2 text-capitalize">
                            <i className="bi bi-check-circle-fill text-gold me-2"></i> {amenity}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="d-flex gap-3 mt-2">
                      <Link href={`/book`} className="btn btn-premium">Book Now</Link>
                      <Link href={`/contact?subject=Booking for ${hall.hall_name}`} className="btn btn-outline-premium">Enquire Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })
      ) : (
        <section className="section-padding bg-white">
          <div className="container text-center">
            <p className="lead text-muted">No banquet halls available at the moment.</p>
          </div>
        </section>
      )}
      
      <section className="section-padding bg-navy text-white text-center">
        <div className="container">
          <SectionHeading title="Perfect For Every Event" />
          <EventTypes />
        </div>
      </section>
    </>
  );
}
