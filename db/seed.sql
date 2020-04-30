CREATE TABLE users (
    users_id serial primary key,
    username varchar(50),
    password varchar(100)
);

CREATE TABLE comments (
    comment_id serial primary key,
    users_id INT references users(users_id),
    content varchar(2500),
    created_at date
);

CREATE TABLE trails (
    trail_id serial primary key,
    trail_region varchar(100),
    trail_location decimal(10, 8),
    trail_name varchar(100),
    trail_length decimal,
    trail_difficulty varchar(100)
);

CREATE TABLE minerals (
    mineral_id serial primary key,
    mineral_name varchar(100),
    mineral_img varchar(1000)
);

CREATE TABLE trails_minerals_join (
    mineral_id int REFERENCES trails(trail_id),
    trail_id int REFERENCES minerals(mineral_id)
);