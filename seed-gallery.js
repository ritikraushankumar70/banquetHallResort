const { createClient } = require('@supabase/supabase-js');
const { randomUUID } = require('crypto');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const categories = {
  'BANQUET': 'luxury banquet hall interior',
  'WEDDINGS': 'luxury indian wedding ceremony',
  'RESORT': 'luxury resort exterior',
  'ROOMS': 'luxury hotel suite',
  'EVENTS': 'luxury corporate event setup',
  'DINING': 'luxury fine dining restaurant'
};

async function seed() {
  console.log('Clearing existing gallery...');
  await supabase.from('gallery').delete().neq('image_id', '00000000-0000-0000-0000-000000000000'); // Delete all

  const data = [];
  
  for (const cat of Object.keys(categories)) {
    const query = encodeURIComponent(categories[cat]);
    const res = await fetch(`https://unsplash.com/napi/search/photos?query=${query}&per_page=5`);
    const json = await res.json();
    
    if (json.results && json.results.length > 0) {
      const top5 = json.results.slice(0, 5);
      for (const img of top5) {
        data.push({
          image_id: randomUUID(),
          category: cat,
          image_url: img.urls.regular,
          created_at: new Date().toISOString()
        });
      }
      console.log(`Fetched ${top5.length} images for ${cat}`);
    } else {
      console.log(`Failed to fetch for ${cat}`);
    }
  }

  console.log(`Inserting ${data.length} premium images...`);
  
  for (let i = 0; i < data.length; i += 50) {
    const batch = data.slice(i, i + 50);
    const { error } = await supabase.from('gallery').insert(batch);
    if (error) {
      console.error('Error inserting batch:', error);
    } else {
      console.log(`Inserted batch ${Math.floor(i/50) + 1}`);
    }
  }
  
  console.log('Done!');
}

seed();
