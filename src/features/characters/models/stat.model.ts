export class Stat {
    readonly value: number;

    constructor(value: number) {
        if (value < -1 || value > 5) {
            throw new Error("Stat value must be between -1 and 5.");
        }
        this.value = value;
    }
}