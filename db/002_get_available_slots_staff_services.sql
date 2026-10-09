CREATE OR REPLACE FUNCTION public.get_available_slots(p_requested_date date, p_service_id uuid, p_staff_id uuid, p_timezone text DEFAULT 'Africa/Lagos'::text)
 RETURNS TABLE(slot_start timestamp without time zone, slot_end timestamp without time zone)
 LANGUAGE sql
 STABLE
AS $function$
  WITH svc AS (
    SELECT s.duration_minutes
    FROM public.services s
    WHERE s.id = p_service_id AND s.active
      AND EXISTS (
        SELECT 1
        FROM public.staff_services ss
        JOIN public.staff st ON st.id = ss.staff_id
        WHERE ss.service_id = s.id
          AND ss.staff_id = p_staff_id
          AND st.active
          AND st.business_id = s.business_id
      )
  ),
  hours AS (
    SELECT wh.start_time, wh.end_time
    FROM public.working_hours wh
    WHERE wh.staff_id = p_staff_id
      AND wh.weekday = EXTRACT(DOW FROM p_requested_date)::int
  ),
  candidates AS (
    SELECT
      gs AS c_start,
      gs + make_interval(mins => svc.duration_minutes) AS c_end
    FROM hours h
    CROSS JOIN svc
    CROSS JOIN LATERAL generate_series(
      p_requested_date + h.start_time,
      p_requested_date + h.end_time - make_interval(mins => svc.duration_minutes),
      make_interval(mins => svc.duration_minutes)
    ) AS gs
  )
  SELECT c.c_start, c.c_end
  FROM candidates c
  WHERE (c.c_start AT TIME ZONE p_timezone) > now()
    AND NOT EXISTS (
      SELECT 1
      FROM public.appointments a
      WHERE a.staff_id = p_staff_id
        AND a.status IN ('PENDING','CONFIRMED')
        AND tstzrange(a.start_time, a.end_time, '[)') &&
            tstzrange(c.c_start AT TIME ZONE p_timezone,
                      c.c_end   AT TIME ZONE p_timezone, '[)')
    )
  ORDER BY c.c_start;
$function$;
