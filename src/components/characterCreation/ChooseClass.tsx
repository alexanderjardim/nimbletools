import React, { useState, useEffect } from 'react';
import { classesDataLoader } from '../../dataLoaders/ClassesDataLoader';
import { CharacterClass } from '../../types/CharacterClass';

const ChooseClass: React.FC = () => {
    const [classes, setClasses] = useState<CharacterClass[]>([]);
    const [selectedClass, setSelectedClass] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            // Ensure classes are loaded before setting them
            const loadedClassesMap = await classesDataLoader.getClasses();
            setClasses(Array.from(loadedClassesMap.values()));
        };
        loadData();
    }, []);

    const handleClassClick = (classId: string) => {
        setSelectedClass(classId);
        // In a real application, you would save this selection to a global state or context
        console.log('Selected class:', classId);
    };

    return (
        <div className="choose-class-container" data-testid="choose-class-container">
            {classes.map(cls => (
                <div
                    key={cls.id}
                    className={`class-card ${selectedClass === cls.id ? 'selected' : ''}`}
                    onClick={() => handleClassClick(cls.id)}
                >
                    <img src={cls.image} alt={cls.name} className="class-image" />
                    <h3 className="class-name">{cls.name}</h3>
                    <ul className="class-teasers">
                        {cls.teasers.map((teaser, index) => (
                            <li key={index}>{teaser}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ChooseClass;