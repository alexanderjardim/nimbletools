# Characters Feature Module

This feature module provides comprehensive character creation and management functionality for the Nimble 2 RPG system. It implements a complete character creation workflow with persistent local storage and follows domain-driven design principles.

## 🎯 Overview

The Characters feature is the core functionality of Nimble Tools, enabling users to create, manage, and store RPG characters locally in their browser. The module is designed as a self-contained feature with its own models, services, and UI components.

## ✨ Supported Features

### Character Creation Workflow

A guided 7-step character creation process:

1. **Choose Class** - Select from available character classes
2. **Choose Ancestry** - Select character ancestry/background
3. **Choose Background** - Select character background/profession
4. **Assign Stats** - Distribute ability points (Strength, Dexterity, Intelligence, Will)
5. **Assign Skills** - Allocate skill points based on class and background
6. **Character Details** - Set name, age, height, weight, and other details
7. **Review Character** - Review complete character sheet and confirm creation

### Character Management

- **Persistent Storage** - Characters saved locally using IndexedDB
- **Character List** - View all created characters with stats overview
- **Character Details** - Detailed character information display
- **Character Deletion** - Safe character removal with confirmation
- **State Persistence** - Remembers user progress and selections
- **Character Review** - Final review step before character creation with editing options

### Character Classes

Currently supported character classes:

| Class         | Hit Points | Hit Dice | Key Features                                               |
| ------------- | ---------- | -------- | ---------------------------------------------------------- |
| **Berserker** | 20         | d12      | Damage-dealing machine, Savage Arsenal                     |
| **Cheat**     | 10         | d6       | Break the rules, Sneak attacks, Fight dirty                |
| **Commander** | 17         | d10      | Tactical Commands, Weapon mastery, Strategic leadership    |
| **Hunter**    | 13         | d8       | Relentless trackers, Masters of the wild, Deadly from afar |

### Character Stats & Skills

- **Core Stats**: Strength, Dexterity, Intelligence, Will
- **Skill System**: 12 skills maximum per character (stat + skill points)
- **Save System**: Advantage/Disadvantage based on class
- **Hit Points**: Class-based with hit dice for advancement

## 🏗️ Architecture

### Feature Structure

```
src/features/characters/
├── components/           # React UI components
│   ├── CharactersPage.tsx          # Main character list page
│   ├── CharacterCreationPage.tsx   # Character creation workflow
│   └── characterCreation/          # Creation step components
├── data/                 # Static game data
│   ├── ancestries.data.ts          # Ancestry definitions
│   ├── backgrounds.data.ts         # Background definitions
│   └── character-classes.data.ts   # Character class definitions
├── models/               # Domain models and types
│   ├── character.model.ts          # Main Character class
│   ├── character-class.model.ts    # Character class model
│   ├── ancestry.model.ts           # Ancestry model
│   ├── background.model.ts         # Background model
│   ├── stat.model.ts               # Stat model with modifiers
│   ├── skill.model.ts              # Skill definitions
│   ├── save.model.ts               # Save model
│   └── hit-dice.model.ts           # Hit dice model
├── services/             # Business logic and data access
│   ├── character-storage.service.ts    # IndexedDB storage
│   ├── *-data-loader.service.ts        # Data loading services
│   └── interfaces.ts                   # Service interfaces
└── README.md             # This file
```

### Key Components

#### Models

- **Character**: Main domain model with validation and business logic
- **CharacterClass**: Class-specific properties (hit points, saves, etc.)
- **Ancestry**: Racial/cultural background with size and traits
- **Background**: Professional/cultural background with skill bonuses
- **Stat**: Ability scores with automatic modifier calculation
- **Skill**: Individual skills with stat associations

#### Services

- **CharacterStorageService**: Handles IndexedDB operations for character persistence
- **DataLoader Services**: Load static game data (classes, ancestries, backgrounds)
- **Validation**: Runtime validation using Zod schemas

#### UI Components

- **CharactersPage**: Main character management interface
- **CharacterCreationPage**: Multi-step creation wizard
- **CharacterReview**: Final review step with complete character sheet
- **Step Components**: Individual steps in the creation process
- **StepGuide**: Progress indicator for creation workflow

## 🔧 Technical Implementation

### Data Persistence

- **IndexedDB**: Client-side database for offline character storage
- **Local Storage**: Backup for small data and user preferences
- **No Server Dependency**: All data stored locally in the browser

### State Management

- **React State**: Component-level state management
- **Service Layer**: Centralized business logic
- **Event-driven**: Components communicate through props and callbacks

### Validation & Type Safety

- **TypeScript**: Full type coverage for all models and services
- **Zod Schemas**: Runtime validation for data integrity
- **Domain Models**: Business logic encapsulated in model classes

### Testing

- **Unit Tests**: Model and service testing with Vitest
- **Component Tests**: React component testing with Testing Library
- **Integration Tests**: End-to-end testing with Playwright

## 🚀 Usage

### Basic Character Creation Flow

```typescript
// 1. Select character class
const characterClass = await CharacterClassDataLoader.getById("berserker");

// 2. Select ancestry and background
const ancestry = await AncestryDataLoader.getById("human");
const background = await BackgroundDataLoader.getById("warrior");

// 3. Assign stats and skills
const stats = new Map([
  ["strength", 16],
  ["dexterity", 12],
  ["intelligence", 10],
  ["will", 14],
]);
const skills = new Map([
  ["athletics", 3],
  ["intimidation", 2],
]);

// 4. Create character
const character = new Character(
  "Thorgar Bloodaxe",
  1,
  characterClass,
  ancestry,
  background,
  stats,
  skills,
  72, // height in inches
  220, // weight in pounds
);

// 5. Save to storage
await CharacterStorageService.saveCharacter(character);
```

### Loading Characters

```typescript
// Load all characters
const characters = CharacterStorageService.getAllCharacters();

// Load specific character
const character = CharacterStorageService.getCharacterById("character-id");
```

## 🎮 Game Rules Implementation

### Character Stats

- **Range**: 1-20 for base stats
- **Modifiers**: Automatic calculation (-5 to +5)
- **Point Buy**: 27 points to distribute among stats

### Skills

- **Maximum**: 12 points per skill (stat modifier + skill points)
- **Associations**: Each skill linked to a core stat
- **Proficiency**: Class and background provide skill bonuses

### Saves

- **Advantage/Disadvantage**: Based on character class
- **Base Calculation**: 10 + stat modifier + proficiency bonus

### Hit Points

- **Base**: Determined by character class
- **Advancement**: Hit dice rolled for level progression
- **Temporary HP**: Additional HP that don't stack

## 🔮 Future Enhancements

### Planned Features

- [ ] Character advancement system
- [ ] Equipment and inventory management
- [ ] Spell system for spellcasting classes
- [ ] Character import/export functionality
- [ ] Character templates and quick creation
- [ ] Multi-classing support
- [ ] Feat system

### Technical Improvements

- [ ] GraphQL API integration (when backend is available)
- [ ] Real-time character sync across devices
- [ ] Advanced character search and filtering
- [ ] Character comparison tools
- [ ] Character history and versioning

## 📝 Contributing

When working with the Characters feature:

1. **Follow the established patterns** for models, services, and components
2. **Add tests** for new functionality
3. **Update this README** when adding new features
4. **Maintain type safety** across all new code
5. **Test in multiple browsers** for compatibility

### Adding New Character Classes

1. Add class data to `character-classes.data.ts`
2. Create or update class-specific models if needed
3. Add UI components for class selection
4. Update tests and validation schemas

### Adding New Features

1. Create feature branch from `main`
2. Implement in appropriate layer (models/services/components)
3. Add comprehensive tests
4. Update documentation
5. Submit pull request with detailed description

## 🐛 Troubleshooting

### Common Issues

- **Characters not saving**: Check IndexedDB support in browser
- **Validation errors**: Ensure all required fields are provided
- **Performance issues**: Check for memory leaks in component state
- **Display issues**: Verify Tailwind CSS classes are properly imported

### Debug Mode

Enable debug logging by setting `localStorage.debug = 'characters:*'` in browser console.

## 📚 Related Documentation

- [Main Project README](../../README.md) - Overall project documentation
- [Testing Guide](../../README.md#testing) - Testing setup and guidelines
- [Contributing Guide](../../README.md#contributing) - Contribution guidelines
- [Deployment Guide](../../README.md#deployment) - Deployment instructions
