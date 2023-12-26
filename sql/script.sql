-- Drop the database if it exists (Note: Be cautious with this statement)
DROP DATABASE IF EXISTS SIMULATOR;

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS SIMULATOR;

-- Switch to the SIMULATOR database
USE SIMULATOR;

-- Table for Subscribers
CREATE TABLE IF NOT EXISTS subscribers (
  subscriber_id INT AUTO_INCREMENT PRIMARY KEY,
  login VARCHAR(24) NOT NULL,
  email VARCHAR(48) NOT NULL,
  password VARCHAR(100) NOT NULL
);

-- Table for Drivers
CREATE TABLE IF NOT EXISTS drivers (
  driver_id INT AUTO_INCREMENT PRIMARY KEY,
  driver_name VARCHAR(24),
  birth_date DATE,
  license_type CHAR(5),
  license_issue_date DATE,
  socio_professional_status VARCHAR(24),
  subscriber_id INT NOT NULL,
  FOREIGN KEY (subscriber_id) REFERENCES subscribers(subscriber_id)
);

-- Table for Categories
CREATE TABLE IF NOT EXISTS categories (
  category_code INT AUTO_INCREMENT PRIMARY KEY,
  designation VARCHAR(24)
);

-- Table for Vehicles
CREATE TABLE IF NOT EXISTS vehicles (
  num_vehicle VARCHAR(10) PRIMARY KEY,
  category_code INT,
  insurance_duration INT,
  fiscal_power INT,
  fuel_type VARCHAR(10),
  can_drive VARCHAR(10),
  kart_owner_insured VARCHAR(10),
  carries_flammable_material ENUM('Yes', 'No'),
  with_trailer ENUM('Yes', 'No'),
  trailer_power INT,
  num_seats INT,
  tonnage_payload INT,
  habitual_driving_zone VARCHAR(24),
  tpv_type VARCHAR(10),
  vehicle_auto_ecole_type VARCHAR(10),
  moto_type VARCHAR(10),
  paid VARCHAR(5),
  special_category_type VARCHAR(10),
  FOREIGN KEY (category_code) REFERENCES categories(category_code)
);

-- Table for Simulations
CREATE TABLE IF NOT EXISTS simulations (
  simulation_id INT AUTO_INCREMENT PRIMARY KEY,
  simulation_date DATE,
  result INT,
  driver_id INT,
  num_vehicle VARCHAR(10),
  subscriber_id INT,
  FOREIGN KEY (driver_id) REFERENCES drivers(driver_id),
  FOREIGN KEY (num_vehicle) REFERENCES vehicles(num_vehicle),
  FOREIGN KEY (subscriber_id) REFERENCES subscribers(subscriber_id)
);

-- Insert categories data
INSERT INTO categories (category_code, designation) VALUES
(210, 'Promenade & Affaires'),
(220, 'Transport Propre Compte'),
(230, 'Transport Public de Marchandises'),
(240, 'Transport Public de Voyageurs'),
(250, 'Véhicule 2/3 Roues Personnel'),
(260, 'Véhicules \'WW\' Garages'),
(270, 'Véhicule Auto-École'),
(280, 'Véhicule de Location'),
(290, 'Engins de Chantiers'),
(291, 'Véhicules Spéciaux');
