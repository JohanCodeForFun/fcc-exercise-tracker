CREATE TABLE users (
	_id VARCHAR(128) PRIMARY KEY NOT NULL,
	username VARCHAR(30) NOT NULL
);

CREATE TABLE logs (
	log_id SERIAL PRIMARY KEY,
	description TEXT NOT NULL,
	duration int NOT NULL,
	date DATE,
	username_id UUID
);