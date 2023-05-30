--- Example down migration schema file

BEGIN;

ALTER TABLE tracker.some_table
	RENAME COLUMN new_name TO old_name;

DELETE FROM tracker.version WHERE release_id > 0;

COMMIT;
