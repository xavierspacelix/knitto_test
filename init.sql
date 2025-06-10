CREATE DATABASE IF NOT EXISTS test_knitto;
USE test_knitto;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  name VARCHAR(255)
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_code VARCHAR(50) UNIQUE NOT NULL,
  nama_produk VARCHAR(255) NOT NULL,
  harga_jual DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0
);

CREATE TABLE customers (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  order_date DATETIME,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INT,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message TEXT NOT NULL,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, password, name) VALUES ('test@example.com', 'password', 'Test User');

INSERT INTO products (product_code, nama_produk, harga_jual, stock) VALUES
('PROD-001', 'combed 30s', 5000, 100),
('PROD-002', 'combed 30s', 5500, 100),
('PROD-003', 'combed 30s', 7000, 100),
('PROD-004', 'combed 30s', 6000, 100),
('PROD-005', 'combed 30s', 6500, 100),
('PROD-006', 'combed 24s', 8000, 100),
('PROD-007', 'combed 28s', 9500, 100),
('PROD-008', 'combed 24s', 8500, 100),
('PROD-009', 'combed 28s', 10000, 100),
('PROD-010', 'combed 28s', 10500, 100);

INSERT INTO customers (customer_name) VALUES
('John Doe'),
('Jane Smith'),
('Acme Corp');

INSERT INTO orders (customer_id, order_date) VALUES
(1, '2025-06-01 10:00:00'),
(1, '2025-06-02 12:00:00'),
(2, '2025-06-03 14:00:00'),
(3, '2025-06-04 16:00:00'),
(2, '2025-06-05 18:00:00');

INSERT INTO order_details (order_id, product_id, quantity) VALUES
(1, 1, 2),
(1, 2, 1),
(2, 3, 3),
(3, 6, 5),
(4, 8, 2);