// All your static arrays and the types derived from them go here.
// This centralizes your game's "rules" and makes them reusable.

export const SIZE = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"] as const;
export type Size = typeof SIZE[number];

export const HIT_DICE_TYPES = ["d6", "d8", "d10", "d12"] as const;
export type HitDiceType = typeof HIT_DICE_TYPES[number];

export const SAVE_TYPES = ["Advantaged", "Disadvantaged", "Normal"] as const;
export type SaveType = typeof SAVE_TYPES[number];

export const STAT_NAMES = ["strength", "dexterity", "intelligence", "will"] as const;
export type StatName = typeof STAT_NAMES[number];

export const SKILL_STATS = {
    "arcana": "intelligence",
    "examination": "intelligence",
    "finesse": "dexterity",
    "influence": "will",
    "insight": "intelligence",
    "lore": "intelligence",
    "might": "strength",
    "naturecraft": "intelligence",
    "perception": "dexterity",
    "stealth": "dexterity"
} as const;

// You can also add your SKILL_NAMES constant here
export const SKILL_NAMES = Object.keys(SKILL_STATS) as (keyof typeof SKILL_STATS)[];
export type SkillName = keyof typeof SKILL_STATS;