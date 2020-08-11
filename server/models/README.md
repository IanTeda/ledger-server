+------------+--------------+------+-----+---------+----------------+
| Field | Type | Null | Key | Default | Extra |
+------------+--------------+------+-----+---------+----------------+
| id | int(11) | NO | PRI | NULL | auto_increment |
| email | varchar(255) | YES | | NULL | |
| token | varchar(255) | YES | | NULL | |
| expiration | datetime | YES | | NULL | |
| createdAt | datetime | NO | | NULL | |
| updatedAt | datetime | NO | | NULL | |
| used | int(11) | NO | | 0 | |
+------------+--------------+------+-----+---------+----------------+
7 rows in set (0.00 sec)

// https://www.smashingmagazine.com/2020/03/creating-secure-password-flows-nodejs-mysql/
