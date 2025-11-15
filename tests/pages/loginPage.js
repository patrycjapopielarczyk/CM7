import {expect } from '@playwright/test'

export class LoginPage{
    constructor(page){
        this.page=page;
        this.userField = this.page.getByTestId('login-username');
        this.passwordField = this.page.getByTestId('login-password');
        this.zalogujButton = page.getByRole('button', {name: "Zaloguj"} )
        
    }
    async fillZalogujField(user){
         await this.userField.fill(user);
    }
    async fillPasswordField(password){
        await this.passwordField.fill(password)
    }
    
    
}

module.exports = {LoginPage};