import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import ResortAmenities from './ResortAmenities';

// Define the Room type based on the halls_rooms table
type Room = {
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

export default async function Resort() {
  // Fetch rooms from Supabase (type = 'resort room' or 'villa')
  const { data: roomsData, error } = await supabase
    .from('halls_rooms')
    .select('*')
    .in('type', ['resort room', 'villa'])
    .order('hall_name');

  const rooms: Room[] = roomsData || [];

  if (error) {
    console.error('Error fetching resort rooms:', error);
  }

  // Fallback image if none provided
  const fallbackImage = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop';

  return (
    <>
      <section className="bg-navy text-white text-center" style={{ padding: '120px 0 60px' }}>
        <div className="container">
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Luxury Resort Stay</h1>
          <p className="lead text-light">Unwind in our beautifully appointed rooms and suites.</p>
        </div>
      </section>

      <section className="section-padding bg-champagne">
        <div className="container">
          <SectionHeading title="Rooms & Suites" />
          <div className="row g-4 mt-4">
            {rooms.length > 0 ? (
              rooms.map((room) => {
                // Parse amenities correctly if they are strings (JSONB arrays might be returned as strings or parsed arrays)
                let amenitiesList: string[] = [];
                try {
                  amenitiesList = typeof room.amenities === 'string' ? JSON.parse(room.amenities) : room.amenities;
                } catch (e) {
                  // Fallback if parsing fails
                  amenitiesList = [];
                }

                // Get first image or fallback
                let imageUrl = fallbackImage;
                if (room.images && room.images.length > 0) {
                  try {
                    const parsedImages = typeof room.images === 'string' ? JSON.parse(room.images) : room.images;
                    if (Array.isArray(parsedImages) && parsedImages.length > 0) {
                      imageUrl = parsedImages[0];
                    }
                  } catch (e) {
                     // ignore
                  }
                }

                return (
                  <div key={room.hall_id} className="col-lg-4 col-md-6">
                    <div className="premium-card h-100 d-flex flex-column shadow-sm">
                      <div className="position-relative" style={{ height: '250px' }}>
                        <Image src={imageUrl} alt={room.hall_name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                        {room.price_per_day && (
                          <div className="position-absolute top-0 end-0 bg-gold text-white px-3 py-1 m-2 fw-bold rounded shadow-sm">
                            ₹{room.price_per_day}/night
                          </div>
                        )}
                      </div>
                      <div className="p-4 d-flex flex-column flex-grow-1 bg-white">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h4 className="fw-bold mb-0 text-navy">{room.hall_name}</h4>
                          <span className="badge bg-navy text-white text-uppercase">{room.type}</span>
                        </div>
                        
                        <p className="text-muted mb-4 small flex-grow-1">
                          Experience luxury at its finest with our {room.hall_name}. {room.area_sqft ? `Spanning ${room.area_sqft} sq.ft.` : ''} Ideal for {room.capacity_min}-{room.capacity_max} guests.
                        </p>
                        
                        {amenitiesList && amenitiesList.length > 0 && (
                          <div className="mb-4">
                            <h6 className="fw-bold text-muted small text-uppercase mb-2">Amenities</h6>
                            <ul className="list-unstyled mb-0 d-flex flex-wrap gap-2">
                              {amenitiesList.map((amenity, i) => (
                                <li key={i} className="badge bg-light text-dark border border-secondary fw-normal">
                                  {amenity}
                                </li>
                              ))}
                              {room.ac_non_ac === 'AC' && (
                                <li className="badge bg-light text-dark border border-secondary fw-normal">Air Conditioned</li>
                              )}
                            </ul>
                          </div>
                        )}
                        <div className="d-flex gap-2 mt-auto">
                          <Link href={`/book`} className="btn btn-premium flex-grow-1">Book Now</Link>
                          <Link href={`/contact?subject=Booking Enquiry for ${room.hall_name}`} className="btn btn-outline-premium flex-grow-1">Enquire</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center text-muted py-5">
                <p className="lead">No rooms available at the moment. Please check back later.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-white">
        <div className="container text-center">
          <SectionHeading title="Resort Amenities" />
          <ResortAmenities />
        </div>
      </section>
    </>
  );
}
