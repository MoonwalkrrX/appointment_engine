CREATE OR REPLACE FUNCTION public.rearm_reminders()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.start_time IS DISTINCT FROM OLD.start_time THEN
    DELETE FROM public.notifications
    WHERE appointment_id = NEW.id AND type IN ('reminder_1h','reminder_10m');
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS appointments_rearm_reminders ON public.appointments;
CREATE TRIGGER appointments_rearm_reminders
AFTER UPDATE OF start_time ON public.appointments
FOR EACH ROW EXECUTE FUNCTION public.rearm_reminders();
