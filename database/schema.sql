DROP DATABASE IF EXISTS lifelink;
CREATE DATABASE lifelink CHARACTER SET utf8mb4;
USE lifelink;

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
