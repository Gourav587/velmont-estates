-- Preserve the original portfolio examples without presenting stock photos as verified properties.
INSERT INTO projects (id, title, location, category, image, description, is_illustrative) VALUES
('1', 'Amritsar Green Heights', 'Ranjit Avenue, Amritsar', 'Residential', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', 'An illustrative residential opportunity in Amritsar. Contact our team for verified property details and current availability.', true),
('2', 'Pathankot Business Hub', 'Dalhousie Road, Pathankot', 'Commercial', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', 'An illustrative commercial opportunity in Pathankot. Contact our team for verified property details and current availability.', true),
('3', 'Gurdaspur Royal Estates', 'Tibber Road, Gurdaspur', 'Luxury Plots', 'https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&w=800&q=80', 'An illustrative plot opportunity in Gurdaspur. Contact our team for verified property details and current availability.', true)
ON CONFLICT (id) DO NOTHING;
