import SectionHeading from '@/components/SectionHeading';
import GalleryClient from './GalleryClient';
import { supabase } from '@/lib/supabase';

// Define the GalleryImage type
type GalleryImage = {
  image_id: string;
  category: string;
  image_url: string;
};

export const dynamic = 'force-dynamic';

export default async function Gallery() {
  // Fetch gallery images from Supabase
  const { data: galleryData, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at');

  const galleryImages: GalleryImage[] = galleryData || [];

  if (error) {
    console.error('Error fetching gallery images:', error);
  }

  return (
    <>
      <section className="bg-navy text-white text-center" style={{ padding: '120px 0 60px' }}>
        <div className="container">
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Our Gallery</h1>
          <p className="lead text-light">A glimpse into the luxury and grandeur of RoyalVana.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <GalleryClient galleryImages={galleryImages} />
        </div>
      </section>
    </>
  );
}
