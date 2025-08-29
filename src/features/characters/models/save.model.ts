import { SaveType, StatName } from "../../../shared/constants/character.constants";

export class Save {
    constructor(
        public readonly type: SaveType,
        public readonly stat: StatName
    ) { }
}