BEGIN;

--
-- Configure and enable safe mode
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

CREATE SCHEMA IF NOT EXISTS parliament;

--
-- Create Version
--
CREATE TABLE tracker.version (
	 release_id INTEGER NOT NULL,
	 file_path TEXT NOT NULL,
	 date_committed INTEGER DEFAULT date_part('epoch'::text, now())::integer NOT NULL,
	 PRIMARY KEY (release_id)
);

--
-- Create Character Classes
--
CREATE TABLE tracker.character_class (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
       SEQUENCE NAME tracker.character_class_id_seq
       START WITH 1
       INCREMENT BY 1
       NO MINVALUE
       NO MAXVALUE
       CACHE 1
    ) NOT NULL,
    name TEXT NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

--
-- Create Status Effect
--
CREATE TABLE tracker.status_effect (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
       SEQUENCE NAME tracker.status_effect_id_seq
       START WITH 1
       INCREMENT BY 1
       NO MINVALUE
       NO MAXVALUE
       CACHE 1
    ) NOT NULL,
    name TEXT NOT NULL UNIQUE,
    iconUrl TEXT,
    PRIMARY KEY (id)
);

--
-- Create Creature Classes
--
CREATE TABLE tracker.creature_class (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
       SEQUENCE NAME tracker.creature_class_id_seq
       START WITH 1
       INCREMENT BY 1
       NO MINVALUE
       NO MAXVALUE
       CACHE 1
    ) NOT NULL,
    name TEXT NOT NULL,
    iconUrl TEXT,
    PRIMARY KEY (id)
);

--
-- Create Scenario Outcomes
--
CREATE TABLE tracker.scenario_outcome (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
       SEQUENCE NAME tracker.scenario_outcome_id_seq
       START WITH 1
       INCREMENT BY 1
       NO MINVALUE
       NO MAXVALUE
       CACHE 1
    ) NOT NULL,
    name TEXT NOT NULL,
    PRIMARY KEY (id)
);

--
-- Create Scenario
--
CREATE TABLE tracker.scenario (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
       SEQUENCE NAME tracker.scenario_id_seq
       START WITH 1
       INCREMENT BY 1
       NO MINVALUE
       NO MAXVALUE
       CACHE 1
    ) NOT NULL,
    name TEXT NOT NULL,
    scenario_number NUMBER,
    outcome NUMBER,
    PRIMARY KEY (id),
    CONSTRAINT outcome_fkey FOREIGN KEY ("outcome") REFERENCES parliament.scenario_outcome(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- 
-- Create Player Character
--
CREATE TABLE tracker.player_character (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
       SEQUENCE NAME tracker.player_character_id_seq
       START WITH 1
       INCREMENT BY 1
       NO MINVALUE
       NO MAXVALUE
       CACHE 1
    ) NOT NULL,
    name TEXT NOT NULL UNIQUE,
    class_id NUMBER,
    xp NUMBER,
    level NUMBER,
    perks NUMBER,
    masteries NUMBER,
    PRIMARY KEY (id),
    CONSTRAINT class_id_fkey FOREIGN KEY ("class_id") REFERENCES tracker.character_class(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- 
-- Create Player
--
CREATE TABLE tracker.player (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
       SEQUENCE NAME tracker.player_id_seq
       START WITH 1
       INCREMENT BY 1
       NO MINVALUE
       NO MAXVALUE
       CACHE 1
    ) NOT NULL,
    player_name TEXT NOT NULL UNIQUE,
    characters JSON DEFAULT '[]',
    scenarios JSON DEFAULT '[]',
    current_character NUMBER,
    PRIMARY KEY (id)
);

INSERT INTO tracker.character_class (name) VALUES ('Drifter'), ('Blink Blade'), ('Boneshaper'), ('Banner Spear'), ('Shadow Walker'), ('Geminate'), ('Frozen Fist');

INSERT INTO tracker.status_effect (name) VALUES 
('Poison'), ('Wound'), ('Immobilize'), ('Disarm'), ('Stun'), ('Bane'), ('Brittle'), ('Incapacitate'), ('Muddle'), ('Curse'), ('Renew'), ('Ward'), ('Bless'), ('Strengthen');

INSERT INTO tracker.scenario_outcome (name) VALUES ('Unplayed'), ('Success'), ('Failure'), ('Ongoing');

INSERT INTO tracker.version ("release_id", "file_path") VALUES (0, '0_initial-schema');

COMMIT;
