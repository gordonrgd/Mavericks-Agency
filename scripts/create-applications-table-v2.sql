-- Création de la table applications pour stocker les candidatures
CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  age INTEGER,
  location VARCHAR(255) NOT NULL,
  timezone VARCHAR(50),
  onlyfans_username VARCHAR(100) NOT NULL,
  current_monthly_revenue VARCHAR(50) NOT NULL,
  account_age VARCHAR(50) NOT NULL,
  subscriber_count VARCHAR(50) NOT NULL,
  average_subscription_price VARCHAR(50),
  content_frequency VARCHAR(50),
  content_type VARCHAR(100) NOT NULL,
  niche VARCHAR(255) NOT NULL,
  content_style VARCHAR(100),
  unique_selling_point TEXT NOT NULL,
  content_creation_experience VARCHAR(50),
  equipment_quality VARCHAR(50),
  instagram_followers VARCHAR(50),
  tiktok_followers VARCHAR(50),
  twitter_followers VARCHAR(50),
  other_platforms TEXT,
  current_marketing_efforts TEXT NOT NULL,
  business_goals TEXT NOT NULL,
  revenue_goals VARCHAR(50) NOT NULL,
  time_commitment VARCHAR(50) NOT NULL,
  availability VARCHAR(50) NOT NULL,
  previous_management VARCHAR(50),
  management_expectations TEXT,
  current_challenges TEXT NOT NULL,
  biggest_obstacles TEXT,
  support_needed TEXT NOT NULL,
  support_level VARCHAR(50),
  long_term_vision VARCHAR(50),
  hear_about_us VARCHAR(50),
  additional_info TEXT,
  portfolio_links TEXT,
  terms_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  privacy_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  marketing_consent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Activation de Row Level Security (RLS)
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion publique (pour le formulaire)
CREATE POLICY "Allow public insert" ON applications
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Politique pour permettre la lecture aux utilisateurs authentifiés seulement
CREATE POLICY "Allow authenticated read" ON applications
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at);

-- Commentaires pour la documentation
COMMENT ON TABLE applications IS 'Table pour stocker les candidatures des créateurs OnlyFans';
COMMENT ON COLUMN applications.id IS 'Identifiant unique de la candidature';
COMMENT ON COLUMN applications.email IS 'Email du candidat';
COMMENT ON COLUMN applications.created_at IS 'Date de création de la candidature';
