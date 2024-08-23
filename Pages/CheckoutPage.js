class CheckoutPage {
   //metodos
    getFirstNameField() {
        return cy.get('[data-test="firstName"]');
    }

    getLastNameField() {
        return cy.get('[data-test="lastName"]');
    }

    getPostalCodeField() {
        return cy.get('[data-test="postalCode"]');
    }

    //adicionado depois
    getCartButton(){
        return cy.get('.shopping_cart_badge');
    }
    // Novo método para remover item do carrinho
    getRemoveButton(index) {
        return cy.get(`.cart_list > .cart_item:nth-child(${index}) .btn_secondary`);
    }
    getCheckoutButton(){
        return cy.get('.btn_action');
    }
  
    getCartQuantityElements() {
        return cy.get('.cart_quantity');
    }

    getContinueButton(){
        return cy.get(['btn_primary.cart_button']);
    }

    getFinishButton(){
        return cy.get(['btn_action.cart_button']);
    }
    getErrorMessage(){
        return cy.get('[data-test="error"]');
    }

    getOverviewMessege(){
       return cy.get('.subheader');
    }

    getItemTotal() {
        return cy.get('.summary_subtotal_label');
    }

    getTax() {
        return cy.get('.summary_tax_label');
    }

    getTotal() {
        return cy.get('.summary_total_label');
    }

    //seletores

     clickCartButton(){
        this.getCartButton().click();
     }

    enterFirstName(firstName) {
        this.getFirstNameField().type(firstName);
    }

    enterLastName(lastName) {
        this.getLastNameField().type(lastName);
    }

    enterPostalCode(postalCode) {
        this.getPostalCodeField().type(postalCode);
    }

    clickContinue(){
        this.getContinueButton().click();
    }

    clickFinish(){
        this.getFinishButton().click();
    }

 
    completeCheckout(firstName,lastName,postalCode){
        this.enterFirstName(firstName);
        this.enterLastName(lastName);
        this.enterPostalCode(postalCode);
        cy.get('.btn_primary').click()

    }

    removeFromCart(index) {
        this.getRemoveButton(index).click();
    }

    clickCheckoutButton() {
        this.getCheckoutButton().should('be.visible').click();
    }

    verifyOverviewMessage(expectedMessage){
        this.getOverviewMessege().should('contain', expectedMessage);
    }

    verifyTotalCartItems(expectedTotal) {
        let totalItems = 0;
        this.getCartQuantityElements().each(($el) => {
            const itemCount = parseInt($el.text(), 10);
            totalItems += itemCount;
        }).then(() => {
            expect(totalItems).to.eq(expectedTotal);
        });
        
    }

}

export default CheckoutPage;