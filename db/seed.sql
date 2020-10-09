-- users Data

create table users (
id serial primary key,
username varchar(20),
password varchar(20),
profile_pic text );

-- select * from users;

insert into users ( username, password, profile_pic)
values ( )

--altering column password datatype from varchar() to text.--
alter table users
alter column password type text;

--showing what reflects now 'text' password example is over varchar(20)
insert into users ( username, password, profile_pic)
values ('jessi', 'teamrocketsblastingoffagain', 'dummyyyyyyyyexampleprofilepic' );

-- posts data

create table posts (
id serial primary key,
title varchar(45),
img text,
content text,
author_id integer references users(id) );

-- select * from posts; 
