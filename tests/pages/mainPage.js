
import {expect } from '@playwright/test'

export class MainPage{
    constructor(page){
        this.page = page;
        this.pageTitle = 'Testowy Sklep – Strona główna'
        this.url = ('/');
        this.buttonAddToCart = page.getByRole('button', {name: "Dodaj do koszyka"})
        this.listOfItems = page.getByTestId('products-grid');
        this.messageDodanoDoKoszyka = page.locator('.toast-container');
        this.messageUsunietoZKoszyka = page.getByText('Usunięto z koszyka: Kubek Debuggera');
        this.messageKupSuccess = page.getByText('sukces');
    }
    async goto(){
        await this.page.goto(this.url);
        await expect (this.page).toHaveTitle(this.pageTitle)
    }
    async VerifyListOfItemsVisible(){
        await expect (this.listOfItems).toBeVisible();
    }
    async clickProductByName(productName){
        await this.listOfItems.getByText(productName).click();
        
   }
    async addToCartbyId(productId){
        await this.buttonAddToCart(productId).click();
    }
    
}

module.exports = {MainPage};
