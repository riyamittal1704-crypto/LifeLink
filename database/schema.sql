-- LifeLink database schema (MySQL 8)
DROP DATABASE IF EXISTS lifelink;
CREATE DATABASE lifelink CHARACTER SET utf8mb4;
USE lifelink;

-- ---------- Core tables ----------
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('hospital','donor','bloodbank','admin') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE donors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  blood_group CHAR(3) NOT NULL,
  city VARCHAR(60) NOT NULL,
  age INT NOT NULL,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  last_donation DATE NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT chk_age CHECK (age BETWEEN 18 AND 65),
  CONSTRAINT chk_dgroup CHECK (blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
  INDEX idx_donor_lookup (blood_group, city, available)
) ENGINE=InnoDB;

CREATE TABLE hospitals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,

  name VARCHAR(120) NOT NULL,
  city VARCHAR(60) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE blood_banks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  city VARCHAR(60) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------- Compatibility lookup (who can donate to whom) ----------
CREATE TABLE blood_compatibility (
  donor_group CHAR(3) NOT NULL,
  recipient_group CHAR(3) NOT NULL,
  PRIMARY KEY (donor_group, recipient_group)
) ENGINE=InnoDB;

-- ---------- Inventory, requests, matching ----------
CREATE TABLE blood_inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bank_id INT NOT NULL,
  blood_group CHAR(3) NOT NULL,
  units INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_bank_group (bank_id, blood_group),
  FOREIGN KEY (bank_id) REFERENCES blood_banks(id) ON DELETE CASCADE,
  CONSTRAINT chk_units CHECK (units >= 0)
) ENGINE=InnoDB;


CREATE TABLE emergency_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hospital_id INT NOT NULL,
  blood_group CHAR(3) NOT NULL,
  units INT NOT NULL,
  urgency ENUM('normal','urgent','critical') NOT NULL DEFAULT 'urgent',
  status ENUM('pending','matched','fulfilled','cancelled') NOT NULL DEFAULT 'pending',
  fulfilled_by_bank_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (hospital_id) REFERENCES hospitals(id),
  FOREIGN KEY (fulfilled_by_bank_id) REFERENCES blood_banks(id),
  CONSTRAINT chk_req_units CHECK (units > 0),
  INDEX idx_req_status (status, urgency)
) ENGINE=InnoDB;

CREATE TABLE donor_matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  request_id INT NOT NULL,
  donor_id INT NOT NULL,
  distance_score INT NOT NULL DEFAULT 0,
  status ENUM('notified','accepted','declined') NOT NULL DEFAULT 'notified',
  UNIQUE KEY uq_match (request_id, donor_id),
  FOREIGN KEY (request_id) REFERENCES emergency_requests(id) ON DELETE CASCADE,
  FOREIGN KEY (donor_id) REFERENCES donors(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------- Notifications and request history ----------
CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  message VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE request_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  request_id INT NOT NULL,
  status VARCHAR(20) NOT NULL,
  note VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (request_id) REFERENCES emergency_requests(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------- Compatibility data ----------
INSERT INTO blood_compatibility VALUES
('O-','O-'),('O-','O+'),('O-','A-'),('O-','A+'),('O-','B-'),('O-','B+'),('O-','AB-'),('O-','AB+'),
('O+','O+'),('O+','A+'),('O+','B+'),('O+','AB+'),
('A-','A-'),('A-','A+'),('A-','AB-'),('A-','AB+'),
('A+','A+'),('A+','AB+'),
('B-','B-'),('B-','B+'),('B-','AB-'),('B-','AB+'),
('B+','B+'),('B+','AB+'),
('AB-','AB-'),('AB-','AB+'),
('AB+','AB+');
