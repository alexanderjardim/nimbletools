# Nimble Tools Development Guidelines

## Project Setup
- Framework: React + Vite
- Language: TypeScript
- Package Manager: npm

## Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Run tests
npm run test

# Run a single test (use grep pattern)
npm run test -- -t "test name"

# Preview production build
npm run preview
```

## Code Style Guidelines

### Imports
- Use absolute imports from `src/`
- Group imports: external libraries, internal modules, local components
- Prefer named exports over default exports
```typescript
import React from 'react';
import { CharacterModel } from 'src/features/characters/models';
```

### Formatting
- Use 2 spaces for indentation
- Max line length: 100 characters
- Prefer arrow functions for components
- Use TypeScript strict mode

### Naming Conventions
- Components: PascalCase (e.g., `CharacterCreationPage`)
- Interfaces/Types: PascalCase (e.g., `CharacterModel`)
- Variables/Functions: camelCase (e.g., `calculateHitPoints`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_LEVEL`)
- Test files: `[original-file].test.ts`

### Type Safety
- Always use explicit types
- Prefer interfaces over type aliases for object shapes
- Use generics for reusable, type-safe code
- Avoid `any` type

### Error Handling
- Prefer throwing typed errors
- Use optional chaining and nullish coalescing
```typescript
const value = data?.property ?? defaultValue;
```

### Testing
- Use Vitest for unit tests
- Aim for high test coverage
- Test edge cases and error scenarios
- Use descriptive test names

### Performance
- Memoize expensive computations
- Use React.memo for pure components
- Lazy load heavy modules

## Git Conventions
- Conventional commits
- Descriptive, concise commit messages
- Squash and merge for feature branches