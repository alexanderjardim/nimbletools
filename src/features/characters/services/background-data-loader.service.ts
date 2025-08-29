import { Background } from "../models/background.model";
import { IBackgroundData } from "./interfaces";

export class BackgroundDataLoader {
  private static instance: BackgroundDataLoader | null = null;
  private readonly _backgrounds: Map<string, Background> = new Map();
  public readonly backgrounds: ReadonlyMap<string, Background> =
    this._backgrounds;

  private constructor() { }

  public static getInstance(): BackgroundDataLoader {
    if (!BackgroundDataLoader.instance) {
      BackgroundDataLoader.instance = new BackgroundDataLoader();
    }
    return BackgroundDataLoader.instance;
  }

  /**
   * A static factory method that creates a singleton instance by processing an array of data.
   * @param backgroundData The array of background data (e.g., an imported const).
   */
  public static create(
    backgroundData: IBackgroundData[],
  ): BackgroundDataLoader {
    // Always validate data, even if an instance exists
    for (const rawData of backgroundData) {
      const name = rawData.name || "unknown";
      if (!name || !rawData.description) {
        throw new Error(
          `Background data is missing required properties for name "${name}"`,
        );
      }
    }

    const loader = BackgroundDataLoader.instance || new BackgroundDataLoader();
    loader.loadBackgrounds(backgroundData);

    if (!BackgroundDataLoader.instance) {
      BackgroundDataLoader.instance = loader;
    }

    return loader;
  }

  /**
   * Processes and loads background data into the service.
   * Idempotent: If data has already been loaded, it does nothing.
   * @param data The raw background data array.
   */
  public loadBackgrounds(data: IBackgroundData[]): void {
    // Prevent reprocessing if data is already loaded
    if (this._backgrounds.size > 0) {
      return;
    }

    for (const rawData of data) {
      // Validate the structure of the raw background data
      const name = rawData.name || "unknown";
      if (!name || !rawData.description) {
        throw new Error(
          `Background data is missing required properties for name "${name}"`,
        );
      }

      const background = new Background(
        rawData.id,
        rawData.name,
        rawData.description,
        rawData.teasers,
        rawData.image,
      );

      this._backgrounds.set(background.name, background);
    }
  }
}
