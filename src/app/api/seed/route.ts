import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Rooms are seeded via SQL directly into halls_rooms table

    // 2. Seed Gallery Images
    const galleryImages = [
      { category: 'BANQUET', image_url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop' },
      { category: 'BANQUET', image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop' },
      { category: 'WEDDINGS', image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2070&auto=format&fit=crop' },
      { category: 'WEDDINGS', image_url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop' },
      { category: 'ROOMS', image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop' },
      { category: 'ROOMS', image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop' },
      { category: 'DINING', image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop' },
      { category: 'DINING', image_url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop' },
      { category: 'RESORT', image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop' },
      { category: 'RESORT', image_url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop' },
      { category: 'EVENTS', image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop' },
      { category: 'EVENTS', image_url: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop' }
    ];

    const { error: galleryError } = await supabase.from('gallery').insert(galleryImages);
    if (galleryError) {
      console.error('Error inserting gallery images:', galleryError);
      return NextResponse.json({ error: 'Failed to insert gallery images', details: galleryError }, { status: 500 });
    }

    return NextResponse.json({ message: 'Database successfully seeded!' });
  } catch (error) {
    console.error('Unexpected error during seeding:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
