import { describe, it, expect, beforeEach } from "vitest";
import { BackgroundDataLoader } from "../services/background-data-loader.service";
import { IBackgroundData } from "../services/interfaces";

describe("BackgroundDataLoader", () => {
  const mockBackgroundData: IBackgroundData[] = [
    {
      id: "soldier",
      name: "Soldier",
      description: "A trained military professional",
      teasers: ["Disciplined", "Experienced"],
      image: "https://placehold.co/300x200/666666/ffffff?text=Soldier",
    },
    {
      id: "scholar",
      name: "Scholar",
      description: "An academic with deep knowledge",
      teasers: ["Intelligent", "Studious"],
      image: "https://placehold.co/300x200/666666/ffffff?text=Scholar",
    },
  ];

  let loader: BackgroundDataLoader;

  beforeEach(() => {
    // Reset the singleton instance before each test
    (BackgroundDataLoader as any).instance = null;
    loader = BackgroundDataLoader.create(mockBackgroundData);
  });

  it("should create a singleton instance", () => {
    const secondLoader = BackgroundDataLoader.getInstance();
    expect(secondLoader).toBe(loader);
  });

  it("should load backgrounds correctly", () => {
    expect(loader.backgrounds.size).toBe(2);

    const soldier = loader.backgrounds.get("Soldier");
    expect(soldier).toBeDefined();
    expect(soldier?.name).toBe("Soldier");
    expect(soldier?.description).toBe("A trained military professional");
  });

  it("should prevent reloading of backgrounds", () => {
    const initialSize = loader.backgrounds.size;
    loader.loadBackgrounds(mockBackgroundData);
    expect(loader.backgrounds.size).toBe(initialSize);
  });

  it("should throw an error for malformed background data", () => {
    const malformedData: IBackgroundData[] = [
      {
        id: "invalid",
        name: "", // Missing name
        description: "",
        teasers: [],
        image: "https://placehold.co/300x200/666666/ffffff?text=Invalid",
      },
    ];

    expect(() => BackgroundDataLoader.create(malformedData)).toThrowError(
      'Background data is missing required properties for name "unknown"',
    );
  });

  it("should use name as the key for backgrounds", () => {
    const background = loader.backgrounds.get("Soldier");
    expect(background).toBeDefined();
    expect(loader.backgrounds.get("soldier")).toBeUndefined();
  });
});
