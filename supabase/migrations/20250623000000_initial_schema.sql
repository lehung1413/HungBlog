-- HungBlog initial schema

CREATE TYPE skill_group AS ENUM (
  'backend', 'frontend', 'database', 'devops', 'cloud', 'management', 'soft_skills'
);

CREATE TYPE post_status AS ENUM ('draft', 'published');

CREATE TYPE project_status AS ENUM ('completed', 'in_progress', 'archived');

-- Profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name JSONB NOT NULL DEFAULT '{"en":"","vi":""}'::jsonb,
  job_title JSONB NOT NULL DEFAULT '{"en":"","vi":""}'::jsonb,
  bio JSONB NOT NULL DEFAULT '{"en":"","vi":""}'::jsonb,
  avatar_url TEXT,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Experiences
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name JSONB NOT NULL DEFAULT '{"en":"","vi":""}'::jsonb,
  position JSONB NOT NULL DEFAULT '{"en":"","vi":""}'::jsonb,
  start_date DATE NOT NULL,
  end_date DATE,
  description JSONB NOT NULL DEFAULT '{"en":"","vi":""}'::jsonb,
  achievements JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX experiences_sort_order_idx ON experiences(sort_order);

-- Skills
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_group skill_group NOT NULL,
  name JSONB NOT NULL DEFAULT '{"en":"","vi":""}'::jsonb,
  proficiency INT NOT NULL DEFAULT 50 CHECK (proficiency >= 0 AND proficiency <= 100),
  sort_order INT NOT NULL DEFAULT 0
);

CREATE INDEX skills_group_sort_idx ON skills(skill_group, sort_order);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name JSONB NOT NULL DEFAULT '{"en":"","vi":""}'::jsonb,
  slug TEXT NOT NULL UNIQUE,
  description JSONB NOT NULL DEFAULT '{"en":"","vi":""}'::jsonb,
  thumbnail_url TEXT,
  github_url TEXT,
  demo_url TEXT,
  role JSONB NOT NULL DEFAULT '{"en":"","vi":""}'::jsonb,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  status project_status NOT NULL DEFAULT 'completed',
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX projects_featured_sort_idx ON projects(featured, sort_order);

-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name JSONB NOT NULL DEFAULT '{"en":"","vi":""}'::jsonb,
  sort_order INT NOT NULL DEFAULT 0
);

-- Tags
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name JSONB NOT NULL DEFAULT '{"en":"","vi":""}'::jsonb
);

-- Posts
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title JSONB NOT NULL DEFAULT '{"en":"","vi":""}'::jsonb,
  slug TEXT NOT NULL UNIQUE,
  excerpt JSONB NOT NULL DEFAULT '{"en":"","vi":""}'::jsonb,
  content JSONB NOT NULL DEFAULT '{"en":"","vi":""}'::jsonb,
  thumbnail_url TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  status post_status NOT NULL DEFAULT 'draft',
  reading_time_minutes INT NOT NULL DEFAULT 1,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX posts_status_published_idx ON posts(status, published_at DESC);
CREATE INDEX posts_category_idx ON posts(category_id);

-- Post tags junction
CREATE TABLE post_tags (
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

CREATE INDEX post_tags_tag_idx ON post_tags(tag_id);

-- Settings
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Updated at trigger for posts and profiles
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, job_title, bio)
  VALUES (
    NEW.id,
    jsonb_build_object('en', COALESCE(NEW.raw_user_meta_data->>'full_name', ''), 'vi', ''),
    '{"en":"","vi":""}'::jsonb,
    '{"en":"","vi":""}'::jsonb
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Single admin enforcement
CREATE OR REPLACE FUNCTION enforce_single_admin()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_admin = true THEN
    IF EXISTS (
      SELECT 1 FROM profiles
      WHERE is_admin = true AND id != NEW.id
    ) THEN
      RAISE EXCEPTION 'Only one admin account is allowed';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER single_admin_check
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION enforce_single_admin();

-- Helper: check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public read experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read tags" ON tags FOR SELECT USING (true);
CREATE POLICY "Public read published posts" ON posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public read post_tags" ON post_tags FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);

-- Admin policies
CREATE POLICY "Admin all profiles" ON profiles FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin all experiences" ON experiences FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin all skills" ON skills FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin all projects" ON projects FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin all categories" ON categories FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin all tags" ON tags FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin all posts" ON posts FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin all post_tags" ON post_tags FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin all settings" ON settings FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Admin read drafts
CREATE POLICY "Admin read all posts" ON posts FOR SELECT USING (is_admin());

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
  ('avatars', 'avatars', true),
  ('blog-images', 'blog-images', true),
  ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public read storage" ON storage.objects
  FOR SELECT USING (bucket_id IN ('avatars', 'blog-images', 'project-images'));

CREATE POLICY "Admin upload storage" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id IN ('avatars', 'blog-images', 'project-images') AND is_admin()
  );

CREATE POLICY "Admin update storage" ON storage.objects
  FOR UPDATE USING (
    bucket_id IN ('avatars', 'blog-images', 'project-images') AND is_admin()
  );

CREATE POLICY "Admin delete storage" ON storage.objects
  FOR DELETE USING (
    bucket_id IN ('avatars', 'blog-images', 'project-images') AND is_admin()
  );
