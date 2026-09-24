-- 1. Hall / Resort Master Data
CREATE TABLE IF NOT EXISTS halls_rooms (
    hall_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hall_name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('banquet', 'lawn', 'resort room', 'villa')),
    capacity_min INT,
    capacity_max INT,
    area_sqft INT,
    floor INT,
    ac_non_ac VARCHAR(20) CHECK (ac_non_ac IN ('AC', 'Non-AC')),
    amenities JSONB,
    price_per_day DECIMAL(10,2),
    price_per_hour DECIMAL(10,2),
    price_per_plate DECIMAL(10,2),
    images JSONB,
    video VARCHAR(255),
    status VARCHAR(50) DEFAULT 'available' CHECK (status IN ('available', 'under maintenance')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Customer Data
CREATE TABLE IF NOT EXISTS customers (
    customer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    city VARCHAR(100),
    id_proof_type VARCHAR(50),
    id_proof_number VARCHAR(100),
    gst_number VARCHAR(50),
    total_bookings INT DEFAULT 0,
    loyalty_points INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Staff & Vendor Management (Staff table needed for created_by in bookings)
CREATE TABLE IF NOT EXISTS staff (
    staff_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    salary DECIMAL(10,2),
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vendors (
    vendor_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_name VARCHAR(255) NOT NULL,
    service_type VARCHAR(100) NOT NULL, -- decorator, DJ, photographer, caterer
    contact_phone VARCHAR(20) NOT NULL,
    commission_percentage DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Booking - Sabse Important Table
CREATE TABLE IF NOT EXISTS bookings (
    booking_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(customer_id) ON DELETE CASCADE,
    hall_id UUID REFERENCES halls_rooms(hall_id) ON DELETE SET NULL,
    event_type VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    guest_count INT,
    booking_status VARCHAR(50) DEFAULT 'enquiry' CHECK (booking_status IN ('enquiry', 'confirmed', 'cancelled', 'completed')),
    decoration_theme VARCHAR(100),
    catering_type VARCHAR(50) CHECK (catering_type IN ('veg', 'non-veg', 'both')),
    special_requests TEXT,
    created_by UUID REFERENCES staff(staff_id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Food & Catering
CREATE TABLE IF NOT EXISTS packages (
    package_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    package_name VARCHAR(100) NOT NULL,
    per_plate_price DECIMAL(10,2) NOT NULL,
    menu_items JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS catering_orders (
    order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(booking_id) ON DELETE CASCADE,
    package_id UUID REFERENCES packages(package_id),
    veg_plate_count INT DEFAULT 0,
    non_veg_plate_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Payment & Billing
CREATE TABLE IF NOT EXISTS payments (
    payment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(booking_id) ON DELETE CASCADE,
    total_amount DECIMAL(12,2) NOT NULL,
    advance_paid DECIMAL(12,2) DEFAULT 0,
    balance_amount DECIMAL(12,2) GENERATED ALWAYS AS (total_amount - advance_paid) STORED,
    payment_mode VARCHAR(50) CHECK (payment_mode IN ('UPI', 'cash', 'bank transfer', 'PhonePe', 'card')),
    transaction_id VARCHAR(255),
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    invoice_number VARCHAR(100) UNIQUE,
    refund_amount DECIMAL(12,2) DEFAULT 0,
    cancellation_charges DECIMAL(12,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Rooms / Resort Stay (agar resort hai)
CREATE TABLE IF NOT EXISTS room_bookings (
    room_booking_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID REFERENCES halls_rooms(hall_id) ON DELETE CASCADE,
    booking_id UUID REFERENCES bookings(booking_id) ON DELETE CASCADE,
    check_in TIMESTAMP WITH TIME ZONE NOT NULL,
    check_out TIMESTAMP WITH TIME ZONE NOT NULL,
    adults INT DEFAULT 1,
    children INT DEFAULT 0,
    extra_bed INT DEFAULT 0,
    room_service_orders JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff Duty Roster
CREATE TABLE IF NOT EXISTS staff_duty_roster (
    roster_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(booking_id) ON DELETE CASCADE,
    staff_id UUID REFERENCES staff(staff_id) ON DELETE CASCADE,
    shift_start TIMESTAMP WITH TIME ZONE,
    shift_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Inventory & Stock
CREATE TABLE IF NOT EXISTS inventory (
    item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_name VARCHAR(255) NOT NULL,
    total_qty INT NOT NULL DEFAULT 0,
    available_qty INT NOT NULL DEFAULT 0,
    damaged_qty INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Enquiry & Leads
CREATE TABLE IF NOT EXISTS enquiries_leads (
    enquiry_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source VARCHAR(50) CHECK (source IN ('website', 'Instagram', 'walk-in', 'phone', 'other')),
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    follow_up_date DATE,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'lost')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Feedback & Extra
CREATE TABLE IF NOT EXISTS feedback (
    feedback_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(booking_id) ON DELETE SET NULL,
    customer_id UUID REFERENCES customers(customer_id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review TEXT,
    complaint TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS offers_discounts (
    offer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offer_name VARCHAR(255) NOT NULL,
    description TEXT,
    discount_percentage DECIMAL(5,2),
    valid_from DATE,
    valid_to DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery (
    image_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(100),
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-----------------------------------------------------------
-- SEED DATA 
-----------------------------------------------------------

-- Insert Halls
INSERT INTO halls_rooms (hall_name, type, capacity_min, capacity_max, area_sqft, floor, ac_non_ac, amenities, price_per_day, price_per_plate) VALUES
('Royal Banquet', 'banquet', 100, 500, 5000, 1, 'AC', '["stage", "sound", "projector"]', 50000.00, 1200.00),
('Poolside Lawn', 'lawn', 200, 1000, 10000, 0, 'Non-AC', '["stage", "pool access"]', 80000.00, 1500.00),
('Luxury Villa', 'villa', 2, 6, 1200, 0, 'AC', '["private pool", "kitchen"]', 15000.00, NULL),
('Deluxe Room 101', 'resort room', 1, 3, 400, 1, 'AC', '["tv", "wifi", "room service"]', 5000.00, NULL);

-- Insert Staff
INSERT INTO staff (name, role, salary, phone) VALUES
('Ramesh Kumar', 'Manager', 35000.00, '9876543210'),
('Suresh Verma', 'Waiter', 15000.00, '8765432109');

-- Insert Customers
INSERT INTO customers (name, phone, email, city, id_proof_type, id_proof_number, gst_number) VALUES
('Amit Sharma', '9123456780', 'amit.sharma@example.com', 'Delhi', 'Aadhar', '123456789012', NULL),
('TechCorp India', '9988776655', 'hr@techcorp.in', 'Gurgaon', 'PAN', 'ABCDE1234F', '07AABCU9603R1ZM');

-- Insert Packages
INSERT INTO packages (package_name, per_plate_price, menu_items) VALUES
('Gold', 1000.00, '{"starters": ["Paneer Tikka", "Spring Roll"], "main": ["Dal Makhani", "Shahi Paneer", "Naan"], "dessert": ["Gulab Jamun"]}'),
('Diamond', 1500.00, '{"starters": ["Paneer Tikka", "Chicken Tikka"], "main": ["Dal Makhani", "Butter Chicken", "Naan"], "dessert": ["Ice Cream", "Brownie"]}');

-- Insert Inventory
INSERT INTO inventory (item_name, total_qty, available_qty, damaged_qty) VALUES
('Banquet Chair', 500, 480, 20),
('Round Table', 50, 50, 0),
('Chafing Dish', 20, 18, 2);

-- Insert Vendors
INSERT INTO vendors (vendor_name, service_type, contact_phone, commission_percentage) VALUES
('Sparkle Decorators', 'decorator', '9911223344', 10.00),
('DJ Raj', 'DJ', '9898989898', 15.00);

-- Note: Because we use gen_random_uuid(), inserting bookings with exact IDs in a simple script needs WITH queries or we just rely on standard insertions if not strictly linked, 
-- but for demo purposes, inserting without foreign keys linked exactly, or we can use subqueries.
-- Below is a conceptual example using subqueries for relationships:

INSERT INTO bookings (customer_id, hall_id, event_type, event_date, start_time, end_time, guest_count, booking_status, catering_type, created_by)
SELECT 
    (SELECT customer_id FROM customers WHERE name = 'Amit Sharma' LIMIT 1),
    (SELECT hall_id FROM halls_rooms WHERE hall_name = 'Royal Banquet' LIMIT 1),
    'wedding', '2027-11-15', '18:00:00', '23:59:00', 300, 'confirmed', 'veg',
    (SELECT staff_id FROM staff WHERE name = 'Ramesh Kumar' LIMIT 1);

INSERT INTO payments (booking_id, total_amount, advance_paid, payment_mode, transaction_id)
SELECT 
    (SELECT booking_id FROM bookings LIMIT 1),
    150000.00, 50000.00, 'UPI', 'UPI987654321';
