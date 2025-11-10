// @ts-check
import { test, expect } from '@playwright/test';
import {MainPage} from './pages/mainPage';
import { ProductPage } from './pages/productPage';
import products from '../data/products.json';


  test('e2e for purchasing product - Kubek', async ({page})=>{
  
    const mainPage = new MainPage(page)
    const productPage = new ProductPage(page)
  
  await mainPage.goto();
  await mainPage.VerifyListOfItemsVisible();
  await mainPage.clickProductByName('Kubek Debuggera');
  await productPage.checkProductIdInUrl('p8');
  await productPage.addToCartKubek();
  await productPage.goToCart();
  await productPage.buyProduckt();

  })
  
  products.forEach((product) => {
    test(`product page - e2e for purchasing: ${product.name}`, async ({page})=>{
    const mainPage = new MainPage(page)
    const productPage = new ProductPage(page)
  
  await mainPage.goto();
  await mainPage.VerifyListOfItemsVisible();
  await mainPage.clickProductByName(product.name);
  await productPage.checkProductIdInUrl(product.id);
  await productPage.addToCart(product.name);
  await productPage.goToCart();
  await productPage.buyProduckt();
    }
    )
  })
  
  
  
  