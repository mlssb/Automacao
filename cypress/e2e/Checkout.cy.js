import LoginPage from '/Pages/LoginPage.js';
import ProductPage from '/Pages/ProductsPage.js';
import CheckoutPage from "/Pages/CheckoutPage.js";

describe("Checkout", () => {

    let loginPage;
    let productPage;
    let checkoutPage;


    beforeEach(() => {
         loginPage = new LoginPage();
         productPage = new ProductPage();
         checkoutPage = new CheckoutPage();
        
        cy.visit("https://www.saucedemo.com/v1/");
        const username = "standard_user"; 
        const password = "secret_sauce"; 

        loginPage.login(username, password);

        for (let i = 1; i <= 3; i++) {
            productPage.addToCart(i);
           
        }
        
        checkoutPage.clickCartButton();
    

    });

       
    it('Deve ter sido direcionado para o carrinho', () => {

      
     cy.url().should('eq','https://www.saucedemo.com/v1/cart.html');

    });   

    it('Deve verificar o total de itens no carrinho', () => {
        const expectedTotalItems = 3; 
        checkoutPage.verifyTotalCartItems(expectedTotalItems);
    });

    it('Deve retirar um item do carrinho e verificar nova quantidade de itens', () => {
        checkoutPage.removeFromCart(3); // Remove o primeiro item da lista
        const expectedTotalItems = 2; 
        checkoutPage.verifyTotalCartItems(expectedTotalItems);
    });

    it('Deve ser direcionado para a página de checkout ao acionar o botão checkout', () => {
        checkoutPage.clickCheckoutButton();
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-one.html');
    });

    it('Deve mostrar erro ao preencher o primeiro nome, o último nome, mas não o postal code', () => {
        checkoutPage.clickCheckoutButton();
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-one.html');
        checkoutPage.enterFirstName('John');
        checkoutPage.enterLastName('Doe');
        // Não preenche o postal code
        cy.get('.btn_primary').click()
        checkoutPage.getErrorMessage().should('contain', 'Error: Postal Code is required');
    });

    it('Deve mostrar erro ao preencher o primeiro nome e o postal code, mas não o último nome', () => {

        checkoutPage.clickCheckoutButton();
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-one.html');
        checkoutPage.enterFirstName('John');
        checkoutPage.enterPostalCode('12345');
        // Não preenche o último nome
        cy.get('.btn_primary').click()
        checkoutPage.getErrorMessage().should('contain', 'Error: Last Name is required');
    });

    it('Deve mostrar erro ao preencher o último nome e o postal code, mas deixar o primeiro nome vazio', () => {

        checkoutPage.clickCheckoutButton();
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-one.html');
        checkoutPage.enterLastName('Doe');
        checkoutPage.enterPostalCode('12345');
        // Não preenche o primeiro nome
        cy.get('.btn_primary').click()
        checkoutPage.getErrorMessage().should('contain', 'Error: First Name is required');
    });

    it('Deve ser direcionado para a página de checkout-step-two após preencher todos os campos corretamente', () => {

        checkoutPage.clickCheckoutButton();
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-one.html');
        // Preenche todos os campos corretamente
        checkoutPage.completeCheckout('John','Doe','37401009');
    
        // Verifica se a URL está correta
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-two.html');
    });

    it('Deve exibir a mensagem "Checkout: Overview" na página checkout-step-two', () => {

        checkoutPage.clickCheckoutButton();
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-one.html');
        // Preenche todos os campos corretamente
        checkoutPage.completeCheckout('John','Doe','37401009');
    
        // Verifica se a URL está correta
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-two.html');
        // Verifica se a mensagem "Checkout: Overview" está visível
        checkoutPage.verifyOverviewMessage('Checkout: Overview');
    });

    it('Deve visualizar informações de pagamento', () => {

        checkoutPage.clickCheckoutButton();
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-one.html');
        // Preenche todos os campos corretamente
        checkoutPage.completeCheckout('John','Doe','37401009');
    
        // Verifica se a URL está correta
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-two.html');
        //verifica visibilidade item total
        checkoutPage.getItemTotal().should('be.visible').and('contain', 'Item total:');
        //verifica visibilidade tax
        checkoutPage.getTax().should('be.visible').and('contain', 'Tax:');
        //verifica visibilidade total
        checkoutPage.getTotal().should('be.visible').and('contain', 'Total:');
    });

    it ('Deve finalizar a compra', () => {
        checkoutPage.clickCheckoutButton();
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-one.html');
        checkoutPage.completeCheckout('John','Doe','37401009');
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-two.html');
       checkoutPage.clickCheckoutButton();
       cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-complete.html');

       cy.get('.complete-header').should('contain','THANK YOU FOR YOUR ORDER');

        
    });

}); 


