
import { Size } from '../../../shared/constants/character.constants';

export class Ancestry {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly image: string,
        public readonly teasers: string[],
        public readonly description: string,
        public readonly size: Size
    ) { }
}