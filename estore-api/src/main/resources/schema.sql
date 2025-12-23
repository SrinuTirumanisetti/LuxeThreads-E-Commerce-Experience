CREATE TABLE IF NOT EXISTS product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price FLOAT,
    quantity INT,
    description TEXT,
    type VARCHAR(50),
    image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS estore_orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    order_date VARCHAR(50),
    address VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS shopping_cart_item (
    shopping_cart_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    color VARCHAR(50),
    size VARCHAR(50),
    image VARCHAR(255),
    user_id INT,
    shopping_cart_quantity INT,
    order_id INT,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES product(id),
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES estore_orders(order_id)
);
