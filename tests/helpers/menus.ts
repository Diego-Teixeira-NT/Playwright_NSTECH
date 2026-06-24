import { Page, expect } from '@playwright/test';

export async function acessarUsuarios(page: Page) {
  await expect(page.getByText('Processando, aguarde').first()).not.toBeVisible({ timeout: 15000 });

  await page.getByPlaceholder('Pesquisar um Formulário').click();
  await page.getByPlaceholder('Pesquisar um Formulário').fill('Administrativo / Usuários / Usuários');
  await expect(page.getByText('Processando, aguarde').first()).not.toBeVisible({ timeout: 15000 });

  await page.getByText('Administrativo / Usuários / Usuários').click();
  await expect(page.getByText('Processando, aguarde').first()).not.toBeVisible({ timeout: 15000 });
  await expect(page.getByText('Carregando...')).not.toBeVisible({ timeout: 15000 });

  await expect(page.getByText('Pesquisar Usuários')).toBeVisible({ timeout: 10000 });
}
