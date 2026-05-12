-- Création de la table pour les candidatures
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Informations personnelles
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  age INTEGER,
  location TEXT,
  timezone TEXT,
  
  -- Informations OnlyFans
  onlyfans_username TEXT NOT NULL,
  current_monthly_revenue TEXT,
  account_age TEXT,
  subscriber_count TEXT,
  average_subscription_price TEXT,
  content_frequency TEXT,
  
  -- Contenu & Niche
  content_type TEXT,
  niche TEXT,
  content_style TEXT,
  unique_selling_point TEXT,
  content_creation_experience TEXT,
  equipment_quality TEXT,
  
  -- Social Media & Marketing
  instagram_followers TEXT,
  tiktok_followers TEXT,
  twitter_followers TEXT,
  other_platforms TEXT,
  current_marketing_efforts TEXT,
  
  -- Business & Goals
  business_goals TEXT,
  revenue_goals TEXT,
  time_commitment TEXT,
  availability TEXT,
  previous_management TEXT,
  management_expectations TEXT,
  
  -- Challenges & Support
  current_challenges TEXT,
  biggest_obstacles TEXT,
  support_needed TEXT,
  support_level TEXT,
  long_term_vision TEXT,
  
  -- Final Details
  hear_about_us TEXT,
  additional_info TEXT,
  portfolio_links TEXT,
  terms_accepted BOOLEAN DEFAULT FALSE,
  privacy_accepted BOOLEAN DEFAULT FALSE,
  marketing_consent BOOLEAN DEFAULT FALSE,
  
  -- Status de la candidature
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  notes TEXT
);

-- Index pour les recherches fréquentes
CREATE INDEX idx_applications_email ON applications(email);
CREATE INDEX idx_applications_created_at ON applications(created_at);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_revenue ON applications(current_monthly_revenue);

-- Politique de sécurité (Row Level Security)
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion depuis l'application
CREATE POLICY "Allow public insert" ON applications
  FOR INSERT TO anon
  WITH CHECK (true);

-- Politique pour permettre la lecture aux utilisateurs authentifiés
CREATE POLICY "Allow authenticated read" ON applications
  FOR SELECT TO authenticated
  USING (true);
