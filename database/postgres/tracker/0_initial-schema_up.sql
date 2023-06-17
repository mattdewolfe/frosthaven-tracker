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

CREATE SCHEMA IF NOT EXISTS tracker;

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
    iconUrl TEXT,
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
-- Create Creature Level
--
CREATE TABLE tracker.creature_level (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
       SEQUENCE NAME tracker.creature_level_id_seq
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
    scenario_number INTEGER NOT NULL,
    scenario_level INTEGER DEFAULT 1,
    outcome INTEGER,
    PRIMARY KEY (id),
    CONSTRAINT outcome_fkey FOREIGN KEY ("outcome") REFERENCES tracker.scenario_outcome(id) ON UPDATE CASCADE ON DELETE RESTRICT
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
    class_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    xp INTEGER,
    level INTEGER,
    perks INTEGER,
    masteries INTEGER,
    retired BOOLEAN,
    PRIMARY KEY (id),
    CONSTRAINT player_id_fkey FOREIGN KEY ("player_id") REFERENCES tracker.player(id) ON UPDATE CASCADE ON DELETE RESTRICT,
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
    current_character INTEGER,
    PRIMARY KEY (id),
    CONSTRAINT current_character_id_fkey FOREIGN KEY ("current_character") REFERENCES tracker.player_character(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

--
-- Create Events
--
CREATE TABLE tracker.character_event (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
       SEQUENCE NAME tracker.character_event_id_seq
       START WITH 1
       INCREMENT BY 1
       NO MINVALUE
       NO MAXVALUE
       CACHE 1
    ) NOT NULL,
    player_id INTEGER NOT NULL,
    character_id INTEGER NOT NULL,
    damage_dealt INTEGER,
    damage_received INTEGER,
    damage_shielded INTEGER,
    status_applied JSON DEFAULT '[]',
    status_received JSON DEFAULT '[]',
    healing_applied INTEGER,
    healing_received INTEGER,
    hexes_moved INTEGER,
    traps_sprung INTEGER,
    PRIMARY KEY (id),
    CONSTRAINT player_id_fkey FOREIGN KEY ("player_id") REFERENCES tracker.player(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT character_id_fkey FOREIGN KEY ("character_id") REFERENCES tracker.player_character(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE tracker.creature_killed (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
       SEQUENCE NAME tracker.creature_killed_id_seq
       START WITH 1
       INCREMENT BY 1
       NO MINVALUE
       NO MAXVALUE
       CACHE 1
    ) NOT NULL,
    character_id INTEGER NOT NULL,
    creature_id INTEGER NOT NULL,
    creature_level INTEGER DEFAULT 1,
    scenario_level INTEGER DEFAULT 1,
    overkill INTEGER DEFAULT 0,
    CONSTRAINT character_id_fkey FOREIGN KEY ("character_id") REFERENCES tracker.player_character(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT creature_id_fkey FOREIGN KEY ("creature_id") REFERENCES tracker.creature_class(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT character_level_fkey FOREIGN KEY ("creature_level") REFERENCES tracker.creature_level(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

INSERT INTO tracker.creature_level (name) VALUES ('Normal'), ('Elite'), ('Boss'), ('Objective'), ('Other');

INSERT INTO tracker.creature_class (name, iconUrl) VALUES 
('Abael Herder', '/images/abael-herder.png'), 
('Abael Scout', '/images/algox-scout.png'),
('Algox Archer', '/images/algox-archer.png'),
('Algox Guard', '/images/algox-guard.png'),
('Algox Icespeaker', '/images/algox-icespeaker.png'),
('Algox Priest', '/images/algox-priest.png'),
('Algox Scout', '/images/algox-scout.png'),
('Algox Snowspeaker', '/images/algox-snowspeaker.png'),
('Algox Stormcaller', '/images/algox-stormcaller.png'),
('Ancient Artillery', '/images/ancient-artillery.png'),
('Black Imp', '/images/black-imp.png'),
('Burrowing Blade', '/images/burrowing-blade.png'),
('Chaos Demon', '/images/chaos-demon.png'),
('City Guard', '/images/city-guard.png'),
('Deep Terror', '/images/deep-terror.png'),
('Earth Demon', '/images/earth-demon.png'),
('Flame Demon', '/images/flame-demon.png'),
('Flaming Bladespinner', '/images/flaming-bladespinner.png'),
('Forest Imp', '/images/forest-imp.png'),
('Forst Demon', '/images/frost-demon.png'),
('Frozen Corpse', '/images/frozen-corpse.png'),
('Harrower Infester', '/images/harrow-infester.png'),
('Hound', '/images/hound.png'),
('Ice Wraith', '/images/ice-wraith.png'),
('Lightning Eel', '/images/lightning-eel.png'),
('Living Bones', '/images/living-bones.png'),
('Living Doom', '/images/living-doom.png'),
('Living Spirit', '/images/living-spirit.png'),
('Lurker Clawcrusher', '/images/lurker-clawcrusher.png'),
('Lurker Mindsnapper', '/images/lurker-mindsnapper.png'),
('Lurker Soldier', '/images/lurker-soldier.png'),
('Lurker Wavethrower', '/images/lurker-wavethrower.png'),
('Night Demon', '/images/night-demon.png'),
('Ooze', '/images/ooze.png'),
('Piranha Pig', '/images/piranha-pig.png'),
('Polar Bear', '/images/polar-bear.png'),
('Rendering Drake', '/images/rendering-drake.png'),
('Robotic Boltshooter', '/images/robot-boltshooter.png'),
('Ruined Machine', '/images/ruined-machine.png'),
('Savvas Icestorm', '/images/savvas-icestorm.png'),
('Savvas Lavaflow', '/images/savvas-lavaflow.png'),
('Shrike Fiend', '/images/shrike-fiend.png'),
('Snow Imp', '/images/snow-imp.png'),
('Spitting Drake', '/images/spitting-drake.png'),
('Steel Automaton', '/images/steel-automaton.png'),
('Sun Demon', '/images/sun-demon.png'),
('Vermling Priest', '/images/vermling-priest.png'),
('Vermling Scout', '/images/vermling-scout.png'),
('Wind Demon', '/images/wind-demon.png'),
('[b]Frozen Fist', '/images/frozen-fist.png'),
('[b]Elder Ooze', '/images/elder-ooze.png'),
('[b]Fish King', '/images/fish-king.png'),
('[b]Fracture of the Deep', '/images/fracture-of-the-deep.png'),
('[b]Harbringer of Shadow', '/images/harbringer-of-shadow.png'),
('[b]Lord of Chaos', '/images/lord-of-chaos.png'),
('[b]Orphan', '/images/orphan.png'),
('[b]Prince of Frost', '/images/prince-of-frost.png'),
('[b]Program Directory', '/images/program-directory.png'),
('[b]Render', '/images/render.png'),
('[b]Seeker of the Abyss', '/images/seeker-of-the-abyss.png'),
('[b]Snowdancer', '/images/snowdancer.png'),
('[b]The Collector', '/images/the-collector.png'),
('[b]The Relic', '/images/the-relic.png'),
('[b]Vestige of the Imprisoned God', '/images/vestige-of-the-imprisoned-god.png');

INSERT INTO tracker.character_class (name) VALUES ('Drifter'), ('Blink Blade'), ('Boneshaper'), ('Banner Spear'), ('Shadow Walker'), ('Geminate'), ('Frozen Fist');

INSERT INTO tracker.status_effect (name) VALUES 
('Poison'), ('Wound'), ('Immobilize'), ('Disarm'), ('Stun'), ('Bane'), ('Brittle'), ('Incapacitate'), ('Muddle'), ('Curse'), ('Renew'), ('Ward'), ('Bless'), ('Strengthen');

INSERT INTO tracker.scenario_outcome (name) VALUES ('Unplayed'), ('Success'), ('Failure'), ('Ongoing');

INSERT INTO tracker.version ("release_id", "file_path") VALUES (0, '0_initial-schema');

COMMIT;
