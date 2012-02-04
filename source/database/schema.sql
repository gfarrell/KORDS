/**
 * KORDS 4 Database Schema
 *
 * @file    schema.sql
 * @author  Gideon Farrell <me@gideonfarrell.co.uk>
*/


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table comments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `room_id` int(11) unsigned NOT NULL,
  `author` varchar(10) NOT NULL DEFAULT '',
  `date` date NOT NULL,
  `body` longtext NOT NULL,
  `public` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`,`room_id`),
  KEY `fk_comments_rooms` (`room_id`),
  CONSTRAINT `fk_comments_rooms` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table locations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `locations`;

CREATE TABLE `locations` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table rent_bands
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rent_bands`;

CREATE TABLE `rent_bands` (
  `id` int(1) unsigned NOT NULL AUTO_INCREMENT,
  `cost_short` int(6) NOT NULL,
  `cost_long` int(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table room_images
# ------------------------------------------------------------

DROP TABLE IF EXISTS `room_images`;

CREATE TABLE `room_images` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `room_id` int(11) unsigned NOT NULL,
  `image` varchar(25) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `room_images_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table rooms
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rooms`;

CREATE TABLE `rooms` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `number` varchar(12) NOT NULL DEFAULT '',
  `short_contract` tinyint(1) NOT NULL DEFAULT '0',
  `location_id` int(11) unsigned NOT NULL,
  `rent_band_id` int(1) unsigned NOT NULL,
  `tenant_type_id` int(11) unsigned NOT NULL,
  `floor` int(1) DEFAULT '0',
  `ensuite` tinyint(1) NOT NULL DEFAULT '0',
  `set` tinyint(1) NOT NULL DEFAULT '0',
  `double` tinyint(1) NOT NULL DEFAULT '0',
  `smoking` tinyint(1) NOT NULL DEFAULT '0',
  `catering` varchar(45) DEFAULT NULL,
  `piano` tinyint(1) NOT NULL DEFAULT '0',
  `location_notes` varchar(1000) DEFAULT NULL,
  `use_notes` varchar(1000) DEFAULT NULL,
  `available` tinyint(1) NOT NULL DEFAULT '1',
  `public` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`,`location_id`,`rent_band_id`,`tenant_type_id`),
  UNIQUE KEY `number` (`number`),
  KEY `fk_rooms_locations1` (`location_id`),
  KEY `fk_rooms_rent_bands1` (`rent_band_id`),
  KEY `fk_rooms_tenant_types1` (`tenant_type_id`),
  CONSTRAINT `fk_rooms_locations1` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_rooms_rent_bands1` FOREIGN KEY (`rent_band_id`) REFERENCES `rent_bands` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_rooms_tenant_types1` FOREIGN KEY (`tenant_type_id`) REFERENCES `tenant_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table tenant_types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tenant_types`;

CREATE TABLE `tenant_types` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `crsid` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
