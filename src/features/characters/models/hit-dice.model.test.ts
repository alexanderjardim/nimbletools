import { describe, it, expect } from 'vitest';
import { HitDice } from './hit-dice.model';

describe('HitDice', () => {
    it('should construct with the correct dice type and quantity', () => {
        const hitDice = new HitDice("d10", 2);

        expect(hitDice.dice).toBe("d10");
        expect(hitDice.quantity).toBe(2);
    });
});
