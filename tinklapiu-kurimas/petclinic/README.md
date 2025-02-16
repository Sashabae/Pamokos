Pet Clinic website with minimal ui

///////////////////////////////////
Table in postgresql for appointments:

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  petname VARCHAR(255) NOT NULL,
  ownername VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  notes TEXT,
  userId INT,
  FOREIGN KEY (userId) REFERENCES users(id)
);

///////////////////////////////////
Table for users:

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);