// @ts-check
import { test, expect } from '@playwright/test';
import {MainPage} from './pages/mainPage';


/*test('has title', async ({ page }) => {
  await page.goto('/');

  
  await expect(page).toHaveTitle('Testowy Sklep – Strona główna');
});
*/
test('E2E', async ({page})=>{
  const mainPage = new MainPage(page)
  await mainPage.goto()
  //await page.goto('/');
  await expect(page).toHaveTitle(mainPage.pageTitle);
  //await expect(page).toHaveTitle('Testowy Sklep – Strona główna');
  await page.getByTestId('product-title-8').click();
  expect(page).toHaveTitle('Kubek Debuggera – Testowy Sklep');
  await page.getByTestId('buy-btn-8').click();
  expect (page.locator('.toast-container')).toBeVisible();
  await page.locator('#cart-button').click();
  expect(page.locator('#cart-panel')).toBeVisible();
  await page.locator('#cart-buy').click();
  expect (page.locator('.toast-success')).toBeVisible();
 })
