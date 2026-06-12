import { test, expect } from '@playwright/test';
import { login } from './helpers/login';
import { acessarUsuarios } from './helpers/menus';
import { verificarUsuarioCPF } from './helpers/verificacao';
import { cadastrarUsuarioCPF } from './helpers/cadastro';
import { pesquisarUsuarioPorNome } from './helpers/pesquisa';
import { fillCampo } from './helpers/form';
import { gerarCpfValido } from './helpers/cpf';

test('Criar um usuário CPF', async ({ page }) => {
  test.setTimeout(90000);

  await login(page);
  await acessarUsuarios(page);

  const cpf = gerarCpfValido();
  const nome = 'Usuário Automação CPF';
  const nomeEditado = 'Teste Automação CPF EDITADO';

  await verificarUsuarioCPF(page, nome);
  await verificarUsuarioCPF(page, nomeEditado);

  await cadastrarUsuarioCPF(page, nome, cpf);

  const tabela = await pesquisarUsuarioPorNome(page, nome);
  await expect(tabela.getByText(nome).first()).toBeVisible();
});

test('Editar um usuário CPF', async ({ page }) => {
  test.setTimeout(90000);

  await login(page);
  await acessarUsuarios(page);

  const cpf = gerarCpfValido();
  const nome = 'Usuário Automação CPF';
  const nomeEditado = 'Teste Automação CPF EDITADO';

  await verificarUsuarioCPF(page, nome);
  await verificarUsuarioCPF(page, nomeEditado);

  await cadastrarUsuarioCPF(page, nome, cpf);

  const tabelaCadastro = await pesquisarUsuarioPorNome(page, nome);
  await tabelaCadastro.locator('tbody tr').first().locator('.clasEditar').click();
  await page.waitForTimeout(1000);

  await fillCampo(page, '*Nome:', nomeEditado);
  await page.getByRole('button', { name: 'Atualizar' }).first().click();

  await expect(page.getByText('Atualizado com sucesso')).toBeVisible();

  const tabelaEditado = await pesquisarUsuarioPorNome(page, nomeEditado);
  await expect(tabelaEditado.getByText(nomeEditado).first()).toBeVisible();
});
