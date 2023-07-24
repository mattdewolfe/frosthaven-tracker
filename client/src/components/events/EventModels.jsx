const DamageTaken = Object.freeze({
    fields: {
        source_id: 'damageSources',
        modifier_card: 'string',
        is_poisoned: 'boolean',
        is_brittle: 'boolean',
        is_warded: 'boolean',
        shield: 'number',
        burned_card: 'boolean',
        damage: 'number'
    },
    defaults: {
        shield: 0
    }
});

const DamageDealt = Object.freeze({
    fields: {
        source_id: 'damageSources',
        attack_value: 'number',
        modifier_card: 'string',
        target_poisoned: 'boolean',
        target_brittle: 'boolean',
        target_warded: 'boolean',
        target_shield: 'number',
        burned_card: 'boolean',
        damage: 'number'
    },
    defaults: {
        target_shield: 0
    }
});

const CreatureKilled = Object.freeze({
    fields: {
        creature_id: 'creatureClasses',
        creature_level: 'creatureLevels',
        overkill: 'number'
    },
    defaults: {
        overkill: 0
    }
});

const CharacterTurn = Object.freeze({
    fields: {
        initiative: 'number',
        hexes_moved: 'number',
        long_rest: 'boolean',
        short_rest: 'boolean',
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