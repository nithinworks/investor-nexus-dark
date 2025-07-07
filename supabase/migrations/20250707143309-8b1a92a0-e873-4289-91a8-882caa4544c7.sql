-- Add image_url field to investors table
ALTER TABLE public.investors 
ADD COLUMN image_url TEXT;

-- Add contact_type field to specify the type of contact (email, linkedin, twitter, etc.)
ALTER TABLE public.investors 
ADD COLUMN contact_type TEXT DEFAULT 'email';

-- Insert some sample investors with the new fields (using correct constraint values)
INSERT INTO public.investors (name, company, location, funding_type, funding_stage, funding_description, funding_industries, check_sizes, contact, contact_type, company_url, image_url, bio) VALUES 
(
  'Sarah Chen',
  'Vertex Ventures',
  'Singapore',
  'VC',
  'Series A',
  'Leading early-stage investments in Southeast Asian startups with focus on fintech and enterprise software',
  ARRAY['Fintech', 'Enterprise Software', 'AI/ML'],
  '$1M - $5M',
  'https://linkedin.com/in/sarahchen-vertex',
  'linkedin',
  'https://vertexventures.sg',
  'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
  'Partner at Vertex Ventures with 12+ years experience in venture capital and startup ecosystems across Asia-Pacific.'
),
(
  'Marcus Rodriguez',
  'Andreessen Horowitz',
  'San Francisco, CA',
  'VC',
  'Seed',
  'Investing in AI-first companies and next-generation developer tools',
  ARRAY['AI/ML', 'Developer Tools', 'Infrastructure'],
  '$500K - $10M',
  'https://twitter.com/marcusa16z',
  'twitter',
  'https://a16z.com',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
  'General Partner focused on early-stage enterprise software and infrastructure investments.'
),
(
  'Emily Watson',
  'Bessemer Venture Partners',
  'New York, NY',
  'VC',
  'Series B',
  'Building the future of healthcare technology and digital health solutions',
  ARRAY['Healthcare', 'Digital Health', 'Biotech'],
  '$2M - $20M',
  'emily.watson@bvp.com',
  'email',
  'https://bessemervp.com',
  'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop&crop=face',
  'Partner specializing in healthcare technology investments with background in digital health innovation.'
),
(
  'David Kim',
  'Sequoia Capital',
  'Menlo Park, CA',
  'VC',
  'Series A',
  'Partnering with founders building category-defining companies in consumer and enterprise',
  ARRAY['Consumer Tech', 'Enterprise Software', 'Marketplace'],
  '$1M - $25M',
  'https://linkedin.com/in/davidkim-sequoia',
  'linkedin',
  'https://sequoiacap.com',
  'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
  'Principal at Sequoia Capital with expertise in consumer internet and enterprise software investments.'
),
(
  'Priya Sharma',
  'Accel Partners',
  'London, UK',
  'VC',
  'Series A',
  'Investing in European startups disrupting traditional industries through technology',
  ARRAY['Fintech', 'E-commerce', 'SaaS'],
  '$3M - $15M',
  'https://twitter.com/priya_accel',
  'twitter',
  'https://accel.com',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
  'Partner at Accel focusing on European fintech and SaaS companies with proven market traction.'
);