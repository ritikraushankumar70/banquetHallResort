import { supabase } from '@/lib/supabase';
import SectionHeading from '@/components/SectionHeading';
import BookingForm from './BookingForm';

export const revalidate = 60; // Cache for 60 seconds

export default async function BookPage() {
  // Fetch available halls and rooms
  const { data: halls } = await supabase
    .from('halls_rooms')
    .select('hall_id, hall_name, type, capacity_max, price_per_day')
    .eq('status', 'available')
    .order('type', { ascending: true });

  return (
    <main>
      {/* Hero Section */}
      <section className="position-relative d-flex align-items-center justify-content-center" style={{ height: '40vh', minHeight: '300px', backgroundColor: 'var(--rv-navy)' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: '0.4' }}></div>
        <div className="position-relative text-center text-white z-index-1">
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Book Your Event</h1>
          <p className="lead mb-0 text-white-50">Reserve a luxury hall or villa for your special day.</p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-lg" style={{ borderRadius: '15px', marginTop: '-100px', zIndex: 10 }}>
                <div className="card-body p-5">
                  <SectionHeading title="Direct Booking" subtitle="Fill in your details below" centered={true} />
                  
                  <BookingForm halls={halls || []} />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
