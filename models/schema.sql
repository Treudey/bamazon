DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_ID INTEGER(10) NOT NULL,
	product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price FLOAT(10, 2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL
);

INSERT INTO products
VALUES 
    (2701, "LCD Projector", "Electronics", 199.99, 100),
    (1924, "A Game of Thrones", "Books", 11.35, 120),
    (7535, "Mousepad", "Electronics", 29.75, 77),
    (9584, "Pool Cue", "Sports & Outdoors", 60.56, 152),
    (7326, "Colgate Toothpaste", "Beauty & Personal Care", 6.97, 203),
    (4097, "Old Spice Deodorant", "Beauty & Personal Care", 2.98, 154),
    (4290, "Vileda Scrub Sponge (Pack of 4)", "Home & Kitchen", 10.99, 186),
    (1616, "Razor A Kick Scooter", "Sports & Outdoors", 42.35, 29),
    (0964, "Diamond Ring - 1.00 Carats Total", "Jewelry", 3279, 5),
    (1120, "Far Cry 5", "Video Games", 59.95, 75);
