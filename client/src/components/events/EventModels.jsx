const DamageTaken = Object.freeze({
    source_id: 'damageSources',
    modifier_card: 'string',
    is_poisoned: 'boolean',
    is_brittle: 'boolean',
    is_warded: 'boolean',
    shield: 'number',
    burned_card: 'boolean',
    damage: 'number'
});

const DamageDealt = Object.freeze({
    source_id: 'damageSources',
    attack_value: 'number',
    modifier_card: 'string',
    target_poisoned: 'boolean',
    target_brittle: 'boolean',
    target_warded: 'boolean',
    target_shield: 'number',
    burned_card: 'boolean',
    damage: 'number'
});

const CreatureKilled = Object.freeze({
    creature_id: 'creatureClasses',
    creature_level: 'creatureLevels',
    overkill: 'number'
});

const CharacterTurn = Object.freeze({
    initiative: 'number',
    hexes_moved: 'number',
    long_rest: 'boolean',
    short_rest: 'boolean'
});

const Healing = Object.freeze({
    healing: 'number',
    cured_poison: 'boolean',
    cured_wound: 'boolean',
    cured_bain: 'boolean',
    cured_brittle: 'boolean'
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