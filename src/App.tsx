import React, { useState } from 'react';
import './App.css';
import CharactersPage from './components/CharactersPage';
import CharacterCreationPage from './components/CharacterCreationPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'main' | 'Characters' | 'CharacterCreation'>('main');

  const handleMenuClick = (page: 'Characters') => {
    setCurrentPage(page);
  };
  1
  const handleBackClick = () => {
    if (currentPage === 'CharacterCreation') {
      setCurrentPage('Characters');
    } else {
      setCurrentPage('main');
    }
  };

  const handleCreateCharacterClick = () => {
    setCurrentPage('CharacterCreation');
  };

  const getTransformValue = () => {
    switch (currentPage) {
      case 'main':
        return 'translateX(0)';
      case 'Characters':
        return 'translateX(-100vw)';
      case 'CharacterCreation':
        return 'translateX(-200vw)';
      default:
        return 'translateX(0)';
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Nimble Tools</h1>
      </header>

      <div className="page-container" style={{ transform: getTransformValue(), width: '300vw' }}>

        {/* The Main Menu Page */}
        <div className="page main-menu-page">
          <main className="menu-buttons">
            <button className="menu-button" onClick={() => handleMenuClick('Characters')}>Characters</button>
          </main>
        </div>

        <CharactersPage onBackClick={handleBackClick} onCreateNewCharacter={handleCreateCharacterClick} />

        <CharacterCreationPage onBackClick={handleBackClick} />

      </div>
    </div>
  );
}

export default App;