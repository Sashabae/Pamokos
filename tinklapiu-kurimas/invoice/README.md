PostgreSQL invoices table:

CREATE TABLE invoices (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  fullname VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  status VARCHAR(255) NOT NULL
);