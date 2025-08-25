import React, { useState } from 'react';

const DetermineAttributes: React.FC = () => {
    const [attributes, setAttributes] = useState({
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAttributes(prev => ({
            ...prev,
            [name]: Number(value),
        }));
    };

    const handleRollAttributes = () => {
        // Placeholder for rolling attributes logic
        const newAttributes = {
            strength: Math.floor(Math.random() * 10) + 8, // Example: 8-17
            dexterity: Math.floor(Math.random() * 10) + 8,
            constitution: Math.floor(Math.random() * 10) + 8,
            intelligence: Math.floor(Math.random() * 10) + 8,
            wisdom: Math.floor(Math.random() * 10) + 8,
            charisma: Math.floor(Math.random() * 10) + 8,
        };
        setAttributes(newAttributes);
        console.log('Rolled Attributes:', newAttributes);
    };

    return (
        <div className="attributes-container">
            <h3>Allocate or Roll Your Attributes</h3>
            <div className="attribute-list">
                {Object.entries(attributes).map(([key, value]) => (
                    <div key={key} className="attribute-item">
                        <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                        <input
                            type="number"
                            id={key}
                            name={key}
                            value={value}
                            onChange={handleChange}
                            min="1"
                            max="20"
                        />
                    </div>
                ))}
            </div>
            <button className="menu-button" onClick={handleRollAttributes}>Roll Attributes</button>
        </div>
    );
};

export default DetermineAttributes;