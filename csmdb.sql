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
INSERT INTO `auction` VALUES (1,'Lên cho anh em chiếc giày siêu cấp #sharinghope','https://res.cloudinary.com/dynupxxry/image/upload/v1657817663/cld-sample-5.jpg',1600000,'2022-07-29 08:00:00','2022-08-01 00:00:00','#sharinghope','abcd',0,0),(2,'Quả núi siêu to khổng lồ #sharinghope','https://res.cloudinary.com/dynupxxry/image/upload/v1657817662/cld-sample-2.jpg',2000000,'2022-07-29 00:09:00','2022-08-04 00:00:00','#sharinghope','abcde',1,0),(3,' hehe #love test','https://res.cloudinary.com/dynupxxry/image/upload/v1657817661/cld-sample.jpg',7000000,'2022-07-30 00:09:00','2022-08-04 00:00:00','#love','abcd',0,1),(18,'may tinh #sharing','https://res.cloudinary.com/quoc2401/image/upload/v1660230280/uhecagajiizg5ff9hbsk.jpg?public_id=uhecagajiizg5ff9hbsk',12000000,'2022-08-11 22:04:42','2022-08-27 11:05:00','#sharing ','94d5c1d7-fc48-4794-a060-2fac11b2fd0c',1,0),(19,'dau gia tranh ve mau sáp  #art','https://res.cloudinary.com/quoc2401/image/upload/v1660231172/ij5lothf7vfz3lv1utrg.jpg?public_id=ij5lothf7vfz3lv1utrg',2000000,'2022-08-11 22:20:24','2022-08-29 13:22:00','#art ','c5c1f7c4-1406-47b5-ba30-81bea725416d',1,0);
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
INSERT INTO `bid` VALUES ('abcd',19,3000000,'','2022-08-12 01:53:45',0),('abcde',1,10000000,'','2022-07-31 22:36:35',0),('abcde',3,8000000,'','2022-08-03 23:36:18',1),('abcde',19,6000000,'','2022-08-11 23:52:55',0),('abcdef',2,2500000,'','2022-08-01 20:32:38',1),('c5c1f7c4-1406-47b5-ba30-81bea725416d',18,15000000,'','2022-08-11 22:23:02',0);
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
  PRIMARY KEY (`id`),
  KEY `fk_comment_post_idx` (`post_id`),
  KEY `comment_ibfk_1` (`user_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_comment_post` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'like','abcde',1,'2022-07-27 00:00:00'),(3,'dep qua','abcdef',2,'2022-07-29 16:52:59'),(4,'dep qua','abcd',1,'2022-07-29 16:58:49'),(5,'ok','abcd',1,'2022-07-29 17:00:57'),(11,'haha','abcd',1,'2022-07-30 16:57:56'),(12,'ok','abcd',1,'2022-07-30 16:58:38'),(18,'ok','abcd',NULL,'2022-08-02 22:30:00'),(19,'hehe','abcd',NULL,'2022-08-02 22:30:16'),(20,'haha','abcd',NULL,'2022-08-02 22:30:36'),(21,'dep qua','abcd',NULL,'2022-08-02 22:30:44'),(22,'ok','abcd',NULL,'2022-08-02 22:50:27'),(25,'ok','abcd',NULL,'2022-08-02 23:16:43'),(26,'ok','abcd',1,'2022-08-03 18:55:46'),(34,'nice','abcd',36,'2022-08-07 16:31:43'),(35,'hay the','abcde',2,'2022-08-07 16:32:05'),(37,'dc','abcde',37,'2022-08-08 20:51:19'),(38,'nice too','abcde',36,'2022-08-09 18:15:54'),(41,'dep qua','abcd',1,'2022-08-11 00:35:14'),(42,'ok','abcd',1,'2022-08-11 00:35:17'),(43,'haha','abcd',1,'2022-08-11 00:35:21'),(44,'sang','abcd',1,'2022-08-11 00:35:26'),(45,'hehe','abcde',2,'2022-08-11 00:44:44'),(46,'dep qua','abcde',3,'2022-08-11 00:45:19'),(47,'nice','abcde',37,'2022-08-11 00:45:51'),(50,'ok','abcde',3,'2022-08-11 16:17:09'),(53,'test','abcd',37,'2022-08-11 16:44:27'),(55,'ok','abcd',2,'2022-08-11 16:58:06'),(56,'ok','abcd',37,'2022-08-11 16:58:49'),(58,'ok','abcd',3,'2022-08-11 17:01:09'),(59,'ok','abcd',3,'2022-08-11 17:01:40'),(60,'ok','abcd',3,'2022-08-11 17:02:05'),(61,'ok','abcd',3,'2022-08-11 20:54:58'),(63,'ok','c5c1f7c4-1406-47b5-ba30-81bea725416d',40,'2022-08-11 22:21:38');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Bữa sáng của tôi #sharinghope','https://res.cloudinary.com/dynupxxry/image/upload/v1657817663/cld-sample-4.jpg','2022-07-26 07:00:00','abcd',1,'#sharinghope '),(2,'Chuyến đi đầu tiên của tôi  #sharinghope','https://res.cloudinary.com/dynupxxry/image/upload/v1657817637/sample.jpg','2022-08-10 00:45:42','abcd',1,'#sharinghope '),(3,'Ngày mới  #love #sharinghope','https://res.cloudinary.com/dynupxxry/image/upload/v1657817662/cld-sample-3.jpg','2022-08-11 00:45:14','abcde',1,'#love #sharinghope '),(36,'Thử đăng bài #test','https://res.cloudinary.com/quoc2401/image/upload/v1659862909/rota7wbbyuhclwa3tvry.jpg?public_id=rota7wbbyuhclwa3tvry','2022-08-07 16:01:50','abcde',1,'#test '),(37,'dep ha #love','https://res.cloudinary.com/quoc2401/image/upload/v1659966642/exarcc2xsetmvlnqigug.jpg?public_id=exarcc2xsetmvlnqigug','2022-08-08 20:50:45','abcde',1,'#love '),(39,'thanh vien moi  #new','https://res.cloudinary.com/quoc2401/image/upload/v1660226816/wsl7gricl7rvkemonqth.jpg?public_id=wsl7gricl7rvkemonqth','2022-08-11 21:07:29','94d5c1d7-fc48-4794-a060-2fac11b2fd0c',1,'#new '),(40,'them bai viet #new','https://res.cloudinary.com/quoc2401/image/upload/v1660231285/m4glj0xwx3b16ox5yjkx.jpg?public_id=m4glj0xwx3b16ox5yjkx','2022-08-11 22:21:28','c5c1f7c4-1406-47b5-ba30-81bea725416d',1,'#new ');
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
  `auction_id` int DEFAULT NULL,
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('COMMENT_POST','REACT_POST','JOIN_AUCTION') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_postNotif_postId_idx` (`post_id`),
  KEY `post_notif_ibfk_1` (`user_id`),
  KEY `fk_postNotif_auctionId_idx` (`auction_id`),
  CONSTRAINT `fk_postNotif_auctionId` FOREIGN KEY (`auction_id`) REFERENCES `auction` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_postNotif_postId` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `post_notif_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_notif`
--

LOCK TABLES `post_notif` WRITE;
/*!40000 ALTER TABLE `post_notif` DISABLE KEYS */;
INSERT INTO `post_notif` VALUES (2,1,NULL,'abcd','COMMENT_POST',1),(3,2,NULL,'abcd','COMMENT_POST',1),(4,1,NULL,'abcd','REACT_POST',1),(7,2,NULL,'abcd','REACT_POST',1),(8,36,NULL,'abcde','COMMENT_POST',1),(9,36,NULL,'abcde','REACT_POST',1),(10,3,NULL,'abcde','REACT_POST',0),(11,3,NULL,'abcde','COMMENT_POST',0),(12,37,NULL,'abcde','REACT_POST',0),(13,37,NULL,'abcde','COMMENT_POST',0),(15,39,NULL,'94d5c1d7-fc48-4794-a060-2fac11b2fd0c','REACT_POST',0),(16,40,NULL,'c5c1f7c4-1406-47b5-ba30-81bea725416d','REACT_POST',1),(18,NULL,19,'c5c1f7c4-1406-47b5-ba30-81bea725416d','JOIN_AUCTION',1);
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
INSERT INTO `react` VALUES ('94d5c1d7-fc48-4794-a060-2fac11b2fd0c',1,1,'2022-08-11 21:01:10'),('94d5c1d7-fc48-4794-a060-2fac11b2fd0c',2,1,'2022-08-11 21:01:06'),('94d5c1d7-fc48-4794-a060-2fac11b2fd0c',3,1,'2022-08-11 21:01:03'),('94d5c1d7-fc48-4794-a060-2fac11b2fd0c',36,1,'2022-08-11 21:01:08'),('94d5c1d7-fc48-4794-a060-2fac11b2fd0c',37,1,'2022-08-11 21:01:07'),('94d5c1d7-fc48-4794-a060-2fac11b2fd0c',39,1,'2022-08-11 21:07:10'),('abcd',1,1,'2022-08-11 00:40:02'),('abcd',2,1,'2022-08-10 20:50:03'),('abcd',3,1,'2022-08-11 20:55:01'),('abcd',36,1,'2022-08-11 16:37:21'),('abcd',37,1,'2022-08-11 16:37:16'),('abcd',39,1,'2022-08-11 22:02:01'),('abcd',40,1,'2022-08-11 22:25:21'),('abcde',1,1,'2022-08-11 16:46:56'),('abcde',2,1,'2022-08-11 16:46:53'),('abcde',3,1,'2022-08-07 23:45:39'),('abcde',36,1,'2022-08-09 18:15:44'),('abcde',37,1,'2022-08-11 16:17:25'),('abcde',39,1,'2022-08-11 21:09:09'),('abcdef',1,1,'2022-08-11 16:42:41'),('abcdef',2,1,'2022-08-11 16:42:36'),('abcdef',3,1,'2022-08-11 20:56:11'),('abcdef',36,1,'2022-08-11 16:28:01'),('abcdef',37,1,'2022-08-10 23:27:57'),('c5c1f7c4-1406-47b5-ba30-81bea725416d',39,1,'2022-08-11 22:18:48'),('c5c1f7c4-1406-47b5-ba30-81bea725416d',40,1,'2022-08-11 22:21:33');
/*!40000 ALTER TABLE `react` ENABLE KEYS */;
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
  `reason` enum('IMAGE','CONTENT','SPAM') COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_solve` tinyint DEFAULT '0',
  `reported_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reportAuction_auctionId_idx` (`auction_id`),
  KEY `fk_reportAuction_userId_idx` (`user_id`),
  CONSTRAINT `fk_reportAuction_auctionId` FOREIGN KEY (`auction_id`) REFERENCES `auction` (`id`),
  CONSTRAINT `fk_reportAuction_userId` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_auction`
--

LOCK TABLES `report_auction` WRITE;
/*!40000 ALTER TABLE `report_auction` DISABLE KEYS */;
INSERT INTO `report_auction` VALUES (15,2,'abcd','SPAM',0,'2022-08-09 22:44:47'),(16,2,'abcd','IMAGE',0,'2022-08-09 22:58:29'),(17,2,'abcd','IMAGE',0,'2022-08-09 23:07:27'),(21,1,'abcde','IMAGE',0,'2022-08-11 00:42:40');
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
  `reason` enum('IMAGE','CONTENT','SPAM') COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_solve` tinyint DEFAULT '0',
  `reported_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reportPost_userId_idx` (`user_id`),
  KEY `fk_reportPost_postId_idx` (`post_id`),
  CONSTRAINT `fk_reportPost_postId` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  CONSTRAINT `fk_reportPost_userId` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_post`
--

LOCK TABLES `report_post` WRITE;
/*!40000 ALTER TABLE `report_post` DISABLE KEYS */;
INSERT INTO `report_post` VALUES (9,37,'abcd','IMAGE',0,'2022-08-09 22:08:40'),(10,37,'abcd','IMAGE',0,'2022-08-09 22:12:24'),(11,37,'abcd','IMAGE',0,'2022-08-09 22:41:02'),(12,36,'abcd','IMAGE',0,'2022-08-09 22:47:36'),(13,37,'abcd','IMAGE',0,'2022-08-09 22:50:18'),(14,37,'abcd','IMAGE',0,'2022-08-09 22:52:55'),(15,37,'abcd','IMAGE',0,'2022-08-09 22:57:19'),(16,37,'abcd','IMAGE',0,'2022-08-09 23:16:20'),(17,37,'abcd','IMAGE',0,'2022-08-09 23:22:47'),(18,37,'abcd','IMAGE',0,'2022-08-09 23:24:10'),(19,37,'abcd','IMAGE',0,'2022-08-09 23:24:19'),(20,37,'abcd','IMAGE',0,'2022-08-09 23:28:26'),(21,36,'abcd','IMAGE',0,'2022-08-09 23:28:46'),(22,36,'abcd','IMAGE',0,'2022-08-09 23:29:22'),(23,37,'abcd','IMAGE',0,'2022-08-10 00:20:10');
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
  `reason` enum('PAY','WORDS') COLLATE utf8_unicode_ci NOT NULL,
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
INSERT INTO `report_user` VALUES (1,'abcde','abcd','WORDS',0,'2022-08-09 23:40:05'),(2,'abcde','abcd','PAY',0,'2022-08-09 23:40:53'),(4,'abcde','abcd','PAY',0,'2022-08-10 00:20:24'),(5,'abcd','abcde','PAY',0,'2022-08-10 22:55:31'),(6,'abcde','abcd','PAY',0,'2022-08-11 21:02:21');
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
  `avatar` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'https://res.cloudinary.com/quoc2401/image/upload/v1658299648/images_vjrz9q.png',
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
INSERT INTO `user` VALUES ('94d5c1d7-fc48-4794-a060-2fac11b2fd0c','honguyencongsang.dev@gmail.com','$2a$10$XE3RWBKBIKwuUGcfTsnhW.aj3Haoc4ZjBdVO0y74lwDOIqk4WWXii','Dep trai','Sang','2001-08-11','','TP.HCM','','0823262356','2022-08-11','https://res.cloudinary.com/quoc2401/image/upload/v1660223511/mj1d7jugtifypmflg48w.jpg?public_id=mj1d7jugtifypmflg48w','ROLE_USER',1),('abcd','honguyencongsang723@gmail.com','$2a$10$5X9k5N1sTc1/CjVH5XJoje3QMYijH3ETpgkox00R0MdPaJPPrf7wO','Công Sang','Hồ Nguyễn','2001-08-15','79/43 BBTT','Nghệ An','Sinh viên','0823262356','2022-07-25','https://res.cloudinary.com/dynupxxry/image/upload/v1657817661/cld-sample.jpg','ROLE_USER',1),('abcde','1951052169sang@ou.edu.vn','$2a$10$5X9k5N1sTc1/CjVH5XJoje3QMYijH3ETpgkox00R0MdPaJPPrf7wO','Công San','Hồ Nguyễn','2001-08-15','79/43 BBTT','Nghệ An','Sinh viên','0823262356','2022-07-25','https://res.cloudinary.com/dynupxxry/image/upload/v1657817662/cld-sample-2.jpg','ROLE_ADMIN',1),('abcdef','abc@gmail.com','$2a$10$5X9k5N1sTc1/CjVH5XJoje3QMYijH3ETpgkox00R0MdPaJPPrf7wO','Quốc','Dương Kim','2001-01-24','bla bla','bla bla','Sinh viên','0123456789','2022-07-31','https://res.cloudinary.com/dynupxxry/image/upload/v1657817663/cld-sample-5.jpg','ROLE_USER',1),('c5c1f7c4-1406-47b5-ba30-81bea725416d','conghoangho1802@gmail.com','$2a$10$v.a9/cdv1MIILez9dqmH1ubrgVHQITVcH3P67lfj3Pd/bWchY4su.','Công Hoàng','Hồ','2005-02-19','','','','0123456789','2022-08-11','https://res.cloudinary.com/quoc2401/image/upload/v1660231094/nyawenncbdfxl2zh6z5q.jpg?public_id=nyawenncbdfxl2zh6z5q','ROLE_USER',1);
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

-- Dump completed on 2022-08-12 18:09:53
