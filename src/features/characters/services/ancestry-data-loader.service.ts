import { Ancestry } from "../models/ancestry.model";
import { IAncestryData } from "./interfaces";

export class AncestryDataLoader {
  private static instance: AncestryDataLoader | null = null;
  private readonly _ancestries: Map<string, Ancestry> = new Map();
  public readonly ancestries: ReadonlyMap<string, Ancestry> = this._ancestries;

  private constructor() {}

  public static getInstance(): AncestryDataLoader {
    if (!AncestryDataLoader.instance) {
      AncestryDataLoader.instance = new AncestryDataLoader();
    }
    return AncestryDataLoader.instance;
  }

  /**
   * A static factory method that creates a singleton instance by processing an array of data.
   * @param ancestryData The array of ancestry data (e.g., an imported const).
   */
  public static create(ancestryData: IAncestryData[]): AncestryDataLoader {
    // Always validate data, even if an instance exists
    for (const rawData of ancestryData) {
      const name = rawData.name || "unknown";
      if (!name || !rawData.description || !rawData.size) {
        throw new Error(
          `Ancestry data is missing required properties for name "${name}"`,
        );
      }
    }

    const loader = AncestryDataLoader.instance || new AncestryDataLoader();
    loader.loadAncestries(ancestryData);

    if (!AncestryDataLoader.instance) {
      AncestryDataLoader.instance = loader;
    }

    return loader;
  }

  /**
   * Processes and loads ancestry data into the service.
   * Idempotent: If data has already been loaded, it does nothing.
   * @param data The raw ancestry data array.
   */
  public loadAncestries(data: IAncestryData[]): void {
    // Prevent reprocessing if data is already loaded
    if (this._ancestries.size > 0) {
      return;
    }

    for (const rawData of data) {
      // Validate the structure of the raw ancestry data
      const name = rawData.name || "unknown";
      if (!name || !rawData.description || !rawData.size) {
        throw new Error(
          `Ancestry data is missing required properties for name "${name}"`,
        );
      }

      const ancestry = new Ancestry(
        rawData.id,
        rawData.name,
        rawData.image,
        rawData.teasers,
        rawData.description,
        rawData.size as any,
      );

      this._ancestries.set(ancestry.name, ancestry);
    }
  }
}
