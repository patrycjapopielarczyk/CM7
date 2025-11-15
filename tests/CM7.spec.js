// @ts-check
import { test, expect } from '@playwright/test';
import {MainPage} from './pages/mainPage';
import { ProductPage } from './pages/productPage';
import products from '../data/products.json';
import { LoginPage } from './pages/loginPage';

//zadanie 1

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
  test(`product page - e2e for purchasing: ${product.name}`, async ({page})   =>{
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
  //zadanie 2

  test('log in as admin from main page with success', async ({page})=>{

    //console.log(process.env.ADMIN_USER)
    const loginPage = new LoginPage(page);
    const mainPage = new MainPage(page)
    await mainPage.goto();
    await loginPage.fillZalogujField(process.env.ADMIN_USER);
    await loginPage.fillPasswordField(process.env.ADMIN_PASSWORD)
    await loginPage.zalogujButton.click();
    await expect (page.locator('.toast-container')).toContainText(`Zalogowano jako ${process.env.ADMIN_USER}`);
  })
    
  test('log in as user from product page with success', async ({page})=>{

   
    const loginPage = new LoginPage(page);
    const mainPage = new MainPage(page);
    const productPage = new ProductPage(page);

    await mainPage.goto();
    await mainPage.VerifyListOfItemsVisible();
    await mainPage.clickProductByName('Kubek Debuggera');
    await loginPage.fillZalogujField(process.env.LOGIN);
    await loginPage.fillPasswordField(process.env.PASSWORD)
    await loginPage.zalogujButton.click();
    await expect (page.locator('.toast-container')).toContainText(`Zalogowano jako ${process.env.LOGIN}`);
  })

  test('log in with empty fields', async ({page})=>{

   
    const loginPage = new LoginPage(page);
    const mainPage = new MainPage(page);

    await mainPage.goto();
    await loginPage.zalogujButton.click();
    await expect (page.locator('.toast-container')).toContainText('Złe dane logowania');
  
  })

  //zadanie 3
  
test ('api test GET', async ({request})=>{
    const response = await request.get('/api/index.php?endpoint=products')
      
      console.log("wynik console log to:"+ await response.text() );
     
      expect(await response.status()).toBe(200);
      expect (await response.text()).toContain('Kubek Debuggera')

  })
test ('api test GET second', async ({request})=>{
    const responseSecond = await request.get('/api/index.php?endpoint=products&id=3')
  
    console.log("Wynik responseSecond to:"+ await responseSecond.text());
    
    expect(await responseSecond.status()).toBe(200);
    expect (await responseSecond.text()).toContain('Peleryna Maskująca')

 })
test ('API test POST', async ({request})=>{
    const responsePost = await request.post('/api/index.php?endpoint=products',{
    data:{
      
     "name": "Testowy produkt",
      "price": 123.45,
      "currency": "PLN"

    }})
    console.log("Wynik POST to:" + await responsePost.text())
    expect(responsePost.ok()).toBeTruthy();
    expect (await responsePost.text()).toContain('PLN')

  })
  