USE lifelink;

-- Q1: total stock per blood group across all banks
SELECT blood_group, SUM(units) AS total_units
FROM blood_inventory GROUP BY blood_group ORDER BY blood_group;

-- Q2: blood groups running low (fewer than 5 units in total)
SELECT blood_group, SUM(units) AS total_units
FROM blood_inventory GROUP BY blood_group HAVING SUM(units) < 5;

-- Q3: number of requests by status
SELECT status, COUNT(*) AS total FROM emergency_requests GROUP BY status;

-- Q4: open requests with hospital details, most urgent first
SELECT r.id, h.name AS hospital, h.city, r.blood_group, r.units, r.urgency, r.status
FROM emergency_requests r
JOIN hospitals h ON h.id = r.hospital_id
WHERE r.status IN ('pending','matched')
ORDER BY FIELD(r.urgency,'critical','urgent','normal'), r.created_at;

-- Q5: eligible donors for request 1 (compatible group, available, 90-day gap), same city first
SELECT d.id, u.name, d.blood_group, d.city, (d.city <> h.city) AS distance_score
FROM emergency_requests r
JOIN hospitals h ON h.id = r.hospital_id
JOIN blood_compatibility c ON c.recipient_group = r.blood_group
JOIN donors d ON d.blood_group = c.donor_group
JOIN users u ON u.id = d.user_id
WHERE r.id = 1 AND d.available = 1
  AND (d.last_donation IS NULL OR d.last_donation <= CURDATE() - INTERVAL 90 DAY)
ORDER BY distance_score, (d.blood_group = r.blood_group) DESC;

-- Q6: blood banks that have O+ in stock (subquery)

SELECT name, city FROM blood_banks
WHERE id IN (SELECT bank_id FROM blood_inventory WHERE blood_group = 'O+' AND units > 0);

-- Q7: donors per blood group and city
SELECT blood_group, city, COUNT(*) AS donors FROM donors GROUP BY blood_group, city;

-- Q8: full history of one request
SELECT r.id, l.status, l.note, l.created_at
FROM emergency_requests r JOIN request_logs l ON l.request_id = r.id
WHERE r.id = 1 ORDER BY l.id;
WITH req AS (
  SELECT r.id, r.blood_group, r.units, r.urgency, h.latitude AS hlat, h.longitude AS hlon
  FROM emergency_requests r JOIN hospitals h ON h.id = r.hospital_id
  WHERE r.id = 1
),
stock AS (
  SELECT i.bank_id, SUM(i.units) AS available
  FROM req
  JOIN blood_compatibility c ON c.recipient_group = req.blood_group
  JOIN blood_inventory i ON i.blood_group = c.donor_group
  GROUP BY i.bank_id
),
cand AS (
  SELECT b.id AS bank_id, b.name, s.available, req.units, req.urgency,
         ST_Distance_Sphere(POINT(b.longitude, b.latitude), POINT(req.hlon, req.hlat)) / 1000 AS dist_km
  FROM req
  JOIN stock s ON s.available >= req.units
  JOIN blood_banks b ON b.id = s.bank_id
)
SELECT bank_id, name, available, ROUND(dist_km, 1) AS dist_km,
  ROUND(
    (CASE urgency WHEN 'critical' THEN .7 WHEN 'urgent' THEN .5 ELSE .35 END) * GREATEST(0, 1 - dist_km / 400)
  + (1 - CASE urgency WHEN 'critical' THEN .7 WHEN 'urgent' THEN .5 ELSE .35 END) * LEAST(1, available / (units * 4))
  , 3) AS score
FROM cand ORDER BY score DESC LIMIT 5;
SELECT * FROM (
  SELECT d.id, u.name, d.blood_group, d.city, r.urgency,
         ROUND(ST_Distance_Sphere(POINT(d.longitude, d.latitude), POINT(h.longitude, h.latitude)) / 1000, 1) AS dist_km
  FROM emergency_requests r
  JOIN hospitals h ON h.id = r.hospital_id
  JOIN blood_compatibility c ON c.recipient_group = r.blood_group
  JOIN donors d ON d.blood_group = c.donor_group
  JOIN users u ON u.id = d.user_id
  WHERE r.id = 1 AND d.eligible = 1 AND d.available = 1
    AND d.latitude  BETWEEN h.latitude  - 1.1  AND h.latitude  + 1.1
    AND d.longitude BETWEEN h.longitude - 1.25 AND h.longitude + 1.25
    AND (d.last_donation IS NULL
         OR d.last_donation <= CURDATE() - INTERVAL IF(d.sex = 'M', 90, 120) DAY)
) t
WHERE dist_km <= IF(urgency = 'critical', 120, 60)
ORDER BY dist_km LIMIT 12;
