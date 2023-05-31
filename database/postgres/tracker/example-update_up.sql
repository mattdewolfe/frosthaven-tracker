--- Example up migration schema file

BEGIN;

ALTER TABLE tracker.some_table
	RENAME COLUMN old_name TO new_name;

INSERT INTO tracker.version(release_id, file_path) VALUES (1, 'example-update');

COMMIT;
