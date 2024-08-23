import LoginPage from '/Pages/LoginPage.js';
import ProductPage from '/Pages/ProductsPage.js';


describe('Product Page Tests', () => {
    let loginPage;
    let productPage;
    

    beforeEach(() => {
        loginPage = new LoginPage();
        productPage = new ProductPage();

        cy.visit("https://www.saucedemo.com/v1/");

        const username = "standard_user"; 
        const password = "secret_sauce"; 

        loginPage.login(username, password);
    });

    it('Deve verificar o nome, preço e descrição do primeiro produto', () => {

        //Dado que usuário esteja na pagina inicial de produtos, quando visualizar listgem, então será possível conferir nome do produto, valor e sua descrição

        productPage.verifyProductName(1, 'Sauce Labs Backpack');
        productPage.verifyProductPrice(1, '$29.99');
        productPage.verifyProductDescription(1, 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
    });

    it('Deve adicionar o primeiro produto ao carrinho', () => {

        //Dado que usuário clique em "add to cart", quando clicar no carrinho, então encontrará item adicionado

        productPage.addToCart(1);
        cy.get('.fa-layers-counter').click()
        cy.get('.cart_item').should('contain','Sauce Labs Backpack');
       
    });
    it('Deve adicionar todos os produtos ao carrinho', () => {

        //Dado que usuário tenha adicionado um produto de cada, quando visualizar ícone do carrinho, então a contagem corresponderá a quantidade de itens adicionados

        for (let i = 1; i <= 6; i++) {
            productPage.addToCart(i);
           
        }
        cy.get('.fa-layers-counter').should('contain','6');
    });
    
    it('Deve remover um produto do carrinho', () => {

        //Dado que usuário esteja adicionando produtos ao carrinho, quando acionar botão remover, então item será excluido do carrinho, tendo sua contagem atualizada


        //adiciona os itens no carrinho
        for (let i = 1; i <= 3; i++) {
            productPage.addToCart(i);
           
        }

        // remove o segundo item do carrinho
        productPage.removeFromCart(2);
        //confere que foi retirado um item do carrinho
        cy.get('.fa-layers-counter').should('contain','2');
    });
   

    it ('Deve verificar que todos os itens de inventário tem nomes visíveis', () => {

        //Dado que usuário esteja visualizando pagina de produtos, quando verificar itens disponíveis, então todos produtos terão seu nome exibidos 

        // ($el) variável que armazena cada elemento da classe inventory_item_name durante a iteração, para poder confirmar que todos itens existentes tem seu nome visível
        
        cy.get('.inventory_item_name').each(($el) => {
            cy.wrap($el).should('be.visible');
            
        });
        
    });
});
