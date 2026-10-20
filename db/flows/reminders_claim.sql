WITH due AS (
  SELECT a.id AS appointment_id, 'reminder_1h' AS rtype
  FROM appointments a
  JOIN customers c ON c.id = a.customer_id
  WHERE a.status = 'CONFIRMED'
    AND c.email IS NOT NULL
    AND a.start_time > now() + interval '30 minutes'
    AND a.start_time <= now() + interval '60 minutes'
    AND a.created_at <= a.start_time - interval '60 minutes'
  UNION ALL
  SELECT a.id, 'reminder_10m'
  FROM appointments a
  JOIN customers c ON c.id = a.customer_id
  WHERE a.status = 'CONFIRMED'
    AND c.email IS NOT NULL
    AND a.start_time > now()
    AND a.start_time <= now() + interval '10 minutes'
    AND a.created_at <= a.start_time - interval '10 minutes'
),
claim AS (
  INSERT INTO notifications (appointment_id, type, channel, status)
  SELECT appointment_id, rtype, 'email', 'pending' FROM due
  ON CONFLICT (appointment_id, type, channel) DO NOTHING
  RETURNING appointment_id, type
)
SELECT claim.appointment_id, claim.type, c.email, c.name AS customer_name,
  s.name AS service_name, st.name AS staff_name,
  to_char(a.start_time AT TIME ZONE 'Africa/Lagos', 'FMDay, FMDD FMMonth YYYY') AS date_text,
  to_char(a.start_time AT TIME ZONE 'Africa/Lagos', 'HH24:MI') AS time_text
FROM claim
JOIN appointments a ON a.id = claim.appointment_id
JOIN customers c ON c.id = a.customer_id
JOIN services s ON s.id = a.service_id
JOIN staff st ON st.id = a.staff_id;
