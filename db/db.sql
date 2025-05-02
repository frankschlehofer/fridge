/* CREATE TABLE IF NOT EXISTS users (
    user_id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email varchar(255) NOT NULL UNIQUE
); */

/* ALTER TABLE users
ADD COLUMN name varchar(30) NOT NULL; */

/* DROP TABLE users; */

/* INSERT INTO users (email, name)
VALUES ('Frankie', 'frankie@email.com'); */


/* UPDATE users
SET name = 'John'
WHERE user_id = 1;
 */

/* DELETE FROM users
WHERE user_id = 1; */

/* CREATE TABLE posts (
    post_id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id int REFERENCES users(user_id),
    title text NOT NULL,
    body text NOT NULL
); */

/* INSERT INTO posts (user_id, title, body)
VALUES (2, 'Title is this ', 'body is this'); */

--SELECT * FROM users;
-- SELECT * FROM posts;

/* CREATE VIEW post_info AS 
    SELECT title, email
    FROM posts INNER JOIN users
    ON posts.user_id = users.user_id; */

SELECT * FROM post_info

/* SELECT title, email FROM posts INNER JOIN users ON posts.user_id = users.user_id */