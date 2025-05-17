CREATE TABLE IF NOT EXISTS users (
    user_id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email varchar(255) NOT NULL UNIQUE,
    name varchar(255) NOT NULL,
    username varchar(255) NOT NULL UNIQUE,
    password_hash varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS ingredients (
    ingredient_id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id int REFERENCES users(user_id),
    name text NOT NULL,
    quantity int,
    expiration_date DATE
);

CREATE TABLE IF NOT EXISTS savedrecipes (
    recipe_id int PRIMARY KEY,
    user_id int REFERENCES users(user_id),
    name varchar(255) NOT NULL
);

CREATE ROLE fridge_user WITH LOGIN PASSWORD 'strongpassword';
GRANT CONNECT ON DATABASE fridgedb TO fridge_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO fridge_user;
