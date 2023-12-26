-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2023 at 06:25 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simulator`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `category_code` int(11) NOT NULL,
  `designation` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_code`, `designation`) VALUES
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

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE IF NOT EXISTS `drivers` (
  `driver_id` int(11) NOT NULL,
  `driver_name` varchar(255) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `license_type` varchar(255) DEFAULT NULL,
  `license_issue_date` date DEFAULT NULL,
  `socio_professional_status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`driver_id`, `driver_name`, `birth_date`, `license_type`, `license_issue_date`, `socio_professional_status`) VALUES
(1, 'lucio', '2023-10-05', 'C', '2023-10-29', 'Statut1'),
(2, 'lucio', '2023-10-05', 'C', '2023-10-29', 'Statut1'),
(3, 'lucio', '2023-10-05', 'C', '2023-10-29', 'Statut1'),
(4, 'lucio', '2023-10-05', 'C', '2023-10-29', 'Statut1'),
(5, 'MORINO', '2023-10-21', 'A1, A2, A3', '2023-10-14', 'Statut1'),
(6, 'MORINO', '2000-10-12', 'B', '2023-09-25', 'Statut1'),
(7, 'MORINO', '2000-10-12', 'B', '2023-09-25', 'Statut1');

-- --------------------------------------------------------

--
-- Table structure for table `simulations`
--

CREATE TABLE IF NOT EXISTS `simulations` (
  `simulation_id` int(11) NOT NULL,
  `simulation_date` date DEFAULT NULL,
  `prime` int(11) DEFAULT NULL,
  `driver_id` int(11) DEFAULT NULL,
  `vehicle_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `simulations`
--

INSERT INTO `simulations` (`simulation_id`, `simulation_date`, `prime`, `driver_id`, `vehicle_id`) VALUES
(1, '2023-10-05', NULL, 1, 1),
(2, '2023-10-05', NULL, 2, 2),
(3, '2023-10-05', NULL, 3, 3),
(4, '2023-10-05', NULL, 4, 4),
(5, '2023-10-05', NULL, 5, 5),
(6, '2023-10-05', NULL, 6, 6),
(7, '2023-10-05', NULL, 7, 7);

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE IF NOT EXISTS `vehicles` (
  `vehicle_id` int(11) NOT NULL,
  `category_code` int(11) DEFAULT NULL,
  `insurance_duration` int(11) DEFAULT NULL,
  `fiscal_power` int(11) DEFAULT NULL,
  `fuel_type` varchar(50) DEFAULT NULL,
  `can_drive` enum('Yes','No') DEFAULT NULL,
  `kart_owner_insured` enum('Yes','No') DEFAULT NULL,
  `carries_flammable_material` enum('Yes','No') DEFAULT NULL,
  `with_trailer` enum('Yes','No') DEFAULT NULL,
  `trailer_power` int(11) DEFAULT NULL,
  `num_seats` int(11) DEFAULT NULL,
  `tonnage_payload` int(11) DEFAULT NULL,
  `habitual_driving_zone` varchar(255) DEFAULT NULL,
  `tpv_type` varchar(255) DEFAULT NULL,
  `vehicle_auto_ecole_type` varchar(255) DEFAULT NULL,
  `moto_type` varchar(255) DEFAULT NULL,
  `paid` enum('Yes','No') DEFAULT NULL,
  `special_category_type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`vehicle_id`, `category_code`, `insurance_duration`, `fiscal_power`, `fuel_type`, `can_drive`, `kart_owner_insured`, `carries_flammable_material`, `with_trailer`, `trailer_power`, `num_seats`, `tonnage_payload`, `habitual_driving_zone`, `tpv_type`, `vehicle_auto_ecole_type`, `moto_type`, `paid`, `special_category_type`) VALUES
(1, 220, 0, 12, 'Essence', '', 'No', 'No', 'No', 1, 2, 1, '', NULL, NULL, NULL, NULL, NULL),
(2, 220, 0, 12, 'Essence', NULL, 'No', 'No', 'No', 1, 2, 1, '', NULL, NULL, NULL, '', NULL),
(3, 220, 0, 12, 'Essence', NULL, 'No', 'No', 'No', 1, 2, 1, '', NULL, NULL, NULL, '', NULL),
(4, 220, 0, 12, 'Essence', NULL, 'No', 'No', 'No', 1, 2, 1, '', NULL, NULL, NULL, '', NULL),
(5, NULL, 0, 2, 'Essence', NULL, 'No', 'No', 'No', 1, 2, 1, 'zone rouge', NULL, NULL, NULL, '', NULL),
(6, 230, 0, 4, '', NULL, 'No', 'Yes', 'No', 0, 0, 8, 'zone rouge', NULL, NULL, NULL, '', NULL),
(7, 230, 0, 4, 'Electric', NULL, 'No', 'Yes', 'No', 0, 0, 8, 'zone rouge', NULL, NULL, NULL, '', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_code`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`driver_id`);

--
-- Indexes for table `simulations`
--
ALTER TABLE `simulations`
  ADD PRIMARY KEY (`simulation_id`),
  ADD KEY `driver_id` (`driver_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`vehicle_id`),
  ADD KEY `category_code` (`category_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_code` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=292;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `driver_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `simulations`
--
ALTER TABLE `simulations`
  MODIFY `simulation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `vehicle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `simulations`zzzz
--
ALTER TABLE `simulations`
  ADD CONSTRAINT `simulations_ibfk_1` FOREIGN KEY (`driver_id`) REFERENCES `drivers` (`driver_id`),
  ADD CONSTRAINT `simulations_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`);

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`category_code`) REFERENCES `categories` (`category_code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
