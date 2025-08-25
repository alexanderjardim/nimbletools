import { CharacterClass } from '../types/CharacterClass';

class ClassesDataLoader {
    private classes: Map<string, CharacterClass> = new Map();
    private loadedPromise: Promise<void>;

    constructor() {
        this.loadedPromise = this.loadClasses();
    }

    private async loadClasses(path: string) {
        const modules = import.meta.glob(path);

        for (const path in modules) {
            const module = await modules[path]();
            const classData: CharacterClass = module.default;
            this.classes.set(classData.id, classData);
        }
    }

    public async getClasses(): Promise<Map<string, CharacterClass>> {
        await this.loadedPromise;
        return this.classes;
    }

    public async getClass(id: string): Promise<CharacterClass | undefined> {
        await this.loadedPromise;
        return this.classes.get(id);
    }
}

export const classesDataLoader = new ClassesDataLoader();