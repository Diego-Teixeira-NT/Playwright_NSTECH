import { Page } from '@playwright/test';

export async function fillCampo(page: Page, label: string, value: string) {
  await page
    .getByText(label, { exact: true })
    .first()
    .locator('xpath=..')
    .locator('input, textarea')
    .first()
    .fill(value);
}
