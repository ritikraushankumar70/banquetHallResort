const { createClient } = require('@supabase/supabase-js');
const http = require('http');

const supabase = createClient(
  'https://mldafyroekunhwmfrqzt.supabase.co',
  'sb_publishable_a5yYbOjdwJ18nXd5sPMHSQ_8232NgAP'
);

async function sendBookings() {
  // 1. Get a hall_id
  const { data: halls, error } = await supabase.from('halls_rooms').select('hall_id').limit(1);
  if (error || !halls || halls.length === 0) {
    console.error('Failed to fetch a hall_id', error);
    return;
  }
  const hall_id = halls[0].hall_id;
  console.log('Using hall_id:', hall_id);

  const numBookings = 50;
  console.log(`Sending ${numBookings} bookings...`);

  for (let i = 1; i <= numBookings; i++) {
    const data = JSON.stringify({
      name: `Automated Request ${i}`,
      email: `test${i}@test.com`,
      phone: `999888${String(i).padStart(4, '0')}`,
      hall_id: hall_id, // Add the missing hall_id
      eventDate: `2027-10-${String((i % 28) + 1).padStart(2, '0')}`,
      eventType: 'Wedding',
      guestCount: 150 + i,
      message: `Automated test booking #${i} created via script`
    });

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/book',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = http.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        if(res.statusCode !== 201) {
          console.log(`Booking ${i}: Status ${res.statusCode} - ${responseBody}`);
        } else {
          console.log(`Booking ${i}: OK`);
        }
      });
    });

    req.on('error', (error) => {
      console.error(`Booking ${i} Error:`, error.message);
    });

    req.write(data);
    req.end();
    
    // Add a tiny delay to not overload the server
    await new Promise(resolve => setTimeout(resolve, 50));
  }
}

sendBookings();
