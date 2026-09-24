'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { after } from 'next/server';

export async function loginAdmin(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');
  
  // The correct credentials
  const CORRECT_USERNAME = process.env.ADMIN_USERNAME || 'admin';
  const CORRECT_PASSWORD = process.env.ADMIN_PASSWORD || 'Abc@2026';
  
  if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
    // Set a secure cookie that expires in 1 day
    const cookieStore = await cookies();
    cookieStore.set('royalvana_admin_session', 'authenticated', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    });
    
    return { success: true };
  } else {
    return { error: 'Incorrect username or password. Please try again.' };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('royalvana_admin_session');
  redirect('/admin/login');
}

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { sendEmail, sendSMS } from '@/lib/mailer';

export async function confirmBooking(bookingId: string) {
  try {
    // Update status
    const { data: bookingData, error } = await supabase
      .from('bookings')
      .update({ booking_status: 'confirmed' })
      .eq('booking_id', bookingId)
      .select('event_date, event_type, customers(name, email, phone)')
      .single();
      
    if (error) {
      console.error('Error confirming booking:', error);
      return { error: error.message };
    }
    
    // Send email and SMS if customer exists
    const customer = Array.isArray(bookingData?.customers) ? bookingData?.customers[0] : bookingData?.customers;
    if (customer) {
      after(() => {
        if (customer.email) {
          sendEmail({
            to: customer.email,
            subject: 'Your Booking is Confirmed - RoyalVana Banquet',
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Booking Confirmed!</h2>
                <p>Dear ${customer.name},</p>
                <p>We are thrilled to inform you that your booking for a <strong>${bookingData.event_type}</strong> on <strong>${new Date(bookingData.event_date).toLocaleDateString()}</strong> has been confirmed.</p>
                <p>Our management team will be in touch with you shortly to finalize the details.</p>
                <p>Thank you for choosing RoyalVana Banquet & Resort!</p>
              </div>
            `
          }).catch(e => console.error("Failed to send email", e));
        }

        if (customer.phone) {
          sendSMS({
            to: customer.phone,
            message: `Hi ${customer.name}, your booking for ${bookingData.event_type} on ${new Date(bookingData.event_date).toLocaleDateString()} at RoyalVana Banquet is confirmed! We will contact you soon.`
          }).catch(e => console.error("Failed to send SMS", e));
        }
      });
    }
    
    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    console.error("Internal Server Error in confirmBooking:", err);
    return { error: err.message || "An unexpected error occurred" };
  }
}

export async function rejectBooking(bookingId: string) {
  try {
    // Update status to cancelled to satisfy DB constraint but represents rejected
    const { data: bookingData, error } = await supabase
      .from('bookings')
      .update({ booking_status: 'cancelled' })
      .eq('booking_id', bookingId)
      .select('event_date, event_type, customers(name, email, phone)')
      .single();
      
    if (error) {
      console.error('Error rejecting booking:', error);
      return { error: error.message };
    }
    
    // Send email and SMS if customer exists
    const customer = Array.isArray(bookingData?.customers) ? bookingData?.customers[0] : bookingData?.customers;
    if (customer) {
      after(() => {
        if (customer.email) {
          sendEmail({
            to: customer.email,
            subject: 'Update on Your Booking Request - RoyalVana Banquet',
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Booking Request Update</h2>
                <p>Dear ${customer.name},</p>
                <p>We regret to inform you that we are unable to accommodate your booking request for a <strong>${bookingData.event_type}</strong> on <strong>${new Date(bookingData.event_date).toLocaleDateString()}</strong>.</p>
                <p>Our venue is currently fully booked or unavailable for the requested date and time.</p>
                <p>We apologize for any inconvenience this may cause and hope to serve you in the future.</p>
                <p>Best regards,<br/>RoyalVana Banquet & Resort</p>
              </div>
            `
          }).catch(e => console.error("Failed to send email", e));
        }

        if (customer.phone) {
          sendSMS({
            to: customer.phone,
            message: `Hi ${customer.name}, we are sorry to inform you that your booking request for ${bookingData.event_type} on ${new Date(bookingData.event_date).toLocaleDateString()} could not be accommodated. Please contact us for alternative dates.`
          }).catch(e => console.error("Failed to send SMS", e));
        }
      });
    }
    
    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    console.error("Internal Server Error in rejectBooking:", err);
    return { error: err.message || "An unexpected error occurred" };
  }
}

export async function confirmLead(enquiryId: string) {
  const { error } = await supabase
    .from('enquiries_leads')
    .update({ status: 'contacted' })
    .eq('enquiry_id', enquiryId);
    
  if (error) {
    console.error('Error confirming lead:', error);
    return { error: error.message };
  }
  
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteBooking(bookingId: string) {
  try {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('booking_id', bookingId);
      
    if (error) {
      console.error('Error deleting booking:', error);
      return { error: error.message };
    }
    
    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    console.error("Internal Server Error in deleteBooking:", err);
    return { error: err.message || "An unexpected error occurred" };
  }
}

export async function createManualBooking(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const city = formData.get('city') as string;
  const hall_id = formData.get('hall_id') as string;
  const eventType = formData.get('eventType') as string;
  const eventDate = formData.get('eventDate') as string;
  const guestCount = formData.get('guestCount') as string;
  const specialRequests = formData.get('specialRequests') as string;

  if (!name || !phone || !hall_id || !eventType || !eventDate) {
    return { error: 'Missing required fields' };
  }

  // Check if eventDate is in the past
  const selectedDate = new Date(eventDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    return { error: 'Event date cannot be in the past' };
  }

  // 1. Create or get customer
  const { data: customerData, error: customerError } = await supabase
    .from('customers')
    .insert([
      { name, phone, email: email || null, city: city || null }
    ])
    .select('customer_id')
    .single();

  if (customerError || !customerData) {
    console.error('Customer Error:', customerError);
    return { error: 'Failed to create customer record.' };
  }

  const customer_id = customerData.customer_id;

  // 2. Insert booking
  const { error: bookingError } = await supabase
    .from('bookings')
    .insert([
      {
        customer_id,
        hall_id,
        event_type: eventType,
        event_date: eventDate,
        start_time: '10:00:00',
        end_time: '23:59:00',
        guest_count: guestCount ? parseInt(guestCount) : 0,
        booking_status: 'confirmed', // Admin manual creation implies confirmed
        special_requests: specialRequests || null,
      }
    ]);

  if (bookingError) {
    console.error('Booking Error:', bookingError);
    return { error: 'Failed to create booking.' };
  }

  revalidatePath('/admin');
  return { success: true };
}
