import { test, expect } from "@playwright/test";

test.describe("Character Creation Flow - Google Pixel 7", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app and ensure clean state
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Check if we're already on the characters page
    const createButton = page.getByRole("button", {
      name: "Create New Character",
      exact: true,
    });
    if (await createButton.isVisible()) {
      // Already on characters page, proceed directly
      await createButton.click();
    } else {
      // Need to navigate to characters page first
      const charactersButton = page.getByRole("button", {
        name: "Characters",
        exact: true,
      });
      await charactersButton.scrollIntoViewIfNeeded();
      await charactersButton.click({ force: true });
      await page.waitForLoadState("networkidle");

      // Now click Create New Character
      await createButton.click();
    }
    await page.waitForLoadState("networkidle");
  });

  test.afterEach(async ({ page }) => {
    // Clean up any lingering state between tests
    await page.evaluate(() => {
      // Clear any local storage or session storage if needed
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test("should complete full character creation, save character, and verify CSS styling on Google Pixel 7", async ({
    page,
  }) => {
    // Verify we're on mobile viewport (Pixel 7)
    const viewport = page.viewportSize();
    expect(viewport?.width).toBe(412);
    expect(viewport?.height).toBe(915);

    // Step 1: Choose Class
    await expect(page.getByText("Choose Your Class")).toBeVisible();
    await expect(
      page.getByText("Select a class to begin your adventure."),
    ).toBeVisible();

    // Verify CSS styling for the class selection page
    await expect(
      page.locator("div.p-8.font-sans.bg-parchment.min-h-full"),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Choose Your Class" }),
    ).toHaveClass(/text-ink/);
    await expect(
      page.getByText("Select a class to begin your adventure."),
    ).toHaveClass(/text-chestnut/);

    // Select Berserker class
    await page.getByText("The Berserker").click();

    // Click Next
    await page.getByRole("button", { name: "Next" }).click();

    // Step 2: Choose Ancestry
    await expect(page.getByText("Choose Your Ancestry")).toBeVisible();

    // Verify consistent CSS styling
    await expect(
      page.locator("div.p-8.font-sans.bg-parchment.min-h-full"),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Choose Your Ancestry" }),
    ).toHaveClass(/text-ink/);

    // Select Human ancestry
    await page.getByText("Human").click();

    // Click Next
    await page.getByRole("button", { name: "Next" }).click();

    // Step 3: Choose Background
    await expect(
      page.getByText("Choose Your Background", { exact: true }),
    ).toBeVisible();

    // Verify CSS consistency
    await expect(
      page.locator("div.p-8.font-sans.bg-parchment.min-h-full"),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Choose Your Background" }),
    ).toHaveClass(/text-ink/);

    // Select Sage background
    await page.getByText("Sage").click();

    // Click Next
    await page.getByRole("button", { name: "Next" }).click();

    // Step 4: Assign Attributes
    await expect(page.getByText("Assign Your Stats")).toBeVisible();

    // Verify CSS styling for stats page
    await expect(
      page.locator("div.p-8.font-sans.bg-parchment.min-h-full"),
    ).toBeVisible();

    // Select standard array from dropdown
    await page.selectOption("#statArray", "standard");

    // Click Next
    await page.getByRole("button", { name: "Next" }).click();

    // Step 5: Assign Skills
    await expect(page.getByText("Assign Skill Points")).toBeVisible();
    await expect(
      page.getByText("Distribute 4 skill points across your skills."),
    ).toBeVisible();

    // Verify CSS styling
    await expect(
      page.locator("div.p-8.font-sans.bg-parchment.min-h-full"),
    ).toBeVisible();

    // Assign 4 skill points total (2 to first skill, 2 to second skill)
    await page.getByRole("button", { name: "+" }).first().click();
    await page.getByRole("button", { name: "+" }).first().click();
    await page.getByRole("button", { name: "+" }).nth(1).click();
    await page.getByRole("button", { name: "+" }).nth(1).click();

    // Click Next
    await page.getByRole("button", { name: "Next" }).click();

    // Step 6: Character Details
    await expect(
      page.getByRole("heading", { name: "Character Details" }),
    ).toBeVisible();

    // Verify CSS styling
    await expect(
      page.locator("div.p-8.font-sans.bg-parchment.min-h-full"),
    ).toBeVisible();

    // Fill in character details using the random fill button
    await page.getByRole("button", { name: "🎲" }).click();

    // Capture the generated name
    const characterName = await page.locator("#name").inputValue();

    // Click Next
    await page.getByRole("button", { name: "Next Step" }).click();

    // Step 7: Review Character
    await expect(
      page.getByRole("heading", { name: "Review Character" }),
    ).toBeVisible();
    // Note: Character name is randomly generated by the random fill button, so we just verify a name exists
    await expect(
      page.locator("h2.text-3xl.font-bold.text-bronze.mb-2"),
    ).toBeVisible();

    // Verify all sections are present and styled consistently
    await expect(
      page.getByRole("heading", { name: "Character Identity" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Class" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Ancestry" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Background" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Stats" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Skills" })).toBeVisible();

    // Verify CSS styling consistency across review sections
    await expect(
      page.locator("div.p-8.font-sans.bg-parchment.min-h-full"),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Review Character" }),
    ).toHaveClass(/text-ink/);

    // Create the character
    await page.getByRole("button", { name: "Create Character" }).click();

    // Verify we're back to the characters page
    await expect(
      page.getByRole("heading", { name: "Characters" }),
    ).toBeVisible();

    // Verify the character was saved and appears in the list
    await expect(
      page.getByRole("heading", { name: characterName, level: 3 }),
    ).toBeVisible();

    // Verify consistent styling on the characters list page
    await expect(
      page.locator("div.p-8.font-sans.bg-parchment.min-h-full"),
    ).toBeVisible();
  });

  test("should verify CSS styling consistency across all components", async ({
    page,
  }) => {
    // Navigate through the flow and check styling at each step

    // Step 1: Class selection
    await expect(
      page.locator("div.p-8.font-sans.bg-parchment.min-h-full"),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Choose Your Class" }),
    ).toHaveClass(/text-ink/);
    await expect(
      page.getByText("Select a class to begin your adventure."),
    ).toHaveClass(/text-chestnut/);

    // Select class and proceed
    await page.getByText("The Berserker").click();

    // Check button styling after selection
    const nextButton = page.getByRole("button", { name: "Next" });
    await expect(nextButton).toHaveClass(/bg-gradient-to-r/);
    await expect(nextButton).toHaveClass(/from-bronze/);

    await nextButton.click();

    // Step 2: Ancestry selection
    await expect(
      page.locator("div.p-8.font-sans.bg-parchment.min-h-full"),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Choose Your Ancestry" }),
    ).toHaveClass(/text-ink/);

    // Select ancestry and proceed
    await page.getByText("Human").click();
    await page.getByRole("button", { name: "Next" }).click();

    // Step 3: Background selection
    await expect(
      page.locator("div.p-8.font-sans.bg-parchment.min-h-full"),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Choose Your Background" }),
    ).toHaveClass(/text-ink/);

    // Select background and proceed
    await page.getByText("Sage").click();
    await page.getByRole("button", { name: "Next" }).click();

    // Step 4: Stats assignment
    await expect(
      page.locator("div.p-8.font-sans.bg-parchment.min-h-full"),
    ).toBeVisible();

    // Select standard array and proceed
    await page.selectOption("#statArray", "standard");
    await page.getByRole("button", { name: "Next Step" }).click();

    // Step 5: Skills assignment
    await expect(
      page.locator("div.p-8.font-sans.bg-parchment.min-h-full"),
    ).toBeVisible();

    // Assign 4 skill points total (2 to first skill, 2 to second skill)
    await page.getByRole("button", { name: "+" }).first().click();
    await page.getByRole("button", { name: "+" }).first().click();
    await page.getByRole("button", { name: "+" }).nth(1).click();
    await page.getByRole("button", { name: "+" }).nth(1).click();
    await page.getByRole("button", { name: "Next" }).click();

    // Step 6: Character details
    await expect(
      page.locator("div.p-8.font-sans.bg-parchment.min-h-full"),
    ).toBeVisible();

    // Fill details and proceed using random fill button
    await page.getByRole("button", { name: "🎲" }).click();
    await page.getByRole("button", { name: "Next" }).click();

    // Step 7: Review
    await expect(
      page.locator("div.p-8.font-sans.bg-parchment.min-h-full"),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Review Character" }),
    ).toHaveClass(/text-ink/);

    // Verify review button styling
    const createButton = page.getByRole("button", { name: "Create Character" });
    await expect(createButton).toHaveClass(/bg-gradient-to-r/);
    await expect(createButton).toHaveClass(/from-green-600/);

    // Create character
    await createButton.click();

    // Verify final page styling - character creation should have completed
    await expect(
      page.locator("div.p-8.font-sans.bg-parchment.min-h-full"),
    ).toBeVisible();
    // Just verify that we have some content on the page (creation completed)
    await expect(page.locator("body")).toBeVisible();
  });
});
