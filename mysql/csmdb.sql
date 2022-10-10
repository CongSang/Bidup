-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: csmdb
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auction`
--

DROP TABLE IF EXISTS `auction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `starting_price` decimal(10,0) NOT NULL,
  `auction_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `hashtag` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint DEFAULT '1',
  `mail_to` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `auction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auction`
--

LOCK TABLES `auction` WRITE;
/*!40000 ALTER TABLE `auction` DISABLE KEYS */;
INSERT INTO `auction` VALUES (1,'Lên cho anh em chiếc giày siêu cấp #sharinghope','https://res.cloudinary.com/dynupxxry/image/upload/v1657817663/cld-sample-5.jpg',1600000,'2022-07-29 08:00:00','2022-08-01 00:00:00','#sharinghope','abcd',0,0),(2,'Quả núi siêu to khổng lồ #sharinghope','https://res.cloudinary.com/dynupxxry/image/upload/v1657817662/cld-sample-2.jpg',2000000,'2022-07-29 00:09:00','2022-08-04 00:00:00','#sharinghope','abcde',1,0),(3,' hehe #love test','https://res.cloudinary.com/dynupxxry/image/upload/v1657817661/cld-sample.jpg',7000000,'2022-07-30 00:09:00','2022-08-04 00:00:00','#love','abcd',0,1),(16,'Dau gia thu   #sharinghope','https://res.cloudinary.com/quoc2401/image/upload/v1660221929/tybdohzzzrgz9t0515q2.jpg?public_id=tybdohzzzrgz9t0515q2',2000000,'2022-08-15 09:20:46','2022-08-27 07:45:00','#sharinghope ','abcd',0,1),(17,'đấu giá máy tính <3  #love','https://res.cloudinary.com/quoc2401/image/upload/v1660530993/itvjefs3eztpxmv0spni.jpg?public_id=itvjefs3eztpxmv0spni',20000000,'2022-08-15 09:45:08','2022-09-30 00:40:00','#love ','d2a12b78-3243-4d57-af9f-c4a3b1205ed9',1,0),(18,'dau gia moi','https://res.cloudinary.com/quoc2401/image/upload/v1660957999/iwd6mdep2eqdpgfhgctu.jpg?public_id=iwd6mdep2eqdpgfhgctu',5000000,'2022-08-20 08:13:22','2022-08-29 00:17:00','','478981a5-0c61-49c4-abf0-f068ec988db2',1,0),(19,'minh la admin','https://res.cloudinary.com/quoc2401/image/upload/v1662013210/op1glp6qbkjtpkefrlfe.png?public_id=op1glp6qbkjtpkefrlfe',12200000,'2022-09-01 13:20:12','2022-09-30 06:23:00','','abcde',1,0);
/*!40000 ALTER TABLE `auction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bid`
--

DROP TABLE IF EXISTS `bid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bid` (
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `auction_id` int NOT NULL,
  `money` decimal(10,0) NOT NULL,
  `message` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bid_date` datetime NOT NULL,
  `is_winner` tinyint DEFAULT '0',
  PRIMARY KEY (`user_id`,`auction_id`),
  KEY `fk_bid_auction_idx` (`auction_id`),
  CONSTRAINT `bid_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_bid_auction` FOREIGN KEY (`auction_id`) REFERENCES `auction` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bid`
--

LOCK TABLES `bid` WRITE;
/*!40000 ALTER TABLE `bid` DISABLE KEYS */;
INSERT INTO `bid` VALUES ('23924f0c-cf04-437e-a6dd-ec253b3e8e79',19,13000000,'','2022-09-01 14:13:48',0),('abcd',17,20000000,'','2022-09-01 10:21:01',0),('abcd',18,6000000,'','2022-08-28 12:34:06',1),('abcde',1,10000000,'','2022-07-31 22:36:35',0),('abcde',3,8000000,'','2022-08-03 23:36:18',1),('abcde',16,2500000,'','2022-08-15 09:15:00',1),('abcdef',2,2500000,'','2022-08-01 20:32:38',1);
/*!40000 ALTER TABLE `bid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_id` int DEFAULT NULL,
  `comment_date` datetime NOT NULL,
  `parent_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comment_post_idx` (`post_id`),
  KEY `comment_ibfk_1` (`user_id`),
  KEY `fk_commentId_comment_idx` (`parent_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_comment_post` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_commentId_comment` FOREIGN KEY (`parent_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=162 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (93,'12','23924f0c-cf04-437e-a6dd-ec253b3e8e79',2,'2022-08-19 16:08:29',NULL),(111,'nice','abcd',50,'2022-08-19 16:40:36',NULL),(112,'nice','abcd',NULL,'2022-08-28 18:20:28',111),(120,'nice','abcd',51,'2022-08-28 18:13:49',NULL),(121,'nice','abcd',NULL,'2022-09-01 10:40:29',120),(122,'nice','abcd',36,'2022-08-19 16:44:07',NULL),(131,'ok','abcde',37,'2022-09-01 13:14:13',NULL),(138,'ok','d2a12b78-3243-4d57-af9f-c4a3b1205ed9',NULL,'2022-08-19 18:06:36',120),(140,'ok','d2a12b78-3243-4d57-af9f-c4a3b1205ed9',50,'2022-08-19 18:16:10',NULL),(141,'ok','d2a12b78-3243-4d57-af9f-c4a3b1205ed9',NULL,'2022-08-19 18:16:16',140),(142,'nice','d2a12b78-3243-4d57-af9f-c4a3b1205ed9',NULL,'2022-08-19 18:16:23',111),(146,'nice','abcde',NULL,'2022-08-19 18:21:55',120),(148,'ok','478981a5-0c61-49c4-abf0-f068ec988db2',51,'2022-08-20 07:22:53',NULL),(149,'nice','478981a5-0c61-49c4-abf0-f068ec988db2',NULL,'2022-08-20 07:23:00',148),(150,'haha','478981a5-0c61-49c4-abf0-f068ec988db2',NULL,'2022-08-20 07:23:21',93),(151,'nice','abcd',NULL,'2022-08-28 12:30:57',138),(153,'ok','abcd',55,'2022-09-02 22:54:08',NULL),(154,'ok','abcde',NULL,'2022-08-30 20:15:52',153),(156,'nice','23924f0c-cf04-437e-a6dd-ec253b3e8e79',51,'2022-09-01 14:12:27',NULL),(158,'nice','abcde',56,'2022-09-01 14:28:56',NULL),(159,'ok','abcd',NULL,'2022-09-02 23:02:13',154),(161,'dep qua','abcd',NULL,'2022-09-02 23:09:50',154);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_notif`
--

DROP TABLE IF EXISTS `comment_notif`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_notif` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment_id` int NOT NULL,
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('REPLY_COMMENT','REACT_COMMENT') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comment_notif_comment_id_idx` (`comment_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comment_notif_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_comment_notif_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_notif`
--

LOCK TABLES `comment_notif` WRITE;
/*!40000 ALTER TABLE `comment_notif` DISABLE KEYS */;
INSERT INTO `comment_notif` VALUES (21,120,'abcd','REACT_COMMENT',1),(22,121,'abcd','REACT_COMMENT',0),(23,111,'abcd','REACT_COMMENT',1),(25,120,'abcd','REPLY_COMMENT',1),(26,111,'abcd','REPLY_COMMENT',1),(29,93,'23924f0c-cf04-437e-a6dd-ec253b3e8e79','REPLY_COMMENT',0),(30,122,'abcd','REACT_COMMENT',1),(31,150,'478981a5-0c61-49c4-abf0-f068ec988db2','REACT_COMMENT',1),(32,138,'d2a12b78-3243-4d57-af9f-c4a3b1205ed9','REACT_COMMENT',1),(34,138,'d2a12b78-3243-4d57-af9f-c4a3b1205ed9','REPLY_COMMENT',1),(37,142,'d2a12b78-3243-4d57-af9f-c4a3b1205ed9','REACT_COMMENT',0),(38,153,'abcd','REPLY_COMMENT',1),(39,112,'abcd','REACT_COMMENT',1),(45,149,'478981a5-0c61-49c4-abf0-f068ec988db2','REACT_COMMENT',0),(46,158,'abcde','REACT_COMMENT',0),(47,154,'abcde','REPLY_COMMENT',0),(48,158,'abcde','REPLY_COMMENT',0),(49,154,'abcde','REACT_COMMENT',0);
/*!40000 ALTER TABLE `comment_notif` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `follower_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `followed_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`follower_id`,`followed_id`),
  KEY `follow_ibfk_2` (`followed_id`),
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`followed_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES ('abcd','23924f0c-cf04-437e-a6dd-ec253b3e8e79'),('abcde','23924f0c-cf04-437e-a6dd-ec253b3e8e79'),('abcd','478981a5-0c61-49c4-abf0-f068ec988db2'),('abcde','478981a5-0c61-49c4-abf0-f068ec988db2'),('23924f0c-cf04-437e-a6dd-ec253b3e8e79','abcd'),('abcde','abcd'),('abcd','abcdef');
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `posted_date` datetime NOT NULL,
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint DEFAULT '1',
  `hashtag` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_ibfk_1` (`user_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Bữa sáng của tôi #sharinghope #test','https://res.cloudinary.com/dynupxxry/image/upload/v1657817663/cld-sample-4.jpg','2022-07-26 07:00:00','abcd',1,'#sharinghope #test '),(2,'Chuyến đi đầu tiên của tôi  #sharinghope','https://res.cloudinary.com/dynupxxry/image/upload/v1657817637/sample.jpg','2022-08-10 00:45:42','abcd',1,'#sharinghope#Test1 #Test2 '),(36,'Thử đăng bài #test','https://res.cloudinary.com/quoc2401/image/upload/v1659862909/rota7wbbyuhclwa3tvry.jpg?public_id=rota7wbbyuhclwa3tvry','2022-08-07 16:01:50','abcde',1,'#test '),(37,'dep ha #love','https://res.cloudinary.com/quoc2401/image/upload/v1659966642/exarcc2xsetmvlnqigug.jpg?public_id=exarcc2xsetmvlnqigug','2022-08-08 20:50:45','abcde',1,'#love '),(50,'dep khong #beauty','https://res.cloudinary.com/quoc2401/image/upload/v1660531040/fzqctr92wxwvkd2yxj7t.jpg?public_id=fzqctr92wxwvkd2yxj7t','2022-08-15 09:37:22','d2a12b78-3243-4d57-af9f-c4a3b1205ed9',1,'#beauty '),(51,'hello ','https://res.cloudinary.com/quoc2401/image/upload/v1660532675/jnsb7b6gttrzxnhtqtd5.jpg?public_id=jnsb7b6gttrzxnhtqtd5','2022-08-15 10:04:38','23924f0c-cf04-437e-a6dd-ec253b3e8e79',1,''),(55,'hello world 222\n\n#sharinghope','https://res.cloudinary.com/quoc2401/image/upload/v1660966504/yjphjcd9r1lbbd1js42p.jpg?public_id=yjphjcd9r1lbbd1js42p','2022-09-01 11:20:51','abcd',1,'#sharinghope '),(56,'chao xìn #hello','https://res.cloudinary.com/quoc2401/image/upload/v1662017293/k3kuhmnoltt5vy8k3lrc.jpg?public_id=k3kuhmnoltt5vy8k3lrc','2022-09-01 14:28:15','abcde',1,'#hello ');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_notif`
--

DROP TABLE IF EXISTS `post_notif`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_notif` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('COMMENT_POST','REACT_POST','JOIN_AUCTION') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint DEFAULT '0',
  `auction_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_postNotif_postId_idx` (`post_id`),
  KEY `post_notif_ibfk_1` (`user_id`),
  KEY `fk_postNotif_auctionId_idx` (`auction_id`),
  CONSTRAINT `fk_postNotif_auctionId` FOREIGN KEY (`auction_id`) REFERENCES `auction` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_postNotif_postId` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `post_notif_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_notif`
--

LOCK TABLES `post_notif` WRITE;
/*!40000 ALTER TABLE `post_notif` DISABLE KEYS */;
INSERT INTO `post_notif` VALUES (2,1,'abcd','COMMENT_POST',1,NULL),(3,2,'abcd','COMMENT_POST',1,NULL),(4,1,'abcd','REACT_POST',1,NULL),(7,2,'abcd','REACT_POST',1,NULL),(8,36,'abcde','COMMENT_POST',1,NULL),(9,36,'abcde','REACT_POST',1,NULL),(12,37,'abcde','REACT_POST',0,NULL),(13,37,'abcde','COMMENT_POST',0,NULL),(14,NULL,'abcd','JOIN_AUCTION',1,16),(18,50,'d2a12b78-3243-4d57-af9f-c4a3b1205ed9','REACT_POST',0,NULL),(19,NULL,'d2a12b78-3243-4d57-af9f-c4a3b1205ed9','JOIN_AUCTION',0,17),(21,51,'23924f0c-cf04-437e-a6dd-ec253b3e8e79','REACT_POST',0,NULL),(22,51,'23924f0c-cf04-437e-a6dd-ec253b3e8e79','COMMENT_POST',0,NULL),(23,50,'d2a12b78-3243-4d57-af9f-c4a3b1205ed9','COMMENT_POST',1,NULL),(25,NULL,'478981a5-0c61-49c4-abf0-f068ec988db2','JOIN_AUCTION',1,18),(26,55,'abcd','REACT_POST',1,NULL),(27,NULL,'abcde','JOIN_AUCTION',0,19),(28,56,'abcde','REACT_POST',0,NULL);
/*!40000 ALTER TABLE `post_notif` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `react`
--

DROP TABLE IF EXISTS `react`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `react` (
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_id` int NOT NULL,
  `type` smallint DEFAULT '1',
  `created_date` datetime NOT NULL,
  PRIMARY KEY (`user_id`,`post_id`),
  KEY `fk_react_post_idx` (`post_id`),
  CONSTRAINT `fk_react_post` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `react_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `react`
--

LOCK TABLES `react` WRITE;
/*!40000 ALTER TABLE `react` DISABLE KEYS */;
INSERT INTO `react` VALUES ('23924f0c-cf04-437e-a6dd-ec253b3e8e79',1,1,'2022-09-01 14:14:09'),('23924f0c-cf04-437e-a6dd-ec253b3e8e79',2,1,'2022-08-19 16:01:03'),('23924f0c-cf04-437e-a6dd-ec253b3e8e79',36,1,'2022-09-01 14:14:34'),('23924f0c-cf04-437e-a6dd-ec253b3e8e79',37,1,'2022-09-01 14:12:10'),('23924f0c-cf04-437e-a6dd-ec253b3e8e79',50,1,'2022-08-15 10:04:01'),('23924f0c-cf04-437e-a6dd-ec253b3e8e79',51,1,'2022-08-15 10:04:46'),('23924f0c-cf04-437e-a6dd-ec253b3e8e79',55,1,'2022-09-01 14:11:35'),('478981a5-0c61-49c4-abf0-f068ec988db2',2,1,'2022-08-19 01:01:26'),('478981a5-0c61-49c4-abf0-f068ec988db2',36,1,'2022-08-20 09:26:32'),('478981a5-0c61-49c4-abf0-f068ec988db2',37,1,'2022-08-20 07:54:10'),('478981a5-0c61-49c4-abf0-f068ec988db2',50,1,'2022-08-20 07:23:10'),('478981a5-0c61-49c4-abf0-f068ec988db2',51,1,'2022-08-17 18:48:08'),('abcd',1,1,'2022-08-06 07:00:00'),('abcd',2,1,'2022-08-12 15:45:16'),('abcd',36,1,'2022-08-08 09:18:24'),('abcd',37,1,'2022-08-09 19:59:53'),('abcd',50,1,'2022-09-01 10:27:33'),('abcd',51,1,'2022-09-01 11:25:45'),('abcd',55,1,'2022-09-01 00:02:05'),('abcd',56,1,'2022-09-02 23:01:49'),('abcde',1,1,'2022-07-26 07:00:00'),('abcde',2,1,'2022-08-11 13:07:29'),('abcde',36,1,'2022-08-09 18:15:44'),('abcde',37,1,'2022-08-09 18:38:55'),('abcde',50,1,'2022-08-30 21:07:52'),('abcde',51,1,'2022-08-30 20:16:47'),('abcde',55,1,'2022-08-30 20:47:59'),('abcde',56,1,'2022-09-01 14:28:25'),('abcdef',1,1,'2022-08-05 07:00:00'),('d2a12b78-3243-4d57-af9f-c4a3b1205ed9',1,1,'2022-08-15 09:35:26'),('d2a12b78-3243-4d57-af9f-c4a3b1205ed9',2,1,'2022-08-15 09:35:17'),('d2a12b78-3243-4d57-af9f-c4a3b1205ed9',36,1,'2022-08-15 09:35:20'),('d2a12b78-3243-4d57-af9f-c4a3b1205ed9',37,1,'2022-08-15 09:35:19'),('d2a12b78-3243-4d57-af9f-c4a3b1205ed9',50,1,'2022-08-29 22:01:47'),('d2a12b78-3243-4d57-af9f-c4a3b1205ed9',51,1,'2022-08-15 10:33:19');
/*!40000 ALTER TABLE `react` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `react_comment`
--

DROP TABLE IF EXISTS `react_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `react_comment` (
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_id` int NOT NULL,
  `type` smallint DEFAULT '1',
  `created_date` datetime NOT NULL,
  PRIMARY KEY (`user_id`,`comment_id`),
  KEY `fk_react_comment_comment_id_idx` (`comment_id`),
  CONSTRAINT `fk_react_comment_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE,
  CONSTRAINT `react_comment_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `react_comment`
--

LOCK TABLES `react_comment` WRITE;
/*!40000 ALTER TABLE `react_comment` DISABLE KEYS */;
INSERT INTO `react_comment` VALUES ('23924f0c-cf04-437e-a6dd-ec253b3e8e79',122,1,'2022-09-01 14:14:43'),('478981a5-0c61-49c4-abf0-f068ec988db2',122,1,'2022-08-20 09:26:37'),('abcd',111,1,'2022-08-23 23:31:19'),('abcd',112,1,'2022-09-01 11:22:44'),('abcd',121,1,'2022-08-31 23:17:38'),('abcd',138,1,'2022-08-23 18:28:44'),('abcd',142,1,'2022-08-29 22:00:47'),('abcd',149,1,'2022-09-01 11:12:13'),('abcd',150,1,'2022-08-23 18:26:06'),('abcd',153,1,'2022-08-28 18:26:17'),('abcd',154,1,'2022-09-02 23:08:04'),('abcd',158,1,'2022-09-02 23:03:07'),('abcde',111,1,'2022-08-19 16:47:22'),('abcde',112,1,'2022-08-30 21:08:04'),('abcde',120,1,'2022-08-19 16:46:50'),('abcde',142,1,'2022-08-30 21:08:07'),('abcde',158,1,'2022-09-01 14:29:00');
/*!40000 ALTER TABLE `react_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_auction`
--

DROP TABLE IF EXISTS `report_auction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_auction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `auction_id` int NOT NULL,
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('IMAGE','CONTENT','SPAM') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reason` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_solve` tinyint DEFAULT '0',
  `reported_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reportAuction_auctionId_idx` (`auction_id`),
  KEY `fk_reportAuction_userId_idx` (`user_id`),
  CONSTRAINT `fk_reportAuction_auctionId` FOREIGN KEY (`auction_id`) REFERENCES `auction` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reportAuction_userId` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_auction`
--

LOCK TABLES `report_auction` WRITE;
/*!40000 ALTER TABLE `report_auction` DISABLE KEYS */;
INSERT INTO `report_auction` VALUES (21,16,'abcde','IMAGE','Ảnh bài viết không phù hợp',0,'2022-08-15 17:15:41'),(22,17,'abcd','CONTENT','Nội dung bài viết không phù hợp',0,'2022-08-31 23:03:47');
/*!40000 ALTER TABLE `report_auction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_post`
--

DROP TABLE IF EXISTS `report_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('IMAGE','CONTENT','SPAM') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reason` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_solve` tinyint DEFAULT '0',
  `reported_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reportPost_userId_idx` (`user_id`),
  KEY `fk_reportPost_postId_idx` (`post_id`),
  CONSTRAINT `fk_reportPost_postId` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reportPost_userId` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_post`
--

LOCK TABLES `report_post` WRITE;
/*!40000 ALTER TABLE `report_post` DISABLE KEYS */;
INSERT INTO `report_post` VALUES (30,51,'abcde','CONTENT','Nội dung bài viết không phù hợp',0,'2022-08-15 16:36:32'),(31,2,'23924f0c-cf04-437e-a6dd-ec253b3e8e79','CONTENT','Nội dung bài viết không phù hợp',0,'2022-09-01 14:11:58'),(32,56,'abcd','SPAM','Spam',0,'2022-09-02 23:01:56');
/*!40000 ALTER TABLE `report_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_user`
--

DROP TABLE IF EXISTS `report_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reported_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('PAY','WORDS') COLLATE utf8_unicode_ci DEFAULT NULL,
  `reason` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `is_solve` tinyint DEFAULT '0',
  `reported_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reportUser_userId_idx` (`user_id`),
  KEY `fk_reportUser_user_idx` (`reported_user`),
  CONSTRAINT `fk_reportUser_user` FOREIGN KEY (`reported_user`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reportUser_userId` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_user`
--

LOCK TABLES `report_user` WRITE;
/*!40000 ALTER TABLE `report_user` DISABLE KEYS */;
INSERT INTO `report_user` VALUES (6,'abcd','abcde','PAY','Đấu giá nhưng không thanh toán',0,'2022-08-13 22:30:09');
/*!40000 ALTER TABLE `report_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthdate` date NOT NULL,
  `address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hometown` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_date` date NOT NULL,
  `avatar` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'https://res.cloudinary.com/dynupxxry/image/upload/v1660532211/non-avatar_nw91c3.png',
  `user_role` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `active` tinyint DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('23924f0c-cf04-437e-a6dd-ec253b3e8e79','honguyencongsang.dev@gmail.com','$2a$10$u628QTNh2zMlWH9EKlU19O.1VcBZhltwGgl4GlS.r7tEvWqSnn7ye','Dep trai','Sang','2011-02-25','','TP.HCM','','0823262356','2022-08-15','https://res.cloudinary.com/quoc2401/image/upload/v1660532600/hsckaamm0wvugwjuopzg.jpg?public_id=hsckaamm0wvugwjuopzg','ROLE_USER',1),('478981a5-0c61-49c4-abf0-f068ec988db2','trucnguyen.nt98@gmail.com','$2a$10$z3wJyKgJJatpiumsBC3FrOf84oBV9bBDcH1CTV/uPHsFUIEtfQcWm','Truc Nguyen','Nguyen Thi','2001-04-26','TPHCM','TP.HCM','Sinh vien','0933825723','2022-08-15','https://res.cloudinary.com/quoc2401/image/upload/v1661785072/jpglhjoznqawbanpe6mz.jpg?public_id=jpglhjoznqawbanpe6mz','ROLE_USER',1),('abcd','honguyencongsang723@gmail.com','$2a$10$5X9k5N1sTc1/CjVH5XJoje3QMYijH3ETpgkox00R0MdPaJPPrf7wO','Sang','Cong','2001-08-15','TPHCM','','Sinh vien','0823262356','2022-07-25','https://res.cloudinary.com/quoc2401/image/upload/v1662006120/pp7demog1zcrcqeoeqqp.jpg?public_id=pp7demog1zcrcqeoeqqp','ROLE_USER',1),('abcde','1951052169sang@ou.edu.vn','$2a$10$5X9k5N1sTc1/CjVH5XJoje3QMYijH3ETpgkox00R0MdPaJPPrf7wO','Sang','Hồ Nguyễn','2001-08-15','79/43 BBTT','Nghệ An','Sinh viên','0823262356','2022-07-25','https://res.cloudinary.com/dynupxxry/image/upload/v1657817662/cld-sample-2.jpg','ROLE_ADMIN',1),('abcdef','abc@gmail.com','$2a$10$5X9k5N1sTc1/CjVH5XJoje3QMYijH3ETpgkox00R0MdPaJPPrf7wO','Quốc','Dương Kim','2001-01-24','bla bla','bla bla','Sinh viên','0123456789','2022-07-31','https://res.cloudinary.com/dynupxxry/image/upload/v1657817663/cld-sample-5.jpg','ROLE_USER',1),('d2a12b78-3243-4d57-af9f-c4a3b1205ed9','conghoangho1802@gmail.com','$2a$10$Vo6dFaxP.NSSt2lr3zssoe7B9dexsb3TvdJXDYO2yBJUCmhxD3GIq','Công Hoàng','Hồ','2005-02-12','','TP.HCM','','0823262356','2022-08-12','https://res.cloudinary.com/quoc2401/image/upload/v1660320178/tlcmurkhjrrplqyiroso.jpg?public_id=tlcmurkhjrrplqyiroso','ROLE_USER',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-02 23:39:17
