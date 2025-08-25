import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import '../../App.css'; // Import the CSS file
import React from 'react';
import { vi } from 'vitest'; // Import vi from vitest
import ChooseClass from './ChooseClass';
import { classesDataLoader } from '../../dataLoaders/ClassesDataLoader';

// Mock the ClassesDataLoader
vi.mock('../../dataLoaders/ClassesDataLoader', () => ({
  classesDataLoader: {
    getClasses: vi.fn(() => new Map([
      ['Fighter', { id: 'fighter', name: 'Fighter', image: '/assets/class_images/fighter.png', teasers: ['Master of weapons and armor'] }],
      ['Mage', { id: 'mage', name: 'Mage', image: '/assets/class_images/mage.png', teasers: ['Wielder of arcane spells'] }],
    ])),
  },
}));

describe('ChooseClass', () => {
  test('renders class cards', async () => {
    render(<ChooseClass />);

    // Wait for the classes to be loaded and rendered
    await waitFor(() => {
      expect(screen.getByText('Fighter')).toBeInTheDocument();
      expect(screen.getByText('Mage')).toBeInTheDocument();
    });

    // In a JSDOM environment, directly asserting visual layout (like vertical stacking)
    // through CSS properties or element positions is unreliable. This test primarily
    // confirms that the components are rendered with the expected content and structure.
    // For true visual regression testing, an end-to-end testing framework is required.
  });
});