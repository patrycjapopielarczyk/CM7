import {expect } from '@playwright/test'
export class ProductPage{
    constructor (page){
        this.page = page;
        this.partialUrl = 'products/';
        this.pageTitle = '${product.name} - Testowy sklep'
        this.buttonAddToCart = page.getByRole('button', { name: /Dodaj do koszyka/});
        this.buttonCart = page.getByTestId('cart-button');
        this.inputUserName = page.getByTestId('login-username');
        this.inputPassword = page.getByTestId('login-password')
        this.LogIn = page.getByRole('button', {name: /Zaloguj/});
        this.backToList = page.locator('.back');
        this.cartPanel = page.getByTestId('cart-panel');
        this.trashIconOnCart = page.locator('.cart-remove');
        this.buttonBuy = page.getByTestId('cart-buy');
        this.messageDodanoDoKoszyka = page.locator('.toast-container');
        this.messageDodanoDoKoszykaKubekDebbugera = page.locator('.toast-container');
        this.messageUsunietoZKoszykaKubekDebuggera = page.getByText('Usunięto z koszyka: Kubek Debuggera');
        this.messageKupSuccess = page.getByText('sukces');
    }
      async checkProductIdInUrl(productId) {
        await expect(this.page).toHaveURL(`products/${productId}.html`);
        //await expect(this.page).toHaveTitle(this.partialUrl);
      }
    async addToCart(productName){
        await this.buttonAddToCart.click();
        //await expect (page.locator('#cart-count')) === 1;
        await expect (this.messageDodanoDoKoszyka).toBeVisible();
        await expect (this.messageDodanoDoKoszyka).toContainText(`Dodano do koszyka: ${productName}`);
    }
    async addToCartKubek(){
        await this.buttonAddToCart.click();
        //await expect (page.locator('#cart-count')) === 1;
        await expect (this.messageDodanoDoKoszykaKubekDebbugera).toBeVisible();
        await expect (this.messageDodanoDoKoszykaKubekDebbugera).toContainText('Dodano do koszyka: Kubek Debuggera');
    }
    async goToCart(){
        await this.buttonCart.click();
        await expect (this.cartPanel).toBeVisible();
    }
    async removeProductFromCart(){
        await this.trashIconOnCart.click();  
        await expect (this.messageUsunietoZKoszyka).toBeVisible();
    }
    async buyProduckt(){
        await this.buttonBuy.click();
        await expect (this.messageKupSuccess).toBeVisible();
    }
}

module.exports = {ProductPage};