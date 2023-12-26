-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 23 oct. 2023 à 07:53
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `simulator`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `category_code` int NOT NULL AUTO_INCREMENT,
  `designation` varchar(24) DEFAULT NULL,
  PRIMARY KEY (`category_code`)
) ENGINE=MyISAM AUTO_INCREMENT=292 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`category_code`, `designation`) VALUES
(210, 'Promenade & Affaires'),
(220, 'Transport Propre Compte'),
(230, 'Transport Public de Marc'),
(240, 'Transport Public de Voya'),
(250, 'Véhicule 2/3 Roues Perso'),
(260, 'Véhicules \'WW\' Garages'),
(270, 'Véhicule Auto-École'),
(280, 'Véhicule de Location'),
(290, 'Engins de Chantiers'),
(291, 'Véhicules Spéciaux');

-- --------------------------------------------------------

--
-- Structure de la table `drivers`
--

DROP TABLE IF EXISTS `drivers`;
CREATE TABLE IF NOT EXISTS `drivers` (
  `driver_id` int NOT NULL AUTO_INCREMENT,
  `driver_name` varchar(24) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `license_type` char(5) DEFAULT NULL,
  `license_issue_date` date DEFAULT NULL,
  `socio_professional_status` varchar(24) DEFAULT NULL,
  `subscriber_id` int NOT NULL,
  PRIMARY KEY (`driver_id`),
  KEY `subscriber_id` (`subscriber_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `drivers`
--

INSERT INTO `drivers` (`driver_id`, `driver_name`, `birth_date`, `license_type`, `license_issue_date`, `socio_professional_status`, `subscriber_id`) VALUES
(1, 'lucio', '2001-10-13', 'C', '2022-12-12', 'Statut1', 1),
(2, 'lucio', '2001-10-13', 'C', '2022-12-12', 'Statut1', 1),
(3, 'lucio', '2001-10-13', 'C', '2022-12-12', 'Statut1', 1),
(4, 'Bruno', '1975-10-06', 'A1, A', '2001-09-29', 'Statut2', 1),
(5, 'AKASHI', '2004-12-12', 'B', '2022-10-05', 'Statut2', 1),
(6, 'MORINO', '2004-03-14', 'B', '2021-10-26', 'Statut1', 1);

-- --------------------------------------------------------

--
-- Structure de la table `simulations`
--

DROP TABLE IF EXISTS `simulations`;
CREATE TABLE IF NOT EXISTS `simulations` (
  `simulation_id` int NOT NULL AUTO_INCREMENT,
  `simulation_date` date DEFAULT NULL,
  `prime_RC` int DEFAULT NULL,
  `driver_id` int DEFAULT NULL,
  `num_vehicle` varchar(10) DEFAULT NULL,
  `subscriber_id` int DEFAULT NULL,
  PRIMARY KEY (`simulation_id`),
  KEY `driver_id` (`driver_id`),
  KEY `num_vehicle` (`num_vehicle`),
  KEY `subscriber_id` (`subscriber_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `simulations`
--

INSERT INTO `simulations` (`simulation_id`, `simulation_date`, `prime_RC`, `driver_id`, `num_vehicle`, `subscriber_id`) VALUES
(1, '2023-10-19', 103020, 3, 'LM 1545 RB', NULL),
(2, '2023-10-19', 13608, 4, 'BD 3602 RB', NULL),
(3, '2023-10-20', 114137, 5, 'AS 2585 RB', NULL),
(4, '2023-10-21', 152315, 6, 'AS 2586 RB', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `subscribers`
--

DROP TABLE IF EXISTS `subscribers`;
CREATE TABLE IF NOT EXISTS `subscribers` (
  `subscriber_id` int NOT NULL AUTO_INCREMENT,
  `login` varchar(24) NOT NULL,
  `email` varchar(48) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`subscriber_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `subscribers`
--

INSERT INTO `subscribers` (`subscriber_id`, `login`, `email`, `password`) VALUES
(1, 'lucio31415', 'lucio31415@gmail.com', '$2y$10$P6dRvrA6Aus4eAD.xbfkUOVyq2HGGP4/SMMyN.9dRDgccIyioG4m2');

-- --------------------------------------------------------

--
-- Structure de la table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
CREATE TABLE IF NOT EXISTS `vehicles` (
  `num_vehicle` varchar(10) NOT NULL,
  `category_code` int DEFAULT NULL,
  `insurance_duration` int DEFAULT NULL,
  `fiscal_power` int DEFAULT NULL,
  `fuel_type` varchar(10) DEFAULT NULL,
  `can_drive` varchar(10) DEFAULT NULL,
  `kart_owner_insured` varchar(10) DEFAULT NULL,
  `carries_flammable_material` enum('Yes','No') DEFAULT NULL,
  `with_trailer` enum('Yes','No') DEFAULT NULL,
  `trailer_power` int DEFAULT NULL,
  `num_seats` int DEFAULT NULL,
  `tonnage_payload` int DEFAULT NULL,
  `habitual_driving_zone` varchar(24) DEFAULT NULL,
  `tpv_type` varchar(10) DEFAULT NULL,
  `vehicle_auto_ecole_type` varchar(10) DEFAULT NULL,
  `moto_type` varchar(10) DEFAULT NULL,
  `paid` varchar(5) DEFAULT NULL,
  `special_category_type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`num_vehicle`),
  KEY `category_code` (`category_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `vehicles`
--

INSERT INTO `vehicles` (`num_vehicle`, `category_code`, `insurance_duration`, `fiscal_power`, `fuel_type`, `can_drive`, `kart_owner_insured`, `carries_flammable_material`, `with_trailer`, `trailer_power`, `num_seats`, `tonnage_payload`, `habitual_driving_zone`, `tpv_type`, `vehicle_auto_ecole_type`, `moto_type`, `paid`, `special_category_type`) VALUES
('LM 1245 RB', 220, 0, 14, 'Essence', NULL, NULL, NULL, NULL, 0, 0, 0, 'zone rouge', NULL, NULL, NULL, 'unpai', NULL),
('LM 1545 RB', 220, 0, 14, 'Essence', NULL, NULL, NULL, NULL, 0, 0, 0, 'zone rouge', NULL, NULL, NULL, 'unpai', NULL),
('BD 3602 RB', 250, 0, 12, 'Electric', NULL, NULL, NULL, NULL, 0, 0, 0, 'zone rouge', NULL, NULL, 'Cyclomoteu', 'unpai', NULL),
('AS 2585 RB', 260, 0, 45, 'Essence', NULL, NULL, NULL, NULL, 0, 0, 0, 'zone rouge', NULL, NULL, NULL, 'unpai', NULL),
('AS 2586 RB', 220, 0, 45, 'Essence', NULL, NULL, NULL, NULL, 0, 0, 0, 'zone rouge', NULL, NULL, NULL, 'unpai', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
