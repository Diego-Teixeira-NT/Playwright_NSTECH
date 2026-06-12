import { test } from '@playwright/test';
import { login } from './helpers/login';
import { acessarUsuarios } from './helpers/menus';

test('Criar um usuário CPF', async ({ page }) => {
  await login(page);
  await acessarUsuarios(page);

  // TODO: implementar criação de usuário CPF
});
