import { test } from '@playwright/test';
import { login } from './helpers/login';

test('Validar login com sucesso', async ({ page }) => {
  await login(page);
});
