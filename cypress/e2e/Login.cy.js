import LoginPage from '/Pages/LoginPage.js';

describe("Login", () => {

    let loginPage;

    beforeEach(() => {
        loginPage = new LoginPage();
        cy.visit("https://www.saucedemo.com/v1/");
    });

    it("Deve realizar login com sucesso", () => {

        //Dado que usuário informou credenciais corretas, Quando acionar botão login, Então será direcionado para página de produtos

        const username = "standard_user"; 
        const password = "secret_sauce"; 

        loginPage.login(username, password);

        cy.url().should('eq', 'https://www.saucedemo.com/v1/inventory.html');

    });

    it("Credenciais incorretas, username invalido", () => {

        //Dado que usuário informou usuario invalido, quando acionar botão login, então notificação será exibida

        const username = "standard_error"; 
        const password = "secret_sauce";

        loginPage.login(username, password);

        cy.get('[data-test="error"]').should('have.text','Epic sadface: Username and password do not match any user in this service');
        cy.get('.error-button').should('be.visible');

    });

    it("Credenciais incorretas, senha invalida", () => {

             //Dado que usuário informou  senha inválida, quando acionar botão login, então notificação será exibida

        const username = "standard_user"; 
        const password = "senhaerrada";

        loginPage.login(username, password);

        cy.get('[data-test="error"]').should('have.text','Epic sadface: Username and password do not match any user in this service');
        cy.get('.error-button').should('be.visible');

    });

});
