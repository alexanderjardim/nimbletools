# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nimble Tools is a Progressive Web App (PWA) for the Nimble 2 RPG system that runs entirely in the browser with offline capabilities. It uses React 19 with TypeScript, Vite as the build tool, and stores all data locally using IndexedDB.

## Available Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run lint` - Run ESLint to check code quality
- `npm test` - Run all tests with Vitest
- `npm run preview` - Preview production build locally

## Architecture

### Feature-Based Organization
The codebase follows a feature-based architecture under `src/features/`:

```
src/features/characters/
├── components/          # React components for UI
├── data/               # Static data (ancestries, backgrounds, classes)
├── models/             # Domain models with business logic
└── services/           # Data loading and storage services
```

### Key Architectural Patterns

1. **Domain Models**: Rich domain models in `src/features/characters/models/` handle business logic and validation. The `Character` class is the main aggregate root.

2. **Data Loading Services**: Services in the `services/` directory handle loading static data from JSON files and localStorage operations.

3. **Constants-First Approach**: All game rules and enums are centralized in `src/shared/constants/character.constants.ts` using TypeScript's `const` assertions for type safety.

4. **Single Page Application**: Uses CSS transforms for page transitions (`translateX`) rather than a routing library.

### Core Domain Models

- **Character**: Main entity with stats, skills, saves, and derived values
- **CharacterClass**: Defines hit dice, hit points, and save proficiencies
- **Ancestry**: Provides size and racial traits
- **Background**: Provides character background information
- **Stat**: Handles attribute values with modifiers
- **Save**: Combines class proficiency with stat modifiers

### Data Flow

1. Static game data is loaded from `src/features/characters/data/` files
2. Character creation flows through multi-step wizard components
3. Completed characters are stored locally via `character-storage.service.ts`
4. All data persistence uses IndexedDB through the PWA capabilities

### Testing

- Uses Vitest for unit testing with jsdom environment
- Tests are co-located with their source files (`.test.ts` suffix)
- Setup file at `src/setupTests.ts` for global test configuration

### PWA Configuration

The app is configured as a PWA via `vite-plugin-pwa` with:
- Auto-update registration
- Offline-first approach
- Local data storage only (no server communication)
- Responsive design for mobile and desktop
- use playwright to see the ui state and run end to end tests
- always run ui tests to the viewport of an iphone 14 and a google pixel 7