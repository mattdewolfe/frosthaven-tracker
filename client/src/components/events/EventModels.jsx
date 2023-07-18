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

const CharacterEvent = Object.freeze({
    healing_applied: 'number',
    healing_received: 'number',
    hexes_moved: 'number',
    cards_burned: 'number',
    tokens_looted: 'number'
});

const EventColors = Object.freeze({
    DamageTaken: '#ff9999',
    DamageDealt: '#ccffff',
    CreatureKilled: '#ffff00',
    CharacterEvent: '#ffff99'
});

export {
    DamageTaken,
    DamageDealt,
    CreatureKilled,
    CharacterEvent,
    EventColors
};