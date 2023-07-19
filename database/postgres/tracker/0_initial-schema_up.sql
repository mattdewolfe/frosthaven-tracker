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
    icon_url TEXT,
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
    icon_url TEXT,
    PRIMARY KEY (id)
);

--
-- Create Elements
--
CREATE TABLE tracker.element (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
       SEQUENCE NAME tracker.element_id_seq
       START WITH 1
       INCREMENT BY 1
       NO MINVALUE
       NO MAXVALUE
       CACHE 1
    ) NOT NULL,
    name TEXT NOT NULL UNIQUE,
    icon_url TEXT,
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
    icon_url TEXT,
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
    name TEXT NOT NULL UNIQUE,
    PRIMARY KEY (id)
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
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    perks INTEGER DEFAULT 0,
    masteries INTEGER DEFAULT 0,
    retired BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id),
    CONSTRAINT player_id_fkey FOREIGN KEY ("player_id") REFERENCES tracker.player(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT class_id_fkey FOREIGN KEY ("class_id") REFERENCES tracker.character_class(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

--
-- Create Events, used to track general overall stats (most likely on a per round basis)
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
    scenario_id INTEGER NOT NULL,
    character_id INTEGER NOT NULL,
    healing_applied INTEGER DEFAULT NULL,
    healing_received INTEGER DEFAULT NULL,
    hexes_moved INTEGER DEFAULT NULL,
    cards_burned INTEGER DEFAULT NULL,
    tokens_looted INTEGER DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT player_id_fkey FOREIGN KEY ("player_id") REFERENCES tracker.player(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT character_id_fkey FOREIGN KEY ("character_id") REFERENCES tracker.player_character(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT scenario_fkey FOREIGN KEY ("scenario_id") REFERENCES tracker.scenario(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

--
-- Create Creature Killed entry, for tracking which player has killed what monsters
--
CREATE TABLE tracker.creature_killed (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
       SEQUENCE NAME tracker.creature_killed_id_seq
       START WITH 1
       INCREMENT BY 1
       NO MINVALUE
       NO MAXVALUE
       CACHE 1
    ) NOT NULL,
    player_id INTEGER NOT NULL,
    character_id INTEGER NOT NULL,
    creature_id INTEGER NOT NULL,
    scenario_id INTEGER NOT NULL,
    creature_level INTEGER DEFAULT 1,
    scenario_level INTEGER DEFAULT 1,
    overkill INTEGER DEFAULT 0,
    CONSTRAINT player_id_fkey FOREIGN KEY ("player_id") REFERENCES tracker.player(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT character_id_fkey FOREIGN KEY ("character_id") REFERENCES tracker.player_character(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT creature_id_fkey FOREIGN KEY ("creature_id") REFERENCES tracker.creature_class(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT character_level_fkey FOREIGN KEY ("creature_level") REFERENCES tracker.creature_level(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT scenario_fkey FOREIGN KEY ("scenario_id") REFERENCES tracker.scenario(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

--
-- Create Damage Source table, used in damage events to denote where damage taken came from
--
CREATE TABLE tracker.damage_source (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
       SEQUENCE NAME tracker.damage_source_id
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
-- Create table for tracking damage dealth by characters
--
CREATE TABLE tracker.damage_dealt (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
       SEQUENCE NAME tracker.damage_dealt_id
       START WITH 1
       INCREMENT BY 1
       NO MINVALUE
       NO MAXVALUE
       CACHE 1
    ) NOT NULL,
    source_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    scenario_id INTEGER NOT NULL,
    character_id INTEGER NOT NULL,
    attack_value INTEGER DEFAULT NULL,
    modifier_card VARCHAR DEFAULT NULL,
    target_poisoned BOOLEAN DEFAULT FALSE,
    target_brittle BOOLEAN DEFAULT FALSE,
    target_warded BOOLEAN DEFAULT FALSE,
    target_shield INTEGER DEFAULT 0,
    burned_card BOOLEAN DEFAULT FALSE,
    damage INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    CONSTRAINT player_id_fkey FOREIGN KEY ("player_id") REFERENCES tracker.player(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT character_id_fkey FOREIGN KEY ("character_id") REFERENCES tracker.player_character(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT scenario_fkey FOREIGN KEY ("scenario_id") REFERENCES tracker.scenario(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT damage_source_fkey FOREIGN KEY ("source_id") REFERENCES tracker.damage_source(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

--
-- Create table for tracking damage taken by characters
--
CREATE TABLE tracker.damage_taken (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
       SEQUENCE NAME tracker.damage_taken_id
       START WITH 1
       INCREMENT BY 1
       NO MINVALUE
       NO MAXVALUE
       CACHE 1
    ) NOT NULL,
    source_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    scenario_id INTEGER NOT NULL,
    character_id INTEGER NOT NULL,
    modifier_card VARCHAR DEFAULT NULL,
    is_poisoned BOOLEAN DEFAULT FALSE,
    is_brittle BOOLEAN DEFAULT FALSE,
    is_warded BOOLEAN DEFAULT FALSE,
    shield INTEGER DEFAULT 0,
    burned_card BOOLEAN DEFAULT FALSE,
    damage INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    CONSTRAINT player_id_fkey FOREIGN KEY ("player_id") REFERENCES tracker.player(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT character_id_fkey FOREIGN KEY ("character_id") REFERENCES tracker.player_character(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT scenario_fkey FOREIGN KEY ("scenario_id") REFERENCES tracker.scenario(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT damage_source_fkey FOREIGN KEY ("source_id") REFERENCES tracker.damage_source(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE tracker.status_applied (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
       SEQUENCE NAME tracker.status_applied_id
       START WITH 1
       INCREMENT BY 1
       NO MINVALUE
       NO MAXVALUE
       CACHE 1
    ) NOT NULL,
    scenario_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    character_id INTEGER NOT NULL,
    status_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT scenario_fkey FOREIGN KEY ("scenario_id") REFERENCES tracker.scenario(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT player_id_fkey FOREIGN KEY ("player_id") REFERENCES tracker.player(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT character_id_fkey FOREIGN KEY ("character_id") REFERENCES tracker.player_character(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT status_id_fkey FOREIGN KEY ("status_id") REFERENCES tracker.status_effect(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE tracker.status_received (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
       SEQUENCE NAME tracker.status_received_id
       START WITH 1
       INCREMENT BY 1
       NO MINVALUE
       NO MAXVALUE
       CACHE 1
    ) NOT NULL,
    scenario_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    character_id INTEGER NOT NULL,
    status_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT scenario_fkey FOREIGN KEY ("scenario_id") REFERENCES tracker.scenario(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT player_id_fkey FOREIGN KEY ("player_id") REFERENCES tracker.player(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT character_id_fkey FOREIGN KEY ("character_id") REFERENCES tracker.player_character(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT status_id_fkey FOREIGN KEY ("status_id") REFERENCES tracker.status_effect(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE tracker.element_generated (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
       SEQUENCE NAME tracker.element_generated_id
       START WITH 1
       INCREMENT BY 1
       NO MINVALUE
       NO MAXVALUE
       CACHE 1
    ) NOT NULL,
    scenario_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    character_id INTEGER NOT NULL,
    element_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT scenario_fkey FOREIGN KEY ("scenario_id") REFERENCES tracker.scenario(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT player_id_fkey FOREIGN KEY ("player_id") REFERENCES tracker.player(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT character_id_fkey FOREIGN KEY ("character_id") REFERENCES tracker.player_character(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT element_id_fkey FOREIGN KEY ("element_id") REFERENCES tracker.element(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE tracker.element_consumed (
    id INTEGER GENERATED ALWAYS AS IDENTITY (
       SEQUENCE NAME tracker.element_consumed_id
       START WITH 1
       INCREMENT BY 1
       NO MINVALUE
       NO MAXVALUE
       CACHE 1
    ) NOT NULL,
    scenario_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    character_id INTEGER NOT NULL,
    element_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT scenario_fkey FOREIGN KEY ("scenario_id") REFERENCES tracker.scenario(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT player_id_fkey FOREIGN KEY ("player_id") REFERENCES tracker.player(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT character_id_fkey FOREIGN KEY ("character_id") REFERENCES tracker.player_character(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT element_id_fkey FOREIGN KEY ("element_id") REFERENCES tracker.element(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

INSERT INTO tracker.creature_level (name) VALUES ('Normal'), ('Elite'), ('Boss'), ('Objective'), ('Other');

INSERT INTO tracker.damage_source (name) VALUES ('Creature'), ('Player'), ('Self'), ('Retaliate'), ('Wound'), ('Bane'), ('Terrain'), ('Trap'), ('Short Rest'), ('Scenario'), ('Objective'), ('Other');

INSERT INTO tracker.character_class (name, icon_url) VALUES 
('Blink Blade', '/images/characters/fh-blinkblade.png'), 
('Banner Spear', '/images/characters/fh-banner-spear.png'), 
('Boneshaper', '/images/characters/fh-boneshaper.png'), 
('Crashing Tide', '/images/characters/fh-crashing-tide.png'), 
('Deathwalker', '/images/characters/fh-deathwalker.png'), 
('DW', '/images/characters/fh-locked-character.png'), 
('Drifter', '/images/characters/fh-drifter.png'), 
('Frozen Fist', '/images/characters/fh-frozen-fist.png'), 
('Geminate', '/images/characters/fh-geminate.png'), 
('HI', '/images/characters/fh-locked-character.png'), 
('IN', '/images/characters/fh-locked-character.png'), 
('ME', '/images/characters/fh-locked-character.png'), 
('PA', '/images/characters/fh-locked-character.png'), 
('PY', '/images/characters/fh-locked-character.png'), 
('SH', '/images/characters/fh-locked-character.png'), 
('SN', '/images/characters/fh-locked-character.png'), 
('TR', '/images/characters/fh-locked-character.png');

INSERT INTO tracker.status_effect (name, icon_url) VALUES 
('Bane','/images/status_effects/fh-bane.png'), 
('Bless','/images/status_effects/fh-bless.png'), 
('Brittle','/images/status_effects/fh-brittle.png'),
('Curse','/images/status_effects/fh-curse.png'), 
('Disarm','/images/status_effects/fh-disarm.png'),
('Immobilize','/images/status_effects/fh-immobilize.png'),
('Impair','/images/status_effects/fh-impair.png'),
('Invisible','/images/status_effects/fh-invisible.png'),
('Muddle','/images/status_effects/fh-muddle.png'), 
('Pierce','/images/status_effects/fh-pierce.png'), 
('Poison','/images/status_effects/fh-poison.png'), 
('Pull','/images/status_effects/fh-pull.png'), 
('Push','/images/status_effects/fh-push.png'),
('Regenerate','/images/status_effects/fh-regenerate.png'), 
('Strengthen','/images/status_effects/fh-strengthen.png'),
('Stun','/images/status_effects/fh-stun.png'), 
('Ward','/images/status_effects/fh-ward.png'), 
('Wound','/images/status_effects/fh-wound.png');

INSERT INTO tracker.element (name, icon_url) VALUES
('Air', '/images/elements/fh-air.png'),
('Dark', '/images/elements/fh-dark.png'),
('Earth', '/images/elements/fh-earth.png'),
('Fire', '/images/elements/fh-fire.png'),
('Ice', '/images/elements/fh-ice.png'),
('Light', '/images/elements/fh-light.png');

INSERT INTO tracker.scenario_outcome (name) VALUES ('Unplayed'), ('Success'), ('Failure'), ('Ongoing');

INSERT INTO tracker.player (name) VALUES ('Gord'), ('Mark'), ('Matt');

INSERT INTO tracker.creature_class (name, icon_url) VALUES 
('Abael Herder', '/images/creatures/fh-abael-herder.png'), 
('Abael Scout', '/images/creatures/fh-algox-scout.png'),
('Algox Archer', '/images/creatures/fh-algox-archer.png'),
('Algox Guard', '/images/creatures/fh-algox-guard.png'),
('Algox Icespeaker', '/images/creatures/fh-algox-icespeaker.png'),
('Algox Priest', '/images/creatures/fh-algox-priest.png'),
('Algox Scout', '/images/creatures/fh-algox-scout.png'),
('Algox Snowspeaker', '/images/creatures/fh-algox-snowspeaker.png'),
('Algox Stormcaller', '/images/creatures/fh-algox-stormcaller.png'),
('Ancient Artillery', '/images/creatures/fh-ancient-artillery.png'),
('Black Imp', '/images/creatures/fh-black-imp.png'),
('Burrowing Blade', '/images/creatures/fh-burrowing-blade.png'),
('Chaos Demon', '/images/creatures/fh-chaos-demon.png'),
('City Guard', '/images/creatures/fh-city-guard.png'),
('Deep Terror', '/images/creatures/fh-deep-terror.png'),
('Earth Demon', '/images/creatures/fh-earth-demon.png'),
('Flame Demon', '/images/creatures/fh-flame-demon.png'),
('Flaming Bladespinner', '/images/creatures/fh-flaming-bladespinner.png'),
('Forest Imp', '/images/creatures/fh-forest-imp.png'),
('Forst Demon', '/images/creatures/fh-frost-demon.png'),
('Frozen Corpse', '/images/creatures/fh-frozen-corpse.png'),
('Harrower Infester', '/images/creatures/fh-harrower-infester.png'),
('Hound', '/images/creatures/fh-hound.png'),
('Ice Wraith', '/images/creatures/fh-ice-wraith.png'),
('Lightning Eel', '/images/creatures/fh-lightning-eel.png'),
('Living Bones', '/images/creatures/fh-living-bones.png'),
('Living Doom', '/images/creatures/fh-living-doom.png'),
('Living Spirit', '/images/creatures/fh-living-spirit.png'),
('Lurker Clawcrusher', '/images/creatures/fh-lurker-clawcrusher.png'),
('Lurker Mindsnipper', '/images/creatures/fh-lurker-mindsnipper.png'),
('Lurker Soldier', '/images/creatures/fh-lurker-soldier.png'),
('Lurker Wavethrower', '/images/creatures/fh-lurker-wavethrower.png'),
('Night Demon', '/images/creatures/fh-night-demon.png'),
('Ooze', '/images/creatures/fh-ooze.png'),
('Piranha Pig', '/images/creatures/fh-piranha-pig.png'),
('Polar Bear', '/images/creatures/fh-polar-bear.png'),
('Rending Drake', '/images/creatures/fh-rending-drake.png'),
('Robotic Boltshooter', '/images/creatures/fh-robotic-boltshooter.png'),
('Ruined Machine', '/images/creatures/fh-ruined-machine.png'),
('Savvas Icestorm', '/images/creatures/fh-savvas-icestorm.png'),
('Savvas Lavaflow', '/images/creatures/fh-savvas-lavaflow.png'),
('Shrike Fiend', '/images/creatures/fh-shrike-fiend.png'),
('Snow Imp', '/images/creatures/fh-snow-imp.png'),
('Spitting Drake', '/images/creatures/fh-spitting-drake.png'),
('Steel Automaton', '/images/creatures/fh-steel-automaton.png'),
('Sun Demon', '/images/creatures/fh-sun-demon.png'),
('Vermling Priest', '/images/creatures/fh-vermling-priest.png'),
('Vermling Scout', '/images/creatures/fh-vermling-scout.png'),
('Wind Demon', '/images/creatures/fh-wind-demon.png'),
('[b]Frozen Fist', '/images/creatures/fh-frozen-fist.png'),
('[b]Elder Ooze', '/images/creatures/fh-elder-ooze.png'),
('[b]Fish King', '/images/creatures/fh-fish-king.png'),
('[b]Fracture of the Deep', '/images/creatures/fh-fracture-of-the-deep.png'),
('[b]Harbringer of Shadow', '/images/creatures/fh-harbringer-of-shadow.png'),
('[b]Lord of Chaos', '/images/creatures/fh-lord-of-chaos.png'),
('[b]Orphan', '/images/creatures/fh-the-orphan.png'),
('[b]Prince of Frost', '/images/creatures/fh-prince-of-frost.png'),
('[b]Program Directory', '/images/creatures/fh-program-directory.png'),
('[b]Render', '/images/creatures/fh-the-render.png'),
('[b]Seeker of the Abyss', '/images/creatures/fh-seeker-of-the-abyss.png'),
('[b]Snowdancer', '/images/creatures/fh-snowdancer.png'),
('[b]The Collector', '/images/creatures/fh-the-collector.png'),
('[b]The Relic', '/images/creatures/fh-the-relic.png'),
('[b]Vestige of the Imprisoned God', '/images/creatures/fh-vestige-of-the-imprisoned-god.png');

INSERT INTO tracker.version (release_id, file_path) VALUES (0, '0_initial-schema');

COMMIT;
