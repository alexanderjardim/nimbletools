import React from 'react';

// Define the type for the props our component will receive.
interface CharactersPageProps {
    onBackClick: () => void;
    onCreateNewCharacter: () => void;
}

const CharactersPage: React.FC<CharactersPageProps> = ({ onBackClick, onCreateNewCharacter }) => {
    return (
        <div className="page section-page">
            <div className="section-content">
                <h2 className="section-title">Characters</h2>
                <p>Content for the Characters section goes here...</p>
                {/* Here you can add more character-specific content and components */}
            </div>
            {/* A container for the buttons at the bottom of the page */}
            <div className="button-group">
                {/* The "Back to Menu" button's onClick now calls the function passed down through props */}
                <button className="back-button" onClick={onBackClick}>Back to Menu</button>
                
                {/* A new button for creating a character */}
                <button 
                    className="menu-button" 
                    onClick={onCreateNewCharacter}
                >
                    Create New Character
                </button>
            </div>
        </div>
    );
};

export default CharactersPage;