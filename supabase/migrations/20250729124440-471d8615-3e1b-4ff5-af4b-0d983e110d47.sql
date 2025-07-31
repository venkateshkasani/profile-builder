-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  profession TEXT,
  bio TEXT,
  location TEXT,
  website_url TEXT,
  instagram_handle TEXT,
  linkedin_url TEXT,
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create work_samples table for portfolio items
CREATE TABLE public.work_samples (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  media_url TEXT,
  media_type TEXT CHECK (media_type IN ('image', 'video', 'document', 'link')),
  source_platform TEXT,
  original_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tags table
CREATE TABLE public.tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profile_tags junction table
CREATE TABLE public.profile_tags (
  profile_id UUID REFERENCES public.profiles NOT NULL,
  tag_id UUID REFERENCES public.tags NOT NULL,
  PRIMARY KEY (profile_id, tag_id)
);

-- Create import_sources table to track data sources
CREATE TABLE public.import_sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles NOT NULL,
  source_type TEXT NOT NULL CHECK (source_type IN ('instagram', 'linkedin', 'website', 'gdrive', 'resume')),
  source_url TEXT,
  import_status TEXT DEFAULT 'pending' CHECK (import_status IN ('pending', 'processing', 'completed', 'failed')),
  imported_data JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_samples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.import_sources ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for work_samples
CREATE POLICY "Users can view all work samples" 
ON public.work_samples 
FOR SELECT 
USING (true);

CREATE POLICY "Users can manage their own work samples" 
ON public.work_samples 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = work_samples.profile_id 
    AND profiles.user_id = auth.uid()
  )
);

-- Create RLS policies for tags
CREATE POLICY "Everyone can view tags" 
ON public.tags 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create tags" 
ON public.tags 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Create RLS policies for profile_tags
CREATE POLICY "Everyone can view profile tags" 
ON public.profile_tags 
FOR SELECT 
USING (true);

CREATE POLICY "Users can manage their own profile tags" 
ON public.profile_tags 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = profile_tags.profile_id 
    AND profiles.user_id = auth.uid()
  )
);

-- Create RLS policies for import_sources
CREATE POLICY "Users can view their own import sources" 
ON public.import_sources 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = import_sources.profile_id 
    AND profiles.user_id = auth.uid()
  )
);

CREATE POLICY "Users can manage their own import sources" 
ON public.import_sources 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = import_sources.profile_id 
    AND profiles.user_id = auth.uid()
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_import_sources_updated_at
  BEFORE UPDATE ON public.import_sources
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default tags
INSERT INTO public.tags (name, category) VALUES
  ('Photography', 'skill'),
  ('Videography', 'skill'),
  ('Graphic Design', 'skill'),
  ('Web Design', 'skill'),
  ('Film Direction', 'skill'),
  ('Content Creation', 'skill'),
  ('Social Media', 'skill'),
  ('Fashion', 'industry'),
  ('Food', 'industry'),
  ('Travel', 'industry'),
  ('Corporate', 'industry'),
  ('Events', 'industry'),
  ('Portrait', 'style'),
  ('Landscape', 'style'),
  ('Street', 'style'),
  ('Commercial', 'style');