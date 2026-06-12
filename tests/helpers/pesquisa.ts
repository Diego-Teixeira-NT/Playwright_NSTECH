import { Page } from '@playwright/test';
import { fillCampo } from './form';

export async function pesquisarUsuarioPorNome(page: Page, nome: string) {
  const campoPesquisaNome = page
    .getByText('Nome:', { exact: true })
    .first()
    .locator('xpath=..')
    .locator('input, textarea')
    .first();

  if (!(await campoPesquisaNome.isVisible())) {
    await page.getByRole('button', { name: 'Pesquisar Usuários' }).click();
    await page.waitForTimeout(500);
  }

  await fillCampo(page, 'Nome:', nome);
  await page.locator('.btnPesquisarFiltroPesquisa').click();
  await page.waitForTimeout(1000);

  return page.locator('table:visible').first();
}
