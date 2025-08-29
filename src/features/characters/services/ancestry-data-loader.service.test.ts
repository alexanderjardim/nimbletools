import { describe, it, expect, beforeEach } from "vitest";
import { AncestryDataLoader } from "../services/ancestry-data-loader.service";
import { IAncestryData } from "../services/interfaces";

describe("AncestryDataLoader", () => {
  const mockAncestryData: IAncestryData[] = [
    {
      id: "human",
      name: "Human",
      image: "human.png",
      teasers: ["Versatile", "Adaptable"],
      description: "A versatile and adaptable race",
      size: "medium",
    },
    {
      id: "elf",
      name: "Elf",
      image: "elf.png",
      teasers: ["Magical", "Graceful"],
      description: "A magical and graceful race",
      size: "medium",
    },
  ];

  let loader: AncestryDataLoader;

  beforeEach(() => {
    // Reset the singleton instance before each test
    (AncestryDataLoader as any).instance = null;
    loader = AncestryDataLoader.create(mockAncestryData);
  });

  it("should create a singleton instance", () => {
    const secondLoader = AncestryDataLoader.getInstance();
    expect(secondLoader).toBe(loader);
  });

  it("should load ancestries correctly", () => {
    expect(loader.ancestries.size).toBe(2);

    const human = loader.ancestries.get("Human");
    expect(human).toBeDefined();
    expect(human?.name).toBe("Human");
    expect(human?.description).toBe("A versatile and adaptable race");
    expect(human?.size).toBe("medium");
  });

  it("should prevent reloading of ancestries", () => {
    const initialSize = loader.ancestries.size;
    loader.loadAncestries(mockAncestryData);
    expect(loader.ancestries.size).toBe(initialSize);
  });

  it("should throw an error for malformed ancestry data", () => {
    const malformedData: IAncestryData[] = [
      {
        id: "invalid",
        name: "", // Missing name
        image: "",
        teasers: [],
        description: "",
        size: "",
      },
    ];

    expect(() => AncestryDataLoader.create(malformedData)).toThrowError(
      'Ancestry data is missing required properties for name "unknown"',
    );
  });

  it("should use name as the key for ancestries", () => {
    const ancestry = loader.ancestries.get("Human");
    expect(ancestry).toBeDefined();
    expect(loader.ancestries.get("human")).toBeUndefined();
  });
});
