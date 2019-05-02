-- Deploy fresh database tables.
\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'
-- Seed the database with data.
\i '/docker-entrypoint-initdb.d/seed/seed.sql'