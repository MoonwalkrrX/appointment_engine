CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id uuid NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('confirmation','reminder_1h','reminder_10m','cancellation','reschedule')),
  channel text NOT NULL DEFAULT 'email' CHECK (channel IN ('email','whatsapp','sms')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','sent','failed')),
  provider_id text,
  error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  sent_at timestamptz,
  UNIQUE (appointment_id, type, channel)
);
GRANT SELECT, INSERT, UPDATE ON public.notifications TO booking_app;
