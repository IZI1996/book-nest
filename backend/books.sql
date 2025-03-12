-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 11 mars 2025 à 15:33
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `books`
--

-- --------------------------------------------------------

--
-- Structure de la table `bookshelf`
--

CREATE TABLE `bookshelf` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `bookshelf`
--

INSERT INTO `bookshelf` (`id`, `title`, `author`, `year`, `type_id`, `created_at`, `image_url`) VALUES
(11, 'Atomic Habits:', ' James Clear', 2012, 6, '2025-03-11 02:19:21', 'images/40121378.jpg'),
(12, 'The Power of Habit', 'Charles Duhigg', 2017, 6, '2025-03-11 02:20:39', 'images/12609433.jpg'),
(13, 'The 5 AM Club', 'Robin S. Sharma', 2002, 6, '2025-03-11 02:21:32', 'images/pmMornig.jpg'),
(14, 'The Shallows', 'Nicholas Carr', 2005, 4, '2025-03-11 12:34:46', 'images/9778945.jpg'),
(15, 'Steve Jobs ', 'Walter Isaacson', 2015, 4, '2025-03-11 12:36:37', 'images/11084145.jpg'),
(16, 'Life 3.0', 'Max Tegmark', 2010, 4, '2025-03-11 12:39:33', 'images/images.jpg'),
(17, 'Why We Sleep:', ' Matthew Walker', 2009, 8, '2025-03-11 12:45:44', 'images/34466963.jpg'),
(18, 'How Not to Die', 'Michael Greger', 2003, 8, '2025-03-11 12:46:48', 'images/25663961.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `types`
--

INSERT INTO `types` (`id`, `name`) VALUES
(3, 'datatest'),
(4, 'Technology'),
(5, 'Fiction'),
(6, 'Self-Help'),
(7, 'Science'),
(8, 'Health'),
(9, 'Art');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_subscribed` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_subscribed`, `created_at`) VALUES
(1, '', '', '$2y$10$Z6t0rnsDSb15srSmM8TVquw95lpcGkC400C7z7L70tjWHSD/udafC', 0, '2025-03-11 02:43:33'),
(2, '', 'izikaoutar@gmail.com', '456', 0, '2025-03-11 02:43:33');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `bookshelf`
--
ALTER TABLE `bookshelf`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`);

--
-- Index pour la table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `bookshelf`
--
ALTER TABLE `bookshelf`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `bookshelf`
--
ALTER TABLE `bookshelf`
  ADD CONSTRAINT `bookshelf_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
