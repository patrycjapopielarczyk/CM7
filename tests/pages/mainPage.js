
import {expect } from '@playwright/test'

export class MainPage{
    constructor(page){
        this.page = page;
        this.pageTitle = 'Testowy Sklep – Strona główna'
        this.url = ('/');
    }
    async goto(){
        await (this.page).goto(this.url);
    }
    async verifyTitle(){
        await expect (this.page).toHaveTitle(this.pageTitle)
    }

}

module.exports = {MainPage};
