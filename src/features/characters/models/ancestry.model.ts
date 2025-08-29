
import { Size } from '../constants/character.constants';

export class Ancestry {
    constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly size: Size
    ) { }
}