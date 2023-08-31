const DamageTaken = Object.freeze({
    fields: {
        source_id: 'damageSources',
        burned_card: 'boolean',
        shield: 'number',
        damage: 'number',
    },
    defaults: {
        source_id: 1,
        burnder_card: false,
        shield: 0,
        damage: 0
    }
});

const DamageDealt = Object.freeze({
    fields: {
        source_id: 'damageSources',
        modifier_id: 'attackModifiers',
        damage: 'number'
    },
    defaults: {
        source_id: 2,
        modifier_id: 1,
        damage: 0
    }
});

const CreatureKilled = Object.freeze({
    fields: {
        creature_id: 'creatureClasses',
        creature_level: 'creatureLevels',
    }
});

const CharacterTurn = Object.freeze({
    fields: {
        initiative: 'number',
        hexes_moved: 'number',
        short_rest: 'boolean',
        long_rest: 'boolean'
    },
    defaults: {
        hexes_moved: 0
    }
});

const Healing = Object.freeze({
    fields: {
        healing: 'number',
        cured_poison: 'boolean',
        cured_wound: 'boolean',
        cured_bain: 'boolean',
        cured_brittle: 'boolean'
    }
});

const EventColors = Object.freeze({
    DamageTaken: '#ff9999',
    DamageDealt: '#ccffff',
    CreatureKilled: '#ffff00',
    CharacterEvent: '#ffff99',
    Healing: '#99ff99',
    CharacterTurn: '#a6a6a6'
});

export {
    DamageTaken,
    DamageDealt,
    CreatureKilled,
    CharacterTurn,
    Healing,
    EventColors
};