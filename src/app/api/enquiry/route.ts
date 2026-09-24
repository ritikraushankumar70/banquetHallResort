import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, eventType, eventDate, guestCount, message } = body;

    // Basic validation
    if (!name || !email || !phone || !eventType) {
      return NextResponse.json({ error: 'Name, email, phone, and event type are required.' }, { status: 400 });
    }

    // Combine extra fields into the notes column
    const formattedNotes = `
Email: ${email}
Event Type: ${eventType}
Event Date: ${eventDate || 'Not specified'}
Guests: ${guestCount || 'Not specified'}

Message:
${message || 'No additional message'}
    `.trim();

    // Insert into Supabase detailed schema (enquiries_leads table)
    const { data, error } = await supabase
      .from('enquiries_leads')
      .insert([
        {
          source: 'website',
          customer_name: name,
          phone: phone,
          notes: formattedNotes,
          status: 'new'
        },
      ]);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to submit enquiry to database.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Enquiry submitted successfully' }, { status: 201 });
  } catch (err) {
    console.error('API route error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
