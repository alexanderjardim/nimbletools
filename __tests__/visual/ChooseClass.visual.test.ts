import { test, expect } from '@playwright/test';

test.describe('Choose Class Page Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173'); // Assuming Vite dev server runs on this port
  });

  test('should render class options one per line', async ({ page }) => {
    // Navigate from Choose Ancestry to Choose Background
    await page.getByRole('button', { name: 'Next' }).click();

    // Navigate from Choose Background to Choose Class
    await page.getByRole('button', { name: 'Next' }).click();

    // Take a screenshot of the element containing the class options
    // You'll need to inspect the page to find the correct selector for this element.
    // For example, if the class options are within a div with class="class-options-container":
    const classOptionsElement = page.locator('.class-options-container'); // Placeholder selector

    await expect(classOptionsElement).toHaveScreenshot('choose-class-options.png');
  });
});
