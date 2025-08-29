# Nimble Tools

A comprehensive character creation and management application for the Nimble 2 RPG system. This Progressive Web App (PWA) provides an intuitive interface for creating and managing RPG characters with full offline functionality.

## 🏗️ Technology Stack

### Frontend Framework
- **React 19** - Modern React with latest features and hooks
- **TypeScript** - Type-safe development with full IntelliSense support
- **Vite** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing and optimization
- **Custom Design System** - Medieval/fantasy themed UI with responsive design

### Development Tools
- **ESLint** - Code linting and quality enforcement
- **Prettier** - Code formatting
- **Vitest** - Fast unit testing framework
- **Playwright** - End-to-end testing
- **Testing Library** - React component testing utilities

### Data & Storage
- **IndexedDB** - Client-side database for offline data persistence
- **Zod** - TypeScript-first schema validation
- **Custom Storage Services** - Type-safe data management layer

### Build & Deployment
- **Vite PWA Plugin** - Progressive Web App functionality
- **Autoprefixer** - CSS vendor prefixing

## ✨ Features

### Character Management
- **Complete Character Creation** - Step-by-step guided character creation process
- **Character Storage** - Persistent local storage with IndexedDB
- **Character Overview** - Detailed character cards with stats and information
- **Character Deletion** - Safe character removal with confirmation

### Character Creation Process
1. **Choose Class** - Select from available character classes (Berserker, Cheat, Commander, Hunter)
2. **Choose Ancestry** - Select character ancestry/background
3. **Choose Background** - Select character background/profession
4. **Assign Stats** - Distribute ability points (Strength, Dexterity, Intelligence, Will)
5. **Assign Skills** - Allocate skill points based on class and background
6. **Character Details** - Set name, age, height, weight, and other details

### Technical Features
- **Progressive Web App (PWA)** - Installable on mobile and desktop
- **Offline First** - Full functionality without internet connection
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **State Persistence** - Remembers user progress and settings
- **Type Safety** - Full TypeScript coverage with runtime validation
- **Modern UI/UX** - Smooth animations and intuitive navigation

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nimble-tools
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### First Time Setup
The application will automatically:
- Set up the development environment
- Install PWA service worker for offline functionality
- Initialize local storage for character data

## 🛠️ Development

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready application |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run test` | Run unit tests with Vitest |
| `npm run test:e2e` | Run end-to-end tests with Playwright |

### Development Workflow

1. **Make Changes** - Edit files in the `src/` directory
2. **Check Code Quality** - Run `npm run lint` to ensure code standards
3. **Test Changes** - Run `npm run test` for unit tests
4. **Build & Test** - Run `npm run build` to verify production build

### Project Structure

```
src/
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
├── index.css              # Global styles and Tailwind imports
├── features/
│   └── characters/        # Character management feature
│       ├── components/    # React components
│       │   ├── CharactersPage.tsx
│       │   ├── CharacterCreationPage.tsx
│       │   └── characterCreation/  # Creation workflow components
│       ├── data/          # Static data files
│       ├── models/        # TypeScript interfaces and types
│       └── services/      # Data access and business logic
├── shared/                # Shared utilities and constants
└── assets/                # Static assets (images, icons)
```

### Key Components

- **App.tsx** - Main application router and layout
- **CharactersPage.tsx** - Character list and management
- **CharacterCreationPage.tsx** - Multi-step character creation wizard
- **Character Storage Service** - IndexedDB data persistence
- **Data Loaders** - Static data management for classes, ancestries, etc.

## 🧪 Testing

### Unit Tests
Run unit tests with:
```bash
npm run test
```

### End-to-End Tests
Run E2E tests with:
```bash
npm run test:e2e
```

### Test Coverage
- Component rendering and interactions
- Data persistence and retrieval
- Form validation and error handling
- PWA functionality and offline behavior

## 📱 Progressive Web App (PWA)

This application is a fully functional PWA that can be:
- **Installed** on mobile devices and desktop
- **Used Offline** with full functionality
- **Updated Automatically** when new versions are available

### Installation
1. Open the app in a supported browser (Chrome, Edge, Safari)
2. Click "Install" or "Add to Home Screen"
3. The app will be available as a native application

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deployment Options
- **Static Hosting** - Deploy to Netlify, Vercel, GitHub Pages
- **CDN** - Serve static files from any CDN
- **Self-hosted** - Deploy to any web server

### Environment Variables
No environment variables are required for basic functionality. All configuration is handled at build time.

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and ensure tests pass
4. **Commit your changes** (`git commit -m 'Add amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Code Standards
- Follow TypeScript best practices
- Use functional React components with hooks
- Maintain test coverage for new features
- Follow existing code formatting (Prettier)
- Use meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Include browser version, device type, and steps to reproduce

## 🎯 Roadmap

- [ ] Additional character classes
- [ ] Character advancement system
- [ ] Campaign management
- [ ] Character import/export
- [ ] Theme customization
- [ ] Multi-language support