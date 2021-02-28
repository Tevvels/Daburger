DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db
USE burgers_db

CREATE TABLE burgers
(
    id int NULL AUTO_INCREMENT,
    burger_name VARCHAR(50)
    devoured BOOLEAN
);