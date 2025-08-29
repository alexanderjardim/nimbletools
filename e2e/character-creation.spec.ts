import { test, expect } from '@playwright/test';

test.describe('Character Creation Flow', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the app and ensure clean state
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Click on "Characters" button to go to characters page
        await page.getByRole('button', { name: 'Characters', exact: true }).click();
        await page.waitForLoadState('networkidle');

        // Click on "Create New Character" button to start the flow
        await page.getByRole('button', { name: 'Create New Character', exact: true }).click();
        await page.waitForLoadState('networkidle');
    });

    test.afterEach(async ({ page }) => {
        // Clean up any lingering state between tests
        await page.evaluate(() => {
            // Clear any local storage or session storage if needed
            localStorage.clear();
            sessionStorage.clear();
        });
    });

    test('should complete full character creation and save character', async ({ page }) => {
        // Step 1: Choose Class
        await expect(page.getByText('Choose Your Class')).toBeVisible();
        await expect(page.getByText('Select a class to begin your adventure.')).toBeVisible();
        await expect(page.getByText('Berserker', { exact: true })).toBeVisible();

        // Select a class (Berserker)
        await page.getByText('Berserker', { exact: true }).click();
        await page.getByRole('button', { name: 'Next' }).click();

        // Step 2: Choose Ancestry
        await expect(page.getByText('Choose Your Ancestry')).toBeVisible();

        // Select an ancestry (Human)
        await page.getByText('Human', { exact: true }).click();
        await page.getByRole('button', { name: 'Next' }).click();

        // Step 3: Choose Background
        await expect(page.getByText('Choose Your Background', { exact: true })).toBeVisible();

        // Select a background (Sage)
        await page.getByText('Sage').click();
        await page.getByRole('button', { name: 'Next' }).click();

        // Step 4: Assign Attributes
        await expect(page.getByText('Assign Your Stats')).toBeVisible();

        // Select standard array
        await page.getByRole('button', { name: 'standard' }).click();
        await page.getByRole('button', { name: 'Next' }).click();

        // Step 5: Assign Skills
        await expect(page.getByText('Assign Skill Points')).toBeVisible();
        await expect(page.getByText('Distribute 4 skill points across your skills.')).toBeVisible();

        // Assign 4 skill points (2 to arcana, 2 to perception)
        await page.getByRole('button', { name: '+' }).first().click();
        await page.getByRole('button', { name: '+' }).first().click();
        await page.getByRole('button', { name: '+' }).nth(8).click(); // Click the + button for perception
        await page.getByRole('button', { name: '+' }).nth(8).click(); // Click the + button for perception again
        await page.getByRole('button', { name: 'Next' }).click();

        // Step 6: Character Details
        await expect(page.getByText('Character Details')).toBeVisible();

        // Fill in character details
        await page.getByLabel('Name').fill('Test Character');
        await page.getByLabel('Height').fill('180');
        await page.getByLabel('Weight').fill('75');
        await page.getByLabel('Age').fill('25');
        await page.getByRole('button', { name: 'Next' }).click();

        // Step 7: Review Character
        await expect(page.getByText('Review Character')).toBeVisible();
        await expect(page.getByText('Test Character')).toBeVisible();

        // Verify all sections are present
        await expect(page.getByText('Character Identity')).toBeVisible();
        await expect(page.getByText('Class')).toBeVisible();
        await expect(page.getByText('Ancestry')).toBeVisible();
        await expect(page.getByText('Background')).toBeVisible();
        await expect(page.getByText('Stats')).toBeVisible();
        await expect(page.getByText('Skills')).toBeVisible();

        // Create the character
        await page.getByRole('button', { name: 'Create Character' }).click();

        // Verify we're back to the characters page
        await expect(page.getByText('Your Characters')).toBeVisible();

        // Verify the character was saved and appears in the list
        await expect(page.getByText('Test Character')).toBeVisible();
    });

    test('should validate required fields in character creation', async ({ page }) => {
        // Step 1: Choose Class
        await page.getByText('The Berserker').click();
        await page.getByRole('button', { name: 'Next' }).click();

        // Step 2: Choose Ancestry
        await page.getByText('Human').click();
        await page.getByRole('button', { name: 'Next' }).click();

        // Step 3: Choose Background
        await page.getByText('Sage').click();
        await page.getByRole('button', { name: 'Next' }).click();

        // Step 4: Assign Attributes
        await page.getByRole('button', { name: 'standard' }).click();
        await page.getByRole('button', { name: 'Next' }).click();

        // Step 5: Assign Skills
        await page.getByRole('button', { name: 'Next' }).click();

        // Step 6: Character Details - test validation
        await expect(page.getByText('Character Details')).toBeVisible();

        // Try to proceed without filling required fields
        await page.getByRole('button', { name: 'Next' }).click();

        // Should still be on the same step (validation failed)
        await expect(page.getByText('Character Details')).toBeVisible();
    });

    test('should allow navigation between steps', async ({ page }) => {
        // Step 1: Choose Class
        await page.getByText('The Berserker').click();
        await page.getByRole('button', { name: 'Next' }).click();

        // Step 2: Choose Ancestry
        await page.getByText('Human').click();
        await page.getByRole('button', { name: 'Next' }).click();

        // Step 3: Choose Background
        await page.getByText('Sage').click();
        await page.getByRole('button', { name: 'Next' }).click();

        // Step 4: Assign Attributes
        await expect(page.getByText('Assign Your Stats')).toBeVisible();

        // Go back to previous step
        await page.getByRole('button', { name: 'Back', exact: true }).click();

        // Should be back on Choose Background step
        await expect(page.getByText('Choose Background')).toBeVisible();

        // Go forward again
        await page.getByRole('button', { name: 'Next' }).click();

        // Should be back on Assign Attributes step
        await expect(page.getByText('Assign Your Stats')).toBeVisible();
    });

    test('should display correct step indicators', async ({ page }) => {
        // Check initial step indicator
        await expect(page.getByText('Choose Class')).toBeVisible();
        await expect(page.locator('[data-step="1"]')).toHaveClass(/active/);

        // Navigate through steps and verify indicators
        await page.getByText('The Berserker').click();
        await page.getByRole('button', { name: 'Next' }).click();

        await expect(page.locator('[data-step="2"]')).toHaveClass(/active/);

        await page.getByTestId('ancestry-card-human').click();
        await page.getByRole('button', { name: 'Next' }).click();

        await expect(page.locator('[data-step="3"]')).toHaveClass(/active/);
    });
});