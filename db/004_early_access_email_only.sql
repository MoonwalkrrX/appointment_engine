ALTER TABLE public.early_access_signups ADD CONSTRAINT contact_is_email CHECK (contact ~* '^[^[:space:]@]+@[^[:space:]@]+\.[A-Za-z]{2,}$');
