import { ICharacterClassData } from '../services/interfaces';

export const characterClassesData: ICharacterClassData[] = [
    {
        id: "berserker",
        name: "The Berserker",
        image: "/assets/class_images/fighter.png",
        teasers: [
            "Damage-dealing machine.",
            "Damage to unbelievable levels.",
            "Use your Savage Arsenal"
        ],
        hitPoints: 20,
        hitDice: {
            dice: "d12",
            quantity: 1
        },
        saves: {
            strength: "Advantaged",
            dexterity: "Normal",
            intelligence: "Disadvantaged",
            will: "Normal"
        }
    },
    {
        id: "cheat",
        name: "The Cheat",
        image: "/assets/class_images/fighter.png",
        teasers: [
            "Break the rules!",
            "Sneak in and backsta.",
            "Fight dirty."
        ],
        hitPoints: 10,
        hitDice: {
            dice: "d6",
            quantity: 1
        },
        saves: {
            strength: "Normal",
            dexterity: "Advantaged",
            intelligence: "Normal",
            will: "Disadvantaged"
        }
    },
    {
        id: "commander",
        name: "The Commander",
        image: "/assets/class_images/fighter.png",
        teasers: [
            "Tactical Commands.",
            "Weapon mastery.",
            "Strategic leadership."
        ],
        hitPoints: 17,
        hitDice: {
            dice: "d10",
            quantity: 1
        },
        saves: {
            strength: "Advantaged",
            dexterity: "Disadvantaged",
            intelligence: "Normal",
            will: "Normal"
        }
    },
    {
        id: "hunter",
        name: "The Hunter",
        image: "/assets/class_images/fighter.png",
        teasers: [
            "Relentless trackers.",
            "Masters of the wild.",
            "Deadly from afar or up close."
        ],
        hitPoints: 13,
        hitDice: {
            dice: "d8",
            quantity: 1
        },
        saves: {
            strength: "Normal",
            dexterity: "Advantaged",
            intelligence: "Disadvantaged",
            will: "Normal"
        }

    }
]