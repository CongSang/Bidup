-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: csmdb
-- ------------------------------------------------------
-- Server version	8.0.28

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
  `end_date` datetime DEFAULT NULL,
  `hashtag` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint DEFAULT '1',
  `mail_to` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `auction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auction`
--

LOCK TABLES `auction` WRITE;
/*!40000 ALTER TABLE `auction` DISABLE KEYS */;
INSERT INTO `auction` VALUES (1,'Lên cho anh em chiếc giày siêu cấp #sharinghope','https://res.cloudinary.com/dynupxxry/image/upload/v1657817663/cld-sample-5.jpg',1600000,'2022-07-29 08:00:00','2022-08-01 00:00:00','#sharinghope','abcd',1,0),(3,' hehe #love test','https://res.cloudinary.com/dynupxxry/image/upload/v1657817661/cld-sample.jpg',7000000,'2022-10-16 21:47:16','2022-10-17 02:47:16','#love','abcd',1,1),(16,'Dau gia thu #sharinghope','https://res.cloudinary.com/quoc2401/image/upload/v1660221929/tybdohzzzrgz9t0515q2.jpg?public_id=tybdohzzzrgz9t0515q2',2000000,'2022-08-11 19:45:52','2022-09-12 20:45:00','#sharinghope ','abcd',1,0),(17,'yolooooooo','https://res.cloudinary.com/quoc2401/image/upload/v1661953336/cvz7ccu4dy8q2c6f1aiy.png?public_id=cvz7ccu4dy8q2c6f1aiy',5000000,'2022-08-31 20:42:15','2022-09-10 22:41:00','','22017ff2-74f9-43b7-b255-8f08f946a467',1,0),(18,'a','https://res.cloudinary.com/quoc2401/image/upload/v1661953412/f7p7yij5jt79phdbg4k2.png?public_id=f7p7yij5jt79phdbg4k2',30000000,'2022-08-31 20:43:31','2022-09-10 21:43:00','','22017ff2-74f9-43b7-b255-8f08f946a467',1,0),(19,'can dau gia #auc','https://res.cloudinary.com/quoc2401/image/upload/v1662691875/z2ghy4s7u5wtu2kakdrx.jpg?public_id=z2ghy4s7u5wtu2kakdrx',11111111,'2022-09-09 09:51:14','2023-02-10 10:51:00','#auc ','abcde',1,0),(20,'dau gia #auction','https://res.cloudinary.com/quoc2401/image/upload/v1662708134/e6zhv6zy66a1wdwwhzko.jpg?public_id=e6zhv6zy66a1wdwwhzko',10000000,'2022-09-09 14:22:15','2022-09-08 17:30:00','#auction ','abcd',1,1),(21,'new','https://res.cloudinary.com/quoc2401/image/upload/v1663760251/uw7dzwpjfw8jsrylxqrw.jpg?public_id=uw7dzwpjfw8jsrylxqrw',1000000,'2022-09-21 18:37:33','2022-09-30 18:39:00','','04f486b4-c014-4c78-a764-a169150fbe2e',1,0),(22,'test\n','https://res.cloudinary.com/quoc2401/image/upload/v1664093813/gvrhkq0mfgmjddlbafz3.webp?public_id=gvrhkq0mfgmjddlbafz3',1000000,'2022-09-25 15:16:54','2022-10-15 21:00:00','','22017ff2-74f9-43b7-b255-8f08f946a467',1,0),(23,'can dau gia #test','https://res.cloudinary.com/quoc2401/image/upload/v1664532942/srw3xomjl5zeaqcadfnz.png?public_id=srw3xomjl5zeaqcadfnz',1000000,'2022-09-30 17:17:08','2022-09-30 18:17:08','#test ','67cc6fc0-f5ee-49c5-ae96-207569f47d68',1,0),(24,'ban','https://res.cloudinary.com/quoc2401/image/upload/v1665721447/hhefycmjyqdgaeejs95a.png?public_id=hhefycmjyqdgaeejs95a',8000000,'2022-10-17 20:17:38','2022-10-18 01:17:38','','abcd',1,0),(25,'assssss','https://res.cloudinary.com/quoc2401/image/upload/v1666076370/sgat53zuhbwggdbrtdmv.png?public_id=sgat53zuhbwggdbrtdmv',1000000,'2022-10-18 13:59:57','2022-10-20 13:59:57','','67cc6fc0-f5ee-49c5-ae96-207569f47d68',1,0),(26,'phone #mobile','https://res.cloudinary.com/quoc2401/image/upload/v1666513777/izcaywclxrgbpw6vrpmo.jpg?public_id=izcaywclxrgbpw6vrpmo',1000000,'2022-10-23 15:29:38',NULL,'#mobile ','abcde',0,0);
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
INSERT INTO `bid` VALUES ('04f486b4-c014-4c78-a764-a169150fbe2e',24,370400000,'','2022-10-17 22:32:53',0),('04f486b4-c014-4c78-a764-a169150fbe2e',25,7800000,'','2022-10-18 18:29:42',0),('22017ff2-74f9-43b7-b255-8f08f946a467',16,2000000,'','2022-09-03 16:59:45',0),('22017ff2-74f9-43b7-b255-8f08f946a467',20,30000000,'','2022-09-09 14:23:47',0),('22017ff2-74f9-43b7-b255-8f08f946a467',21,80400000,'','2022-09-25 18:44:41',0),('abcd',22,80600000,'','2022-10-14 11:22:23',0),('abcde',1,10000000,'','2022-07-31 22:36:35',0),('abcde',16,5000000,'','2022-08-16 23:09:26',0),('abcde',20,20000000,'','2022-09-09 14:22:46',1),('abcde',21,80700000,'','2022-09-30 15:43:38',0),('abcde',22,81000000,'','2022-10-15 20:11:40',0),('abcde',24,370100000,'','2022-10-17 22:32:50',0),('abcde',25,7700000,'','2022-10-18 18:29:40',0);
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
  KEY `fk_reply_comment_idx` (`parent_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_comment_post` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reply_comment` FOREIGN KEY (`parent_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'like','abcde',1,'2022-07-27 00:00:00',NULL),(2,'test','abcd',1,'2022-07-29 16:51:45',NULL),(4,'dep qua','abcd',1,'2022-07-29 16:58:49',NULL),(5,'ok','abcd',1,'2022-07-29 17:00:57',NULL),(11,'haha','abcd',1,'2022-07-30 16:57:56',NULL),(12,'ok','abcd',1,'2022-07-30 16:58:38',NULL),(25,'ok','abcd',NULL,'2022-08-02 23:16:43',NULL),(26,'ok','abcd',1,'2022-08-03 18:55:46',NULL),(33,'test','abcd',2,'2022-08-07 15:51:24',NULL),(35,'hay the','abcde',2,'2022-08-07 16:32:05',NULL),(36,'ok','abcd',3,'2022-08-07 23:47:02',NULL),(40,'test','abcde',2,'2022-08-11 12:57:19',NULL),(41,'5','abcd',2,'2022-08-11 13:08:44',NULL),(42,'6','abcd',2,'2022-08-11 13:08:45',NULL),(43,'7','abcd',2,'2022-08-11 13:08:45',NULL),(44,'8','abcd',2,'2022-08-11 13:08:46',NULL),(45,'9','abcd',2,'2022-08-11 13:08:46',NULL),(46,'10','abcd',2,'2022-08-11 13:08:47',NULL),(47,'11','abcd',2,'2022-08-11 13:08:55',NULL),(48,'thu binh','abcd',48,'2022-08-12 15:57:28',NULL),(49,'thu','abcd',49,'2022-08-12 15:57:44',NULL),(50,'haha','abcd',48,'2022-08-13 18:48:35',NULL),(79,'we','abcd',49,'2022-08-14 17:52:00',NULL),(80,'test trigger','abcde',49,'2022-08-14 17:52:19',NULL),(81,'test','abcd',NULL,'2022-08-14 18:04:31',79),(84,'tet','abcd',NULL,'2022-08-14 18:09:38',50),(85,'test arr','abcd',NULL,'2022-08-14 18:21:31',48),(86,'wo ho','abcd',NULL,'2022-08-14 18:22:11',50),(89,'e','abcd',NULL,'2022-08-14 18:24:09',86),(91,'ha?','22017ff2-74f9-43b7-b255-8f08f946a467',NULL,'2022-08-14 18:29:16',89),(92,'new acc','22017ff2-74f9-43b7-b255-8f08f946a467',48,'2022-08-14 18:31:04',NULL),(93,'test rep','abcd',NULL,'2022-08-15 15:47:35',80),(94,'a','abcd',NULL,'2022-08-15 15:48:40',80),(100,'wewe','abcd',NULL,'2022-08-15 17:25:42',47),(101,'ee','abcd',NULL,'2022-08-15 17:25:44',100),(102,'abcd','abcd',2,'2022-08-15 17:52:21',NULL),(103,'weee11','abcd',NULL,'2022-08-15 17:53:01',79),(104,'ha','abcd',NULL,'2022-08-15 18:27:34',50),(105,'?','abcd',NULL,'2022-08-15 18:27:55',50),(106,'ee','abcd',NULL,'2022-08-15 18:31:32',102),(107,'wwww','abcd',NULL,'2022-08-15 18:31:35',106),(108,'wo','abcd',NULL,'2022-08-15 18:50:55',89),(109,'e','abcd',NULL,'2022-08-15 19:32:39',108),(110,'binh luan','abcde',49,'2022-08-16 22:24:54',NULL),(111,'e','abcd',49,'2022-08-16 22:31:48',NULL),(112,'tra l','abcde',NULL,'2022-08-16 22:40:37',111),(113,'what','abcd',NULL,'2022-08-16 22:41:02',112),(114,'ofu','abcde',NULL,'2022-08-16 22:41:18',113),(115,'e','abcde',49,'2022-08-16 23:08:05',NULL),(116,'nice','abcde',2,'2022-08-17 13:08:41',NULL),(119,'ne','abcde',49,'2022-08-17 14:32:12',NULL),(120,'?','abcde',49,'2022-08-17 14:32:49',NULL),(125,'ưeeeee','abcd',54,'2022-08-31 17:32:01',NULL),(126,'a','abcd',53,'2022-08-31 19:29:43',NULL),(127,'w','abcd',NULL,'2022-08-31 19:27:12',126),(141,'ngon day','abcde',1,'2022-09-09 09:53:47',NULL),(147,'a','04f486b4-c014-4c78-a764-a169150fbe2e',1,'2022-09-09 13:14:32',NULL),(148,'wewe','abcde',NULL,'2022-09-09 13:19:34',94),(155,'w','abcd',2,'2022-09-21 13:27:44',NULL),(159,'wwww','22017ff2-74f9-43b7-b255-8f08f946a467',95,'2022-09-22 17:30:00',NULL),(160,'a','22017ff2-74f9-43b7-b255-8f08f946a467',NULL,'2022-09-22 18:55:51',159),(161,'test','04f486b4-c014-4c78-a764-a169150fbe2e',95,'2022-09-22 18:56:45',NULL),(163,'test','67cc6fc0-f5ee-49c5-ae96-207569f47d68',96,'2022-09-30 17:07:59',NULL),(166,'ga','abcde',95,'2022-10-18 16:22:43',NULL),(167,'e','04f486b4-c014-4c78-a764-a169150fbe2e',81,'2022-10-18 16:23:04',NULL),(169,'o','abcde',81,'2022-10-18 16:50:45',NULL),(172,'geh','04f486b4-c014-4c78-a764-a169150fbe2e',96,'2022-10-18 16:58:16',NULL),(176,'what','abcde',96,'2022-10-18 17:10:33',NULL),(178,'wo','abcde',96,'2022-10-18 17:11:55',NULL),(179,'wao','abcde',96,'2022-10-18 17:12:04',NULL),(180,'lala','abcde',96,'2022-10-18 17:12:37',NULL),(186,'lele1','abcde',NULL,'2022-10-18 17:47:24',180),(187,'ha?','abcde',96,'2022-10-18 17:53:56',NULL),(188,'he','abcde',NULL,'2022-10-18 17:54:00',187),(189,'thu','abcde',NULL,'2022-10-18 18:06:39',187),(190,'what','04f486b4-c014-4c78-a764-a169150fbe2e',NULL,'2022-10-18 18:07:23',187),(191,'what','04f486b4-c014-4c78-a764-a169150fbe2e',NULL,'2022-10-18 18:21:55',187),(192,'c','abcde',NULL,'2022-10-18 18:08:05',187),(193,'guh12','04f486b4-c014-4c78-a764-a169150fbe2e',NULL,'2022-10-18 18:25:54',187),(194,'kek','abcde',NULL,'2022-10-18 18:10:51',180),(195,'a','abcde',NULL,'2022-10-18 18:11:36',180),(196,'lol','abcde',NULL,'2022-10-18 18:13:27',166),(197,'lel','abcde',NULL,'2022-10-18 18:13:52',166),(198,'no','abcde',NULL,'2022-10-18 18:14:27',187),(200,'q','abcde',NULL,'2022-10-18 18:17:38',166),(201,'la','abcde',NULL,'2022-10-18 18:18:13',187),(202,'ter','abcde',NULL,'2022-10-18 18:21:24',169),(203,'haha','04f486b4-c014-4c78-a764-a169150fbe2e',96,'2022-10-18 18:29:52',NULL);
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
  `user_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('REPLY_COMMENT','REACT_COMMENT') COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comment_notif_comment_id_idx` (`comment_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comment_notif_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_comment_notif_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_notif`
--

LOCK TABLES `comment_notif` WRITE;
/*!40000 ALTER TABLE `comment_notif` DISABLE KEYS */;
INSERT INTO `comment_notif` VALUES (1,47,'abcd','REACT_COMMENT',1),(2,45,'abcd','REACT_COMMENT',1),(3,79,'abcd','REACT_COMMENT',1),(4,89,'abcd','REPLY_COMMENT',1),(5,48,'abcd','REACT_COMMENT',1),(6,84,'abcd','REACT_COMMENT',1),(7,86,'abcd','REACT_COMMENT',1),(8,50,'abcd','REACT_COMMENT',1),(14,89,'abcd','REACT_COMMENT',1),(17,111,'abcd','REPLY_COMMENT',1),(19,113,'abcd','REPLY_COMMENT',1),(23,126,'abcd','REACT_COMMENT',1),(24,125,'abcd','REACT_COMMENT',1),(25,125,'abcd','REPLY_COMMENT',0),(26,26,'abcd','REACT_COMMENT',1),(32,94,'abcd','REACT_COMMENT',1),(33,94,'abcd','REPLY_COMMENT',1),(38,161,'04f486b4-c014-4c78-a764-a169150fbe2e','REACT_COMMENT',1),(39,159,'22017ff2-74f9-43b7-b255-8f08f946a467','REACT_COMMENT',0),(43,187,'abcde','REPLY_COMMENT',0),(44,179,'abcde','REACT_COMMENT',0),(45,178,'abcde','REACT_COMMENT',0),(46,187,'abcde','REACT_COMMENT',0),(47,180,'abcde','REACT_COMMENT',0),(48,176,'abcde','REACT_COMMENT',0);
/*!40000 ALTER TABLE `comment_notif` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `config` (
  `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
INSERT INTO `config` VALUES ('minimum_compete','100000','Giá cạnh tranh lớn hơn tối thiểu (VND)');
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
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
INSERT INTO `follow` VALUES ('abcd','04f486b4-c014-4c78-a764-a169150fbe2e'),('abcde','04f486b4-c014-4c78-a764-a169150fbe2e'),('04f486b4-c014-4c78-a764-a169150fbe2e','22017ff2-74f9-43b7-b255-8f08f946a467'),('abcd','22017ff2-74f9-43b7-b255-8f08f946a467'),('abcde','22017ff2-74f9-43b7-b255-8f08f946a467'),('04f486b4-c014-4c78-a764-a169150fbe2e','abcd'),('22017ff2-74f9-43b7-b255-8f08f946a467','abcd'),('abcde','abcd'),('04f486b4-c014-4c78-a764-a169150fbe2e','abcde'),('abcd','abcde');
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
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Bữa sáng của tôi #sharinghope #test','https://res.cloudinary.com/dynupxxry/image/upload/v1657817663/cld-sample-4.jpg','2022-07-26 07:00:00','abcd',1,'#sharinghope #test '),(2,'Chuyến đi đầu tiên của tôi  #sharinghope','https://res.cloudinary.com/dynupxxry/image/upload/v1657817637/sample.jpg','2022-08-10 00:45:42','abcd',1,'#sharinghope#Test1 #Test2 '),(3,'Ngày mới #love','https://res.cloudinary.com/dynupxxry/image/upload/v1657817662/cld-sample-3.jpg','2022-07-27 00:00:00','abcde',1,'#love '),(48,'#sharinghope #test','','2022-08-11 19:40:35','abcd',1,'#sharinghope #test '),(49,'#sharinghope #test2','','2022-08-11 19:43:29','abcd',1,'#sharinghope #test2 '),(50,'new\n','','2022-08-17 13:43:51','abcd',1,''),(53,'weeeee','','2022-08-29 22:22:40','22017ff2-74f9-43b7-b255-8f08f946a467',1,''),(54,'','https://res.cloudinary.com/quoc2401/image/upload/v1661786564/p92ilqzfg9pw03xwto9n.png?public_id=p92ilqzfg9pw03xwto9n','2022-08-29 22:22:46','22017ff2-74f9-43b7-b255-8f08f946a467',1,''),(56,'hhhhhh','https://res.cloudinary.com/quoc2401/image/upload/v1661953301/y2b0unmk4clxnjetytqw.jpg?public_id=y2b0unmk4clxnjetytqw','2022-08-31 20:41:41','22017ff2-74f9-43b7-b255-8f08f946a467',1,''),(57,'huh','','2022-08-31 20:44:13','22017ff2-74f9-43b7-b255-8f08f946a467',1,''),(60,'bai viet so 1','https://res.cloudinary.com/quoc2401/image/upload/v1662690581/q21nwrpqljpweb3wz8pu.png?public_id=q21nwrpqljpweb3wz8pu','2022-09-09 09:29:39','abcde',1,''),(61,'so 2','https://res.cloudinary.com/quoc2401/image/upload/v1662690587/ntgh5ekjipwijk9vcdp4.png?public_id=ntgh5ekjipwijk9vcdp4','2022-09-09 09:29:45','abcde',1,''),(62,'so 3','https://res.cloudinary.com/quoc2401/image/upload/v1662690674/kgbxxujhju1xaen3sda6.png?public_id=kgbxxujhju1xaen3sda6','2022-09-09 09:31:13','abcde',1,''),(63,'so 4','https://res.cloudinary.com/quoc2401/image/upload/v1662690847/oxqyvervrf3nlnfjpghr.png?public_id=oxqyvervrf3nlnfjpghr','2022-09-09 09:34:06','abcde',1,''),(64,'so 5\n','https://res.cloudinary.com/quoc2401/image/upload/v1662690892/b1et2o9gxifngct8fehj.jpg?public_id=b1et2o9gxifngct8fehj','2022-09-09 09:34:51','abcde',1,''),(65,'#so so6','','2022-09-09 09:35:05','abcde',1,'#so '),(66,'#so so7','','2022-09-09 09:39:40','abcde',1,'#so '),(67,'#so so8','https://res.cloudinary.com/quoc2401/image/upload/v1662691194/bmnkl3nljdro3oqitzsn.jpg?public_id=bmnkl3nljdro3oqitzsn','2022-09-09 09:39:53','abcde',1,'#so '),(68,'','https://res.cloudinary.com/quoc2401/image/upload/v1662691248/mlbbam2ov39g0cin8y7k.jpg?public_id=mlbbam2ov39g0cin8y7k','2022-09-09 09:40:47','abcde',1,''),(69,'#so','https://res.cloudinary.com/quoc2401/image/upload/v1662691316/q0desndyf18hnpmfzb1s.jpg?public_id=q0desndyf18hnpmfzb1s','2022-09-09 09:41:54','abcde',1,'#so '),(70,'','https://res.cloudinary.com/quoc2401/image/upload/v1662691329/c3e7pzuslkww5ubetcwn.jpg?public_id=c3e7pzuslkww5ubetcwn','2022-09-09 09:42:07','abcde',1,''),(71,'#so 10','https://res.cloudinary.com/quoc2401/image/upload/v1662691381/ha5p93t3t6mkh2m6ggsp.jpg?public_id=ha5p93t3t6mkh2m6ggsp','2022-09-09 09:42:59','abcde',1,'#so '),(73,'ssss','https://res.cloudinary.com/quoc2401/image/upload/v1662691894/blueb6hgqzmxzsw7udva.jpg?public_id=blueb6hgqzmxzsw7udva','2022-09-09 09:51:33','abcde',1,''),(74,'this is content','','2022-09-09 10:10:29','abcde',1,''),(75,'#what\n','','2022-09-09 10:10:34','abcde',1,'#what '),(76,'#wa\n','','2022-09-09 10:11:10','abcde',1,'#wa '),(77,'what\n','','2022-09-09 10:11:56','abcde',1,''),(78,'haha\n','','2022-09-09 10:12:00','abcde',1,''),(79,'2 giay\n','','2022-09-09 10:12:07','abcde',1,''),(80,'d','','2022-09-09 10:12:13','abcde',1,''),(81,'R','','2022-09-09 10:12:17','abcde',1,''),(95,'tst','','2022-09-22 17:29:22','22017ff2-74f9-43b7-b255-8f08f946a467',1,''),(96,'test','','2022-09-30 17:05:43','67cc6fc0-f5ee-49c5-ae96-207569f47d68',1,'');
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
  `type` enum('COMMENT_POST','REACT_POST','JOIN_AUCTION','COMPETE_AUCTION') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint DEFAULT '0',
  `auction_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_postNotif_postId_idx` (`post_id`),
  KEY `post_notif_ibfk_1` (`user_id`),
  KEY `fk_postNotif_auctionId_idx` (`auction_id`),
  CONSTRAINT `fk_postNotif_auctionId` FOREIGN KEY (`auction_id`) REFERENCES `auction` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_postNotif_postId` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `post_notif_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=328 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_notif`
--

LOCK TABLES `post_notif` WRITE;
/*!40000 ALTER TABLE `post_notif` DISABLE KEYS */;
INSERT INTO `post_notif` VALUES (3,2,'abcd','COMMENT_POST',1,NULL),(14,NULL,'abcd','JOIN_AUCTION',1,16),(15,49,'abcd','COMMENT_POST',1,NULL),(16,49,'abcd','REACT_POST',1,NULL),(28,50,'abcd','REACT_POST',1,NULL),(30,50,'abcd','COMMENT_POST',1,NULL),(42,NULL,'abcd','JOIN_AUCTION',1,20),(180,96,'67cc6fc0-f5ee-49c5-ae96-207569f47d68','REACT_POST',0,NULL),(181,96,'67cc6fc0-f5ee-49c5-ae96-207569f47d68','COMMENT_POST',0,NULL),(308,81,'abcde','REACT_POST',1,NULL),(310,NULL,'04f486b4-c014-4c78-a764-a169150fbe2e','COMPETE_AUCTION',0,25),(311,NULL,'abcde','COMPETE_AUCTION',0,25),(314,95,'22017ff2-74f9-43b7-b255-8f08f946a467','REACT_POST',0,NULL),(315,80,'abcde','REACT_POST',1,NULL),(316,79,'abcde','REACT_POST',0,NULL),(317,78,'abcde','REACT_POST',0,NULL),(318,77,'abcde','REACT_POST',1,NULL),(319,76,'abcde','REACT_POST',0,NULL),(320,75,'abcde','REACT_POST',0,NULL),(321,74,'abcde','REACT_POST',1,NULL),(322,73,'abcde','REACT_POST',0,NULL),(323,71,'abcde','REACT_POST',0,NULL),(324,70,'abcde','REACT_POST',0,NULL),(325,69,'abcde','REACT_POST',0,NULL),(326,68,'abcde','REACT_POST',1,NULL),(327,67,'abcde','REACT_POST',0,NULL);
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
INSERT INTO `react` VALUES ('04f486b4-c014-4c78-a764-a169150fbe2e',1,1,'2022-01-09 13:14:48'),('04f486b4-c014-4c78-a764-a169150fbe2e',67,1,'2022-10-18 18:35:16'),('04f486b4-c014-4c78-a764-a169150fbe2e',68,1,'2022-10-18 18:31:53'),('04f486b4-c014-4c78-a764-a169150fbe2e',69,1,'2022-10-18 18:31:52'),('04f486b4-c014-4c78-a764-a169150fbe2e',70,1,'2022-10-18 18:31:46'),('04f486b4-c014-4c78-a764-a169150fbe2e',71,1,'2022-10-18 18:31:44'),('04f486b4-c014-4c78-a764-a169150fbe2e',73,1,'2022-10-18 18:31:43'),('04f486b4-c014-4c78-a764-a169150fbe2e',74,1,'2022-10-18 18:31:42'),('04f486b4-c014-4c78-a764-a169150fbe2e',75,1,'2022-10-18 18:31:41'),('04f486b4-c014-4c78-a764-a169150fbe2e',76,1,'2022-10-18 18:31:40'),('04f486b4-c014-4c78-a764-a169150fbe2e',77,1,'2022-10-18 18:31:39'),('04f486b4-c014-4c78-a764-a169150fbe2e',78,1,'2022-10-18 18:31:39'),('04f486b4-c014-4c78-a764-a169150fbe2e',79,1,'2022-10-18 18:31:38'),('04f486b4-c014-4c78-a764-a169150fbe2e',80,1,'2022-10-18 18:31:37'),('04f486b4-c014-4c78-a764-a169150fbe2e',81,1,'2022-10-18 16:31:42'),('04f486b4-c014-4c78-a764-a169150fbe2e',95,1,'2022-10-18 16:49:58'),('04f486b4-c014-4c78-a764-a169150fbe2e',96,1,'2022-10-18 14:32:33'),('22017ff2-74f9-43b7-b255-8f08f946a467',2,1,'2022-08-14 18:30:56'),('22017ff2-74f9-43b7-b255-8f08f946a467',48,1,'2022-08-14 18:31:00'),('22017ff2-74f9-43b7-b255-8f08f946a467',54,1,'2022-08-31 21:05:05'),('22017ff2-74f9-43b7-b255-8f08f946a467',95,1,'2022-09-22 17:29:58'),('67cc6fc0-f5ee-49c5-ae96-207569f47d68',96,1,'2022-09-30 17:08:42'),('abcd',1,1,'2022-08-06 07:00:00'),('abcd',2,1,'2022-08-12 15:45:16'),('abcd',3,1,'2022-08-07 23:46:55'),('abcd',48,1,'2022-08-14 16:05:57'),('abcd',49,1,'2022-08-31 19:38:54'),('abcd',50,1,'2022-08-17 14:33:38'),('abcd',53,1,'2022-08-31 19:37:51'),('abcd',54,1,'2022-08-31 19:37:51'),('abcde',1,1,'2022-10-18 14:18:44'),('abcde',2,1,'2022-08-17 13:08:39'),('abcde',3,1,'2022-08-07 23:45:39'),('abcde',48,1,'2022-08-14 17:52:25'),('abcde',49,1,'2022-08-17 14:33:16'),('abcde',50,1,'2022-08-17 14:11:16'),('abcde',62,1,'2022-09-09 10:10:02'),('abcde',81,1,'2022-10-18 16:50:14'),('abcde',95,1,'2022-10-18 14:12:52'),('abcde',96,1,'2022-10-18 14:32:37');
/*!40000 ALTER TABLE `react` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `react_comment`
--

DROP TABLE IF EXISTS `react_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `react_comment` (
  `user_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
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
INSERT INTO `react_comment` VALUES ('04f486b4-c014-4c78-a764-a169150fbe2e',159,NULL,'2022-01-22 18:10:14'),('04f486b4-c014-4c78-a764-a169150fbe2e',176,NULL,'2022-10-18 18:31:34'),('04f486b4-c014-4c78-a764-a169150fbe2e',178,NULL,'2022-10-18 18:30:01'),('04f486b4-c014-4c78-a764-a169150fbe2e',179,NULL,'2022-10-18 18:30:00'),('04f486b4-c014-4c78-a764-a169150fbe2e',180,NULL,'2022-10-18 18:31:33'),('04f486b4-c014-4c78-a764-a169150fbe2e',187,NULL,'2022-10-18 18:31:32'),('22017ff2-74f9-43b7-b255-8f08f946a467',48,1,'2022-08-14 18:30:58'),('22017ff2-74f9-43b7-b255-8f08f946a467',50,1,'2022-08-14 18:31:00'),('22017ff2-74f9-43b7-b255-8f08f946a467',84,1,'2022-08-14 18:30:58'),('22017ff2-74f9-43b7-b255-8f08f946a467',86,1,'2022-08-14 18:30:59'),('22017ff2-74f9-43b7-b255-8f08f946a467',125,1,'2022-08-31 21:05:06'),('22017ff2-74f9-43b7-b255-8f08f946a467',126,1,'2022-08-31 21:03:16'),('22017ff2-74f9-43b7-b255-8f08f946a467',159,NULL,'2022-09-22 18:55:50'),('22017ff2-74f9-43b7-b255-8f08f946a467',161,NULL,'2022-09-22 18:56:55'),('abcd',1,1,'2022-08-17 14:23:39'),('abcd',45,1,'2022-08-12 17:58:29'),('abcd',46,1,'2022-08-12 17:59:32'),('abcd',47,1,'2022-08-12 18:03:55'),('abcd',50,1,'2022-08-13 18:48:37'),('abcd',79,1,'2022-08-14 17:56:50'),('abcd',80,1,'2022-08-15 15:47:25'),('abcd',84,1,'2022-08-14 18:22:07'),('abcd',86,1,'2022-08-14 18:22:23'),('abcd',89,1,'2022-08-14 18:28:53'),('abcd',91,1,'2022-08-15 19:32:36'),('abcd',110,1,'2022-08-16 22:25:04'),('abcd',126,1,'2022-08-31 19:27:10'),('abcde',44,1,'2022-08-12 17:37:29'),('abcde',45,1,'2022-08-13 18:14:32'),('abcde',46,1,'2022-08-12 17:37:28'),('abcde',47,1,'2022-08-17 14:24:34'),('abcde',79,1,'2022-08-14 17:56:59'),('abcde',89,1,'2022-08-15 18:45:51'),('abcde',94,1,'2022-09-09 13:19:17'),('abcde',110,1,'2022-08-16 22:25:10'),('abcde',159,NULL,'2022-09-25 18:14:34'),('da8edfca-1360-4db2-96de-4a2cdfd62ef9',26,1,'2022-09-03 16:31:13');
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
  `reason` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_solve` tinyint DEFAULT '0',
  `reported_date` datetime NOT NULL,
  `type` enum('IMAGE','CONTENT','SPAM') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reportAuction_auctionId_idx` (`auction_id`),
  KEY `fk_reportAuction_userId_idx` (`user_id`),
  CONSTRAINT `fk_reportAuction_auctionId` FOREIGN KEY (`auction_id`) REFERENCES `auction` (`id`),
  CONSTRAINT `fk_reportAuction_userId` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_auction`
--

LOCK TABLES `report_auction` WRITE;
/*!40000 ALTER TABLE `report_auction` DISABLE KEYS */;
INSERT INTO `report_auction` VALUES (19,19,'abcd','Spam',0,'2022-09-09 14:28:52','SPAM'),(20,22,'abcde','Ảnh bài viết không phù hợp',0,'2022-10-09 10:44:11','IMAGE');
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
  `type` enum('IMAGE','CONTENT','SPAM') COLLATE utf8mb4_unicode_ci NOT NULL,
  `reason` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_solve` tinyint DEFAULT '0',
  `reported_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reportPost_userId_idx` (`user_id`),
  KEY `fk_reportPost_postId_idx` (`post_id`),
  CONSTRAINT `fk_reportPost_postId` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reportPost_userId` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_post`
--

LOCK TABLES `report_post` WRITE;
/*!40000 ALTER TABLE `report_post` DISABLE KEYS */;
INSERT INTO `report_post` VALUES (30,95,'abcde','IMAGE','Ảnh bài viết không phù hợp',0,'2022-09-27 19:58:11');
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
  `reason` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_solve` tinyint DEFAULT '0',
  `reported_date` datetime NOT NULL,
  `type` enum('PAY','WORDS') COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reportUser_userId_idx` (`user_id`),
  KEY `fk_reportUser_user_idx` (`reported_user`),
  CONSTRAINT `fk_reportUser_user` FOREIGN KEY (`reported_user`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reportUser_userId` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_user`
--

LOCK TABLES `report_user` WRITE;
/*!40000 ALTER TABLE `report_user` DISABLE KEYS */;
INSERT INTO `report_user` VALUES (1,'abcde','abcd','WORDS',0,'2022-08-09 23:40:05','PAY'),(2,'abcde','abcd','PAY',0,'2022-08-09 23:40:53','PAY'),(4,'abcde','abcd','PAY',0,'2022-08-10 00:20:24','PAY'),(7,'abcde','abcd','Đấu giá nhưng không thanh toán',0,'2022-09-09 14:29:08','PAY');
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
  `user_role` enum('ROLE_ADMIN','ROLE_USER') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
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
INSERT INTO `user` VALUES ('04f486b4-c014-4c78-a764-a169150fbe2e','quoc2401@gmail.com','$2a$10$cFj1sf5Xr.oqnzAMcFeyCe95obVMY6TiJThRwX9pHzsaj.dUZ2I8O','q','quoc','2000-12-05','Go Vap','Ho Chi Minh','','0917472052','2022-09-09','https://res.cloudinary.com/quoc2401/image/upload/v1662703933/xipqcyo9solxmpe4vctu.png?public_id=xipqcyo9solxmpe4vctu','ROLE_USER',1),('0d822979-0686-4907-8e97-48a55869ab17','quoc2405@gmail.com','$2a$10$f5aMAGeJ8Wtsvvfj45.yZeEH5vsELKOx0grccHbMdpOBvSOZ4iILy','1951052167 -','Quốc','2022-09-02','Go Vap','Ho Chi Minh','','0917472052','2022-09-30',NULL,'ROLE_USER',1),('22017ff2-74f9-43b7-b255-8f08f946a467','blah@gmail.com','$2a$10$wrBgXLXxcqBll7bg3Y6nc.tqmQkYhW/4W.Gi2PBdpmuAj1BzfAZ.C','Quoc','DUong','2022-07-23','asdasdasd','3123123123','dsadasdad','0917472052','2022-08-14','https://res.cloudinary.com/quoc2401/image/upload/v1660476421/wtuybmnh2zymvg8wgrwi.png?public_id=wtuybmnh2zymvg8wgrwi','ROLE_USER',1),('3f3be374-fd15-4197-af63-bd1da8caa7c8','quoc2407@gmail.com','$2a$10$z9hNGaiQ1FnKeU.5gTB6qekE2KtSU5HCF68WM4GrnyHm9d6Ou0Cu.','1951052167 -','Quốc','2022-09-15','Go Vap','Ho Chi Minh','','0917472052','2022-09-30',NULL,'ROLE_USER',1),('4cc09d6c-f176-4714-a1cf-212bba838389','quoc2404@gmail.com','$2a$10$KsjdAibp9djYtkKpC97uVOUKQAZgvPHxV8QuF/BjWSFLU5wBxD1Ku','1951052167 -','Quốc asdsadsadasd','2022-09-08','Go Vap','Ho Chi Minh','','0917472052','2022-09-30',NULL,'ROLE_USER',1),('67cc6fc0-f5ee-49c5-ae96-207569f47d68','quoc2402@gmail.com','$2a$10$Zxuvx0Yo0VoynYHRIcVteODM27VwCzc9Ltb99U22QwqtX6Yzx8iES','1951052167 - Dương','Quốc','2022-09-17','Go Vap','Ho Chi Minh','','0917472052','2022-09-30',NULL,'ROLE_USER',1),('8aee047a-c225-47ec-9d5f-e46f1471c9e2','quoc2406@gmail.com','$2a$10$8GeZvfN84jEYSMlnM13NSOzPPt6Cvln7y/9DEhFXEGDHoVUI5Mvze','1951052167 -','Quốc','2022-09-08','Go Vap','Ho Chi Minh','','0917472052','2022-09-30',NULL,'ROLE_USER',1),('abcd','honguyencongsang723@gmail.com','$2a$10$5X9k5N1sTc1/CjVH5XJoje3QMYijH3ETpgkox00R0MdPaJPPrf7wO','Công Sang','Hồ Nguyễn','2001-08-15','79/43 BBTT','Nghệ An','Sinh viên','0823262356','2022-07-25','https://res.cloudinary.com/dynupxxry/image/upload/v1657817661/cld-sample.jpg','ROLE_USER',1),('abcde','1951052169sang@ou.edu.vn','$2a$10$5X9k5N1sTc1/CjVH5XJoje3QMYijH3ETpgkox00R0MdPaJPPrf7wO','d','Quốc','2001-01-24','Go Vap','Ho Chi Minh','safsafsafsaf','0917472052','2022-07-25','https://res.cloudinary.com/dynupxxry/image/upload/v1657817662/cld-sample-2.jpg','ROLE_ADMIN',1),('b82217a1-ee46-4fab-90b5-638823bc4bbd','quoc2403@gmail.com','$2a$10$SCwUze8trFUWaTqIFRg4UemFhNHtynqVtonIzIdJ1I0zM14hoKMc2','1951052167 -','Quốc','2022-09-16','Go Vap','Ho Chi Minh','','0917472052','2022-09-30',NULL,'ROLE_USER',1),('c90c4f28-7cd5-41c5-afb7-6b79ba135ba4','chuotvavu7@yahoo.com','$2a$10$eJUpKbjGT2gehD/TUc2mC.qJm/vzgk5ffYM831DSoNOkqoYJA5J8W','Quốc','Dương','2001-01-24',NULL,'Phan Ri Cua, Thuin Hai, Vietnam',NULL,NULL,'2022-10-09','https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2248760065301840&height=50&width=50&ext=1667878343&hash=AeSWSO1M3RfeSM3tjFg','ROLE_USER',1);
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

-- Dump completed on 2022-10-24 13:38:23
