export class Background {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly teasers: string[] = [],
        public readonly image: string = 'https://placehold.co/300x200/666666/ffffff?text=Background'
    ) { }
}