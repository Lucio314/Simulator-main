-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 25 oct. 2023 à 19:17
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

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

CREATE TABLE `categories` (
  `category_code` int(11) NOT NULL,
  `designation` varchar(48) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories`
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
-- Structure de la table `drivers`
--

CREATE TABLE `drivers` (
  `driver_id` int(11) NOT NULL,
  `driver_name` varchar(24) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `license_type` varchar(10) DEFAULT NULL,
  `license_issue_date` date DEFAULT NULL,
  `socio_professional_status` varchar(24) DEFAULT NULL,
  `subscriber_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `drivers`
--

INSERT INTO `drivers` (`driver_id`, `driver_name`, `birth_date`, `license_type`, `license_issue_date`, `socio_professional_status`, `subscriber_id`) VALUES
(1, 'mlui', '2001-09-28', 'C', '2022-10-11', 'Statut1', 1),
(2, 'mlui', '2001-09-28', 'C', '2022-10-11', 'Statut1', 1),
(3, 'mlui', '2001-09-28', 'C', '2022-10-11', 'Statut1', 1),
(4, 'mlui', '2001-09-28', 'C', '2022-10-11', 'Statut1', 1),
(5, 'mlui', '2001-09-28', 'C', '2022-10-11', 'Statut1', 1),
(6, 'AAbb', '1985-12-12', 'A1, A', '2000-12-12', 'Statut1', 1),
(7, 'AAbb', '1985-12-12', 'A1, A', '2000-12-12', 'Statut1', 1),
(8, 'AAbb', '1985-12-12', 'A1, A', '2000-12-12', 'Statut1', 1),
(9, 'mak', '1999-09-28', 'D', '2022-10-07', 'Statut1', 1),
(10, 'maNAN', '1956-09-10', 'D', '2005-10-07', 'Statut1', 1),
(11, 'mak', '2001-10-02', 'B', '2021-12-12', 'Statut1', 3),
(12, 'AKASHI', '2004-04-04', 'A,B,C', '2022-12-12', 'Statut1', 1),
(13, 'mak', '2003-08-08', 'B', '2019-05-12', 'Statut1', 1),
(14, 'Aram', '1969-04-12', 'B', '2001-11-05', 'Statut1', 1),
(15, 'seijuro', '1958-12-12', 'D', '2001-12-12', 'Statut1', 1),
(16, 'seijuro', '1958-12-12', 'D', '2001-12-12', 'Statut1', 1),
(17, 'ELSA', '1965-10-12', 'D', '2001-12-12', 'Statut1', 1);

-- --------------------------------------------------------

--
-- Structure de la table `simulations`
--

CREATE TABLE `simulations` (
  `simulation_id` int(11) NOT NULL,
  `simulation_date` date DEFAULT NULL,
  `prime` int(11) DEFAULT NULL,
  `driver_id` int(11) DEFAULT NULL,
  `num_vehicle` varchar(10) DEFAULT NULL,
  `subscriber_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `simulations`
--

INSERT INTO `simulations` (`simulation_id`, `simulation_date`, `prime`, `driver_id`, `num_vehicle`, `subscriber_id`) VALUES
(1, '2023-10-24', 46721, 8, 'BD 1203 RB', 1),
(2, '2023-10-24', 114137, 9, 'BA 5602 RT', 1),
(3, '2023-10-24', 152315, 10, 'CD 5602 RB', 1),
(4, '2023-10-24', 77396, 11, 'AM 2004 RB', 3),
(5, '2023-10-25', 58401, 12, 'AZ 2104 RB', 1),
(6, '2023-10-25', 128387, 13, 'AS 8001 RB', 1),
(7, '2023-10-25', 216667, 14, 'AM 3004 RB', 1),
(8, '2023-10-25', 0, 15, 'AS 1415 RB', 1),
(9, '2023-10-25', 71082, 17, 'AL 1455 RB', 1);

-- --------------------------------------------------------

--
-- Structure de la table `subscribers`
--

CREATE TABLE `subscribers` (
  `subscriber_id` int(11) NOT NULL,
  `login` varchar(24) NOT NULL,
  `email` varchar(48) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `subscribers`
--

INSERT INTO `subscribers` (`subscriber_id`, `login`, `email`, `password`) VALUES
(1, 'lucio31415', 'lucio31415@gmail.com', '$2y$10$jbhl9ytJfrOcmUpNKAQBg./GBmRlVpoBjLsX1QYhi8y3sjAaYIvAK'),
(2, 'marvin', 'marvin@marvin.fr', '$2y$10$Fq1A5wrDEvLHdBafr3Im3.L6NZXlWQz4O1uxtq5zhYDZW9XpdcD7K'),
(3, 'makloud', 'mak@mak.fr', '$2y$10$/jpeEuvvb66MpJoe1C0f2e2iAkSTYFmUASU/eBieft/hUrFsJfBcW');

-- --------------------------------------------------------

--
-- Structure de la table `vehicles`
--

CREATE TABLE `vehicles` (
  `num_vehicle` varchar(10) NOT NULL,
  `category_code` int(11) DEFAULT NULL,
  `insurance_duration` int(11) DEFAULT NULL,
  `fiscal_power` int(11) DEFAULT NULL,
  `fuel_type` varchar(10) DEFAULT NULL,
  `can_drive` varchar(10) DEFAULT NULL,
  `kart_owner_insured` varchar(10) DEFAULT NULL,
  `carries_flammable_material` enum('Yes','No') DEFAULT NULL,
  `with_trailer` enum('Yes','No') DEFAULT NULL,
  `trailer_power` int(11) DEFAULT NULL,
  `num_seats` int(11) DEFAULT NULL,
  `tonnage_payload` int(11) DEFAULT NULL,
  `habitual_driving_zone` varchar(24) DEFAULT NULL,
  `tpv_type` varchar(10) DEFAULT NULL,
  `vehicle_auto_ecole_type` varchar(10) DEFAULT NULL,
  `moto_type` varchar(10) DEFAULT NULL,
  `paid` varchar(5) DEFAULT NULL,
  `special_category_type` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `vehicles`
--

INSERT INTO `vehicles` (`num_vehicle`, `category_code`, `insurance_duration`, `fiscal_power`, `fuel_type`, `can_drive`, `kart_owner_insured`, `carries_flammable_material`, `with_trailer`, `trailer_power`, `num_seats`, `tonnage_payload`, `habitual_driving_zone`, `tpv_type`, `vehicle_auto_ecole_type`, `moto_type`, `paid`, `special_category_type`) VALUES
('AL 1455 RB', 240, 1, 2, 'Essence', NULL, NULL, NULL, NULL, 0, 2, 0, 'zone rouge', 'Taxis', NULL, NULL, 'unpai', NULL),
('AM 2004 RB', NULL, 0, 19, 'Electric', NULL, NULL, NULL, NULL, 0, 0, 0, 'zone rouge', NULL, NULL, NULL, 'unpai', NULL),
('AM 3004 RB', 280, 0, 19, 'Essence', NULL, NULL, NULL, NULL, 0, 0, 0, 'zone verte', NULL, 'Transport ', NULL, 'unpai', NULL),
('AM 6250 RB', 290, 0, 16, 'Electric', NULL, NULL, NULL, NULL, 0, 0, 0, 'zone rouge', NULL, NULL, NULL, 'unpai', NULL),
('AS 1415 RB', 240, 0, 9, 'Diesel', NULL, NULL, NULL, NULL, 0, 2, 0, 'zone rouge', 'Taxis', NULL, NULL, 'unpai', NULL),
('AS 8001 RB', 240, 0, 4, 'Essence', NULL, NULL, NULL, NULL, 0, 5, 0, 'zone rouge', 'Taxis', NULL, NULL, 'unpai', NULL),
('az 2104 RB', NULL, 0, 12, 'Essence', NULL, NULL, NULL, NULL, 0, 0, 0, 'zone verte', NULL, NULL, NULL, 'unpai', NULL),
('BA 5602 RT', NULL, 0, 11, 'Essence', NULL, NULL, NULL, NULL, 0, 0, 0, 'zone rouge', NULL, NULL, NULL, 'unpai', NULL),
('BD 1203 RB', 250, 0, 25, 'Electric', NULL, NULL, NULL, NULL, 0, 0, 0, 'zone verte', NULL, NULL, 'Motocyclet', 'unpai', NULL),
('BD 1213 RB', 250, 0, 25, 'Electric', NULL, NULL, NULL, NULL, 0, 0, 0, 'zone verte', NULL, NULL, 'Motocyclet', 'unpai', NULL),
('BM 6240 RB', 290, 0, 16, 'Electric', NULL, NULL, NULL, NULL, 0, 0, 0, 'zone rouge', NULL, NULL, NULL, 'unpai', NULL),
('CD 5602 RB', 220, 0, 89, 'Essence', NULL, NULL, NULL, NULL, 0, 0, 0, 'zone rouge', NULL, NULL, NULL, 'unpai', NULL),
('CD 5964 RB', 230, 0, 16, 'Electric', NULL, NULL, 'Yes', NULL, 0, 0, 12, 'zone rouge', NULL, NULL, NULL, 'unpai', NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_code`);

--
-- Index pour la table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`driver_id`),
  ADD KEY `subscriber_id` (`subscriber_id`);

--
-- Index pour la table `simulations`
--
ALTER TABLE `simulations`
  ADD PRIMARY KEY (`simulation_id`),
  ADD KEY `driver_id` (`driver_id`),
  ADD KEY `num_vehicle` (`num_vehicle`),
  ADD KEY `subscriber_id` (`subscriber_id`);

--
-- Index pour la table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`subscriber_id`);

--
-- Index pour la table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`num_vehicle`),
  ADD KEY `category_code` (`category_code`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_code` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=292;

--
-- AUTO_INCREMENT pour la table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `driver_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `simulations`
--
ALTER TABLE `simulations`
  MODIFY `simulation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `subscriber_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `drivers`
--
ALTER TABLE `drivers`
  ADD CONSTRAINT `drivers_ibfk_1` FOREIGN KEY (`subscriber_id`) REFERENCES `subscribers` (`subscriber_id`);

--
-- Contraintes pour la table `simulations`
--
ALTER TABLE `simulations`
  ADD CONSTRAINT `simulations_ibfk_1` FOREIGN KEY (`driver_id`) REFERENCES `drivers` (`driver_id`),
  ADD CONSTRAINT `simulations_ibfk_2` FOREIGN KEY (`num_vehicle`) REFERENCES `vehicles` (`num_vehicle`),
  ADD CONSTRAINT `simulations_ibfk_3` FOREIGN KEY (`subscriber_id`) REFERENCES `subscribers` (`subscriber_id`);

--
-- Contraintes pour la table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`category_code`) REFERENCES `categories` (`category_code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
