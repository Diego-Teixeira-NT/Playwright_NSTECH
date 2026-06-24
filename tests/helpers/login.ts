import { Page, expect } from '@playwright/test';

export async function login(page: Page) {
  await page.goto('/Login');

  await page.getByLabel('Usuário').fill(process.env.LOGIN_USERNAME ?? '');
  await page.getByLabel('Senha').fill(process.env.LOGIN_PASSWORD ?? '');
  await page.getByRole('button', { name: 'Acessar' }).click();

  await expect(page).not.toHaveURL(/\/Login/);
  await expect(page.getByText('Seja bem-vindo').first()).toBeVisible({ timeout: 10000 });
}
