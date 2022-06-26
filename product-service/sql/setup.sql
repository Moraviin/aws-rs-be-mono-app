create database shop;

create extension if not exists "uuid-ossp";

create table items (
	id uuid primary key default uuid_generate_v4(),
	title text,
	description text,
	price integer
);

create table stock (
	item_id uuid,
	count integer,
	foreign key ("item_id") references "items" ("id")
);

insert into items (id, title, description, price) values
('7567ec4b-b10c-48c5-9345-fc73c48a80aa', 'ProductOne', 'Short Product Description1', 2),
('7567ec4b-b10c-48c5-9345-fc73c48a80a0', 'ProductNew', 'Short Product Description2', 4),
('7567ec4b-b10c-48c5-9345-fc73c48a80a2', 'ProductTop', 'Short Product Description3', 6),
('7567ec4b-b10c-48c5-9345-fc73c48a80a1', 'ProductTitle', 'Short Product Description4', 8),
('7567ec4b-b10c-48c5-9345-fc73c48a80a3', 'Product', 'Short Product Description5', 10),
('7567ec4b-b10c-48c5-9345-fc73348a80a1', 'ProductTest', 'Short Product Description6', 12),
('7567ec4b-b10c-48c5-9445-fc73c48a80a2', 'Product2', 'Short Product Description7', 14),
('7567ec4b-b10c-45c5-9345-fc73c48a80a1', 'ProductName', 'Short Product Description8', 16);

insert into stock (item_id, count) values
('7567ec4b-b10c-48c5-9345-fc73c48a80aa', 14),
('7567ec4b-b10c-48c5-9345-fc73c48a80a0', 12)
('7567ec4b-b10c-48c5-9345-fc73c48a80a2', 16),
('7567ec4b-b10c-48c5-9345-fc73c48a80a1', 18),
('7567ec4b-b10c-48c5-9345-fc73c48a80a3', 110),
('7567ec4b-b10c-48c5-9345-fc73348a80a1', 112),
('7567ec4b-b10c-48c5-9445-fc73c48a80a2', 114),
('7567ec4b-b10c-45c5-9345-fc73c48a80a1', 116);