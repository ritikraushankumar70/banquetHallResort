import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, email, phone, city,
      hall_id, eventType, eventDate, guestCount, specialRequests 
    } = body;

    // Basic validation
    if (!name || !phone || !hall_id || !eventType || !eventDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if eventDate is in the past
    const selectedDate = new Date(eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return NextResponse.json({ error: 'Event date cannot be in the past' }, { status: 400 });
    }

    // 1. Insert or get Customer
    // For simplicity, we just create a new customer record for every booking. 
    // In a real app, you might look up by phone/email first.
    const { data: customerData, error: customerError } = await supabase
      .from('customers')
      .insert([
        {
          name,
          phone,
          email: email || null,
          city: city || null,
        }
      ])
      .select('customer_id')
      .single();

    if (customerError || !customerData) {
      console.error('Customer Error:', customerError);
      return NextResponse.json({ error: 'Failed to create customer record.' }, { status: 500 });
    }

    const customer_id = customerData.customer_id;

    // 2. Insert Booking
    const { error: bookingError } = await supabase
      .from('bookings')
      .insert([
        {
          customer_id,
          hall_id,
          event_type: eventType,
          event_date: eventDate,
          start_time: '10:00:00', // Default start time
          end_time: '23:59:00',   // Default end time
          guest_count: guestCount ? parseInt(guestCount) : 0,
          booking_status: 'enquiry', // It's an enquiry until admin confirms
          special_requests: specialRequests || null,
        }
      ]);

    if (bookingError) {
      console.error('Booking Error:', bookingError);
      return NextResponse.json({ error: 'Failed to create booking record.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Booking requested successfully' }, { status: 201 });
  } catch (err) {
    console.error('API route error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
