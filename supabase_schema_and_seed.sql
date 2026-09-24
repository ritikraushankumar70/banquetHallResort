-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert rooms data
INSERT INTO rooms (name, description, image_url) VALUES
('Presidential Suite', 'The ultimate luxury experience with panoramic views.', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop'),
('Luxury Double Room', 'Elegant and spacious, perfect for families and couples.', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop'),
('Deluxe Room', 'Comfortable and stylish, equipped with all modern amenities.', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop');


-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert gallery data
INSERT INTO gallery_images (category, image_url) VALUES
('BANQUET', 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop'),
('WEDDINGS', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop'),
('ROOMS', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000&auto=format&fit=crop'),
('DINING', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop'),
('BANQUET', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop'),
('RESORT', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop');


-- Create enquiries table (if not exists)
CREATE TABLE IF NOT EXISTS enquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    event_date DATE,
    guest_count INTEGER,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS and create policies
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Allow public read access to rooms and gallery_images
CREATE POLICY "Allow public read access on rooms" ON rooms FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "Allow public read access on gallery_images" ON gallery_images FOR SELECT TO PUBLIC USING (true);

-- Allow public insert access on enquiries
CREATE POLICY "Allow public insert on enquiries" ON enquiries FOR INSERT TO PUBLIC WITH CHECK (true);
