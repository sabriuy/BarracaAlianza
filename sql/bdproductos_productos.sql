-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: bdproductos
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL,
  `fotos` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Ventana de aluminio','1x1',6000.00,'[\"https://raw.githubusercontent.com/sabriuy/barracaalianzaweb/main/proyecto%20barraca-alianza/imagenes/img%20productos/aluminio.jpg\", \"https://raw.githubusercontent.com/sabriuy/barracaalianzaweb/main/proyecto%20barraca-alianza/imagenes/img%20productos/ventana1x1.jpg\"]'),(2,'Chapas metalicas','galvanizadas cal 26',550.00,'[\"https://raw.githubusercontent.com/sabriuy/barracaalianzaweb/main/proyecto%20barraca-alianza/imagenes/img%20productos/chapa.jpg\", \"https://raw.githubusercontent.com/sabriuy/barracaalianzaweb/main/proyecto%20barraca-alianza/imagenes/img%20productos/chapa2.jpg\"]'),(3,'Varillas tratadas','8mm x 6mts',250.00,'[\"https://raw.githubusercontent.com/sabriuy/barracaalianzaweb/main/proyecto%20barraca-alianza/imagenes/img%20productos/varilla.jpeg\", \"https://raw.githubusercontent.com/sabriuy/barracaalianzaweb/main/proyecto%20barraca-alianza/imagenes/img%20productos/varilla2.jpg\"]'),(4,'Puerta de interior','madera',5000.00,'[\"https://raw.githubusercontent.com/sabriuy/barracaalianzaweb/main/proyecto%20barraca-alianza/imagenes/img%20productos/puertaint.jpg\", \"https://raw.githubusercontent.com/sabriuy/barracaalianzaweb/main/proyecto%20barraca-alianza/imagenes/img%20productos/puertaint2.jpeg\"]'),(5,'Caños de pvc','110mm x 3mts',750.00,'[\"https://raw.githubusercontent.com/sabriuy/barracaalianzaweb/main/proyecto%20barraca-alianza/imagenes/img%20productos/cañopvc.jpg\", \"https://raw.githubusercontent.com/sabriuy/barracaalianzaweb/main/proyecto%20barraca-alianza/imagenes/img%20productos/caño2.jpeg\"]'),(6,'Ladrillo cocido','',45.00,'[\"https://raw.githubusercontent.com/sabriuy/barracaalianzaweb/main/proyecto%20barraca-alianza/imagenes/img%20productos/ladrillo.jpg\", \"https://raw.githubusercontent.com/sabriuy/barracaalianzaweb/main/proyecto%20barraca-alianza/imagenes/img%20productos/ladrillo2.jpg\"]'),(7,'Malla electrosoldada ','galvanizada 1.80 x 20mts',4500.00,'[\"https://raw.githubusercontent.com/sabriuy/barracaalianzaweb/main/proyecto%20barraca-alianza/imagenes/img%20productos/malla.jpg\", \"https://raw.githubusercontent.com/sabriuy/barracaalianzaweb/main/proyecto%20barraca-alianza/imagenes/img%20productos/mallaelectro.jfif\"]');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-23 15:42:44
