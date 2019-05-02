BEGIN TRANSACTION;
INSERT INTO users (name, email, entries, joined) VALUES ('t', 't@t', '5', '2018-01-01');
INSERT INTO login (hash, email) VALUES ('$2a$10$0xfcWbXKMmOElWMtumIAue9Tn.z2p9EyxiRfaG1PV/GIeY2w6Vtu6', 't@t');
COMMIT;