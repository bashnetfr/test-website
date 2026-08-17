-- =============================================
-- RoboVault Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- Categories Table
-- =============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Products Table
-- =============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  image_url TEXT,
  stock INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  specs JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Orders Table
-- =============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Order Items Table
-- =============================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL DEFAULT 0
);

-- =============================================
-- Profiles Table
-- =============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Enable Row Level Security
-- =============================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS Policies
-- =============================================

-- Categories: Public read
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

-- Products: Public read
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

-- Orders: Users can read their own
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- Orders: Users can insert their own
CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Order Items: Users can read items from their own orders
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Order Items: Users can insert items into their own orders
CREATE POLICY "Users can create own order items"
  ON order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Profiles: Users can read their own
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Profiles: Users can update their own
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Profiles: Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- Seed Data: Categories
-- =============================================
INSERT INTO categories (name, slug, description) VALUES
  ('Humanoid Robots', 'humanoid', 'Life-like robots designed to interact with humans naturally'),
  ('Industrial Robots', 'industrial', 'Heavy-duty robots for manufacturing and automation'),
  ('Toy & Educational', 'toy', 'Fun and educational robots for learning and play'),
  ('Service Robots', 'service', 'Robots designed for customer service and hospitality'),
  ('Drone Robots', 'drone', 'Aerial robots for photography, delivery, and surveillance')
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- Seed Data: Products
-- =============================================
DO $$
DECLARE
  humanoid_id UUID;
  industrial_id UUID;
  toy_id UUID;
  service_id UUID;
  drone_id UUID;
BEGIN
  SELECT id INTO humanoid_id FROM categories WHERE slug = 'humanoid';
  SELECT id INTO industrial_id FROM categories WHERE slug = 'industrial';
  SELECT id INTO toy_id FROM categories WHERE slug = 'toy';
  SELECT id INTO service_id FROM categories WHERE slug = 'service';
  SELECT id INTO drone_id FROM categories WHERE slug = 'drone';

  INSERT INTO products (name, slug, description, price, category_id, stock, featured, specs) VALUES
  -- Humanoid Robots
  ('Atlas X1', 'atlas-x1', 'State-of-the-art humanoid robot with advanced AI and natural movement capabilities. Perfect for research and demonstration.', 45000.00, humanoid_id, 5, true,
    '{"height": "1.8m", "weight": "85kg", "battery": "8 hours", "ai_processor": "Neural Core V3", "languages": "20+", "mobility": "Bipedal walking, running, stairs"}'),

  ('Echo Companion', 'echo-companion', 'Friendly humanoid companion designed for elderly care and home assistance. Features emotional intelligence.', 12000.00, humanoid_id, 15, true,
    '{"height": "1.5m", "weight": "45kg", "battery": "12 hours", "ai_processor": "Empathy Engine", "languages": "15+", "features": "Fall detection, medication reminders, conversation"}'),

  ('Nova android', 'nova-android', 'Premium humanoid with photorealistic skin and lifelike expressions. Ideal for hospitality and entertainment.', 35000.00, humanoid_id, 8, false,
    '{"height": "1.7m", "weight": "65kg", "battery": "6 hours", "ai_processor": "Social AI Pro", "features": "Facial expressions, gesture recognition, crowd interaction"}'),

  -- Industrial Robots
  ('Titan Arm MK4', 'titan-arm-mk4', 'Heavy-duty robotic arm with 500kg payload capacity. Built for demanding manufacturing environments.', 85000.00, industrial_id, 3, true,
    '{"payload": "500kg", "reach": "3.2m", "precision": "±0.02mm", "speed": "2.5m/s", "protection": "IP67", "power": "3-phase 480V"}'),

  ('PrecisionBot 200', 'precisionbot-200', 'Ultra-precision assembly robot for electronics and micro-manufacturing.', 28000.00, industrial_id, 10, false,
    '{"payload": "20kg", "reach": "1.4m", "precision": "±0.001mm", "speed": "1.8m/s", "features": "Force sensing, vision system, cleanroom rated"}'),

  ('WeldBot Pro', 'weldbot-pro', 'Automated welding robot with adaptive seam tracking and multi-process welding capability.', 42000.00, industrial_id, 6, true,
    '{"welding_types": "MIG, TIG, Laser", "reach": "2.0m", "precision": "±0.1mm", "features": "Adaptive tracking, dual torch, cloud monitoring"}'),

  -- Toy & Educational
  ('STEM Bot Junior', 'stem-bot-junior', 'Interactive educational robot teaching coding, physics, and engineering. Perfect for ages 8-14.', 149.99, toy_id, 100, true,
    '{"age_range": "8-14", "battery": "4 hours", "connectivity": "WiFi, Bluetooth", "languages": "Scratch, Python", "features": "100+ experiments, voice control, obstacle avoidance"}'),

  ('CodeBuddy Pro', 'codebuddy-pro', 'Advanced coding robot for teens and adults. Learn AI, machine learning, and robotics programming.', 399.99, toy_id, 50, false,
    '{"age_range": "14+", "battery": "6 hours", "sensors": "Camera, LIDAR, IMU", "languages": "Python, ROS, JavaScript", "features": "AI labs, computer vision, gesture control"}'),

  ('RoboPet Dog', 'robopet-dog', 'Lifelike robotic pet dog with realistic movements and emotional responses. No allergies guaranteed!', 599.99, toy_id, 75, true,
    '{"weight": "2.5kg", "battery": "8 hours", "features": "100+ movements, voice recognition, app control", "sensors": "Touch, proximity, temperature", "modes": "Play, Learn, Guard"}'),

  -- Service Robots
  ('HospitaBot 360', 'hospitabot-360', 'Hospital service robot for patient delivery, medication transport, and sanitization.', 25000.00, service_id, 7, true,
    '{"payload": "100kg", "battery": "16 hours", "speed": "5km/h", "features": "UV sanitization, medication delivery, patient monitoring", "navigation": "SLAM + RFID"}'),

  ('ConciergeMax', 'conciergemax', 'Premium hotel and office concierge robot with multilingual support and navigation.', 18000.00, service_id, 12, false,
    '{"height": "1.6m", "battery": "10 hours", "languages": "30+", "features": "Room service, directions, check-in", "display": "15-inch touchscreen"}'),

  -- Drone Robots
  ('SkyHawk X', 'skyhawk-x', 'Professional camera drone with 8K video, 45-minute flight time, and AI-powered cinematography.', 2499.99, drone_id, 30, true,
    '{"camera": "8K/60fps", "flight_time": "45 min", "range": "15km", "speed": "72km/h", "features": "AI tracking, obstacle avoidance, foldable", "weight": "900g"}'),

  ('CargoLifter 500', 'cargolifter-500', 'Heavy-lift delivery drone with 50km range. Built for logistics and emergency supply delivery.', 15000.00, drone_id, 4, false,
    '{"payload": "10kg", "range": "50km", "flight_time": "30 min", "speed": "60km/h", "features": "Autonomous delivery, parachute system, thermal imaging"}'),

  ('Scout Mini', 'scout-mini', 'Compact surveillance drone with night vision and whisper-quiet operation. Perfect for security.', 899.99, drone_id, 40, false,
    '{"camera": "4K/120fps + Night Vision", "flight_time": "35 min", "range": "8km", "noise": "20dB", "features": "Stealth mode, motion detection, auto-patrol"}')
  ON CONFLICT (slug) DO NOTHING;
END $$;
