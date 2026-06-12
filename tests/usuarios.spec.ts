import { test, expect, Page } from '@playwright/test';
import { login } from './helpers/login';
import { acessarUsuarios } from './helpers/menus';
import { gerarCpfValido } from './helpers/cpf';

async function fillCampo(page: Page, label: string, value: string) {
  await page
    .getByText(label, { exact: true })
    .first()
    .locator('xpath=..')
    .locator('input, textarea')
    .first()
    .fill(value);
}

test('Criar um usuário CPF', async ({ page }) => {
  await login(page);
  await acessarUsuarios(page);

  const cpf = gerarCpfValido();
  const timestamp = Date.now();

  await fillCampo(page, '*Nome:', 'Teste Automação');
  await page.getByLabel('*Tipo:').first().selectOption('0');
  await fillCampo(page, '*CPF:', cpf);
  await fillCampo(page, '*Email:', `teste.automacao.${timestamp}@teste.com`);
  await fillCampo(page, '*Usuário:', `teste.automacao.${timestamp}`);
  await fillCampo(page, '*Senha:', 'Senha@123');
  await fillCampo(page, '*Confirmação:', 'Senha@123');
  await page.getByLabel('*Situação:').first().selectOption('A');

  await page.getByRole('button', { name: 'Adicionar' }).click();

  await expect(page.getByText('Cadastrado com sucesso')).toBeVisible();
});
