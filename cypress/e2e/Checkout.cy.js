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
        //Dado que usuário clicou no carrinho, quando for direcionado para nova página, Então o usuário será direcionado para o seguinte endereço
      
     cy.url().should('eq','https://www.saucedemo.com/v1/cart.html');

    });   

    it('Deve verificar o total de itens no carrinho', () => {
        //Dado que usuário inseriu três itens diferentes para compra, Quando for direcionado para o carrinho, Então será possível visualizar que os três itens estão sendo listados
        const expectedTotalItems = 3; 
        checkoutPage.verifyTotalCartItems(expectedTotalItems);
    });

    it('Deve retirar um item do carrinho e verificar nova quantidade de itens', () => {

        //Dado que usuário adicionou três itens no carrinho, Quando retirar um, Então será atualizada a quantidade de itens no carrinho para dois

        checkoutPage.removeFromCart(3); // Remove o primeiro item da lista
        const expectedTotalItems = 2; 
        checkoutPage.verifyTotalCartItems(expectedTotalItems);
    });

    it('Deve ser direcionado para a página de checkout ao acionar o botão checkout', () => {
        //dado que usuário confirmou todas as informaçoes do carrinho, quando acionar botão checkout, Então será direcionado para o primeiro passo das compras

        checkoutPage.clickCheckoutButton();
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-one.html');
    });

    it('Deve mostrar erro ao preencher o primeiro nome, o último nome, mas não o postal code', () => {

        //dado que usuário não preencheu o campo posta, quando acionar botão continuar, então a seguinte mensagem de erro será exibida

        checkoutPage.clickCheckoutButton();
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-one.html');
        checkoutPage.enterFirstName('John');
        checkoutPage.enterLastName('Doe');
        // Não preenche o postal code
        cy.get('.btn_primary').click()
        checkoutPage.getErrorMessage().should('contain', 'Error: Postal Code is required');
    });

    it('Deve mostrar erro ao preencher o primeiro nome e o postal code, mas não o último nome', () => {
        //dadp que usuário não preencheu o campo sobrenome, quando acionar botao continuar, então mensagem de erro será exibida

        checkoutPage.clickCheckoutButton();
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-one.html');
        checkoutPage.enterFirstName('John');
        checkoutPage.enterPostalCode('12345');
        // Não preenche o último nome
        cy.get('.btn_primary').click()
        checkoutPage.getErrorMessage().should('contain', 'Error: Last Name is required');
    });

    it('Deve mostrar erro ao preencher o último nome e o postal code, mas deixar o primeiro nome vazio', () => {

        //dado que usuário não preencheu seu primimeiro nome, quando acionar botão continuar, então mensagem de erro será exibida

        checkoutPage.clickCheckoutButton();
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-one.html');
        checkoutPage.enterLastName('Doe');
        checkoutPage.enterPostalCode('12345');
        // Não preenche o primeiro nome
        cy.get('.btn_primary').click()
        checkoutPage.getErrorMessage().should('contain', 'Error: First Name is required');
    });

    it('Deve ser direcionado para a página de checkout-step-two após preencher todos os campos corretamente', () => {

        //dado que usuário preencheu todos os dados corretamente, quando acionar botao continuar, então será direcionado para o segundo passo do checkout

        checkoutPage.clickCheckoutButton();
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-one.html');
        // Preenche todos os campos corretamente
        checkoutPage.completeCheckout('John','Doe','37401009');
    
        // Verifica se a URL está correta
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-two.html');
    });

    it('Deve exibir a mensagem "Checkout: Overview" na página checkout-step-two', () => {

        //dado que usuário foi direcionado para etapa dois, quando visualizar a pagina, então a mensagem "checkout:overview" estara visível 

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

        //dado que usuário esteja conferindo suas compras, quando conferir valores, então preço do produto, valor do imposto e valor total estarão disponíveis para visualização

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

        //dado que usuário validou informações desejadas, quando acionar o botão concluir, então será direcionado para a confirmação do fluxo

        checkoutPage.clickCheckoutButton();
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-one.html');
        checkoutPage.completeCheckout('John','Doe','37401009');
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-two.html');
       checkoutPage.clickCheckoutButton();
       cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-complete.html');

       cy.get('.complete-header').should('contain','THANK YOU FOR YOUR ORDER');

        
    });

}); 


