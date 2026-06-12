import { test, expect } from '@playwright/test';
import { login } from './helpers/login';
import { acessarUsuarios } from './helpers/menus';
import { pesquisarUsuarioPorNome } from './helpers/pesquisa';
import { gerarCpfValido } from './helpers/cpf';
import {
  limparUsuarioCPFApi,
  cadastrarUsuarioCPFApi,
  editarUsuarioCPFApi,
  excluirUsuarioPorCodigoApi,
  buscarCodigoUsuarioPorNomeApi,
} from './helpers/api';

const nome = 'Usuário Automação CPF';
const nomeEditado = 'Teste Automação CPF EDITADO';
const login_ = 'usuario_automacao_cpf';
const email = 'usuario.automacao_cpf@gmail.com';

test('Criar um usuário CPF via API', async ({ page }) => {
  test.setTimeout(60000);

  await login(page);
  const request = page.context().request;

  await limparUsuarioCPFApi(request, nome);
  await limparUsuarioCPFApi(request, nomeEditado);

  const cpf = gerarCpfValido();
  await cadastrarUsuarioCPFApi(request, nome, cpf, login_, email);

  await acessarUsuarios(page);
  const tabela = await pesquisarUsuarioPorNome(page, nome);
  await expect(tabela.getByText(nome).first()).toBeVisible();
});

test('Editar um usuário CPF via API', async ({ page }) => {
  test.setTimeout(60000);

  await login(page);
  const request = page.context().request;

  await limparUsuarioCPFApi(request, nome);
  await limparUsuarioCPFApi(request, nomeEditado);

  const cpf = gerarCpfValido();
  await cadastrarUsuarioCPFApi(request, nome, cpf, login_, email);

  const codigo = await buscarCodigoUsuarioPorNomeApi(request, nome);
  expect(codigo).not.toBeNull();
  await editarUsuarioCPFApi(request, codigo as number, nomeEditado, cpf, login_, email);

  await acessarUsuarios(page);
  const tabela = await pesquisarUsuarioPorNome(page, nomeEditado);
  await expect(tabela.getByText(nomeEditado).first()).toBeVisible();
});

test('Excluir um usuário CPF via API', async ({ page }) => {
  test.setTimeout(60000);

  await login(page);
  const request = page.context().request;

  await limparUsuarioCPFApi(request, nome);
  await limparUsuarioCPFApi(request, nomeEditado);

  const cpf = gerarCpfValido();
  await cadastrarUsuarioCPFApi(request, nome, cpf, login_, email);

  const codigo = await buscarCodigoUsuarioPorNomeApi(request, nome);
  expect(codigo).not.toBeNull();
  await excluirUsuarioPorCodigoApi(request, codigo as number);

  await acessarUsuarios(page);
  const tabelaAposExclusao = await pesquisarUsuarioPorNome(page, nome);
  await expect(tabelaAposExclusao.getByText('Nenhum registro encontrado')).toBeVisible();
});
