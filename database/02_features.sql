USE lifelink;

-- 1. Locations (for distance)
ALTER TABLE hospitals
  ADD COLUMN latitude DECIMAL(9,6) NULL,
  ADD COLUMN longitude DECIMAL(9,6) NULL;

ALTER TABLE blood_banks
  ADD COLUMN latitude DECIMAL(9,6) NULL,
  ADD COLUMN longitude DECIMAL(9,6) NULL;

ALTER TABLE donors
  ADD COLUMN sex ENUM('M','F') NOT NULL DEFAULT 'M',
  ADD COLUMN latitude DECIMAL(9,6) NULL,
  ADD COLUMN longitude DECIMAL(9,6) NULL,
  ADD COLUMN eligible BOOLEAN NOT NULL DEFAULT FALSE,
  ADD INDEX idx_donor_geo (latitude, longitude),
  ADD INDEX idx_donor_match (eligible, available, blood_group);

-- 2. Request priority and the decision record
ALTER TABLE emergency_requests
  ADD COLUMN priority_rank TINYINT AS
    (CASE urgency WHEN 'critical' THEN 3 WHEN 'urgent' THEN 2 ELSE 1 END) STORED,
  ADD COLUMN match_score DECIMAL(5,3) NULL,
  ADD COLUMN distance_km DECIMAL(6,1) NULL,
  ADD INDEX idx_queue (status, priority_rank, created_at);

-- 3. Donor alerts: when notified, when answered, how far
ALTER TABLE donor_matches
  ADD COLUMN distance_km DECIMAL(6,1) NULL,
  ADD COLUMN notified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN responded_at TIMESTAMP NULL;

-- 4. Donor eligibility screening (yes/no answers only)
CREATE TABLE donor_screening (
  id INT AUTO_INCREMENT PRIMARY KEY,
  donor_id INT NOT NULL,
  screened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  weight_kg DECIMAL(5,2) NOT NULL,
  haemoglobin DECIMAL(4,1) NOT NULL,
  recent_infection BOOLEAN NOT NULL DEFAULT FALSE,
  on_medication BOOLEAN NOT NULL DEFAULT FALSE,
  recent_surgery BOOLEAN NOT NULL DEFAULT FALSE,
  recent_tattoo BOOLEAN NOT NULL DEFAULT FALSE,
  recent_vaccination BOOLEAN NOT NULL DEFAULT FALSE,
  pregnant_or_breastfeeding BOOLEAN NOT NULL DEFAULT FALSE,
  chronic_condition BOOLEAN NOT NULL DEFAULT FALSE,
  infectious_history BOOLEAN NOT NULL DEFAULT FALSE,
  alcohol_24h BOOLEAN NOT NULL DEFAULT FALSE,
  smoked_1h BOOLEAN NOT NULL DEFAULT FALSE,
  injected_drugs BOOLEAN NOT NULL DEFAULT FALSE,
  is_eligible BOOLEAN NOT NULL,
  reason VARCHAR(255) NULL,
  FOREIGN KEY (donor_id) REFERENCES donors(id) ON DELETE CASCADE,
  CONSTRAINT chk_weight CHECK (weight_kg BETWEEN 30 AND 200),
  CONSTRAINT chk_hb CHECK (haemoglobin BETWEEN 5 AND 20),
  CONSTRAINT chk_eligible_rule CHECK (is_eligible = FALSE OR (weight_kg >= 45 AND haemoglobin >= 12.5)),
  INDEX idx_screen_donor (donor_id, screened_at)
) ENGINE=InnoDB;

-- 5. Admin views
CREATE VIEW v_stock_by_group AS
  SELECT blood_group, SUM(units) AS total_units
  FROM blood_inventory GROUP BY blood_group;

CREATE VIEW v_request_queue AS
  SELECT r.id, h.name AS hospital, h.city, r.blood_group, r.units,
         r.urgency, r.priority_rank, r.status, r.created_at
  FROM emergency_requests r JOIN hospitals h ON h.id = r.hospital_id
  WHERE r.status IN ('pending','matched')
  ORDER BY r.priority_rank DESC, r.created_at;
