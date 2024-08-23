class ProductPage {
    // Seletores
    getProductItems() {
        return cy.get('.inventory_item');
    }

    getProductName(index) {
        return cy.get(`.inventory_item:nth-child(${index}) .inventory_item_name`);
    }

    getProductPrice(index) {
        return cy.get(`.inventory_item:nth-child(${index}) .inventory_item_price`);
    }

    getProductDescription(index) {
        return cy.get(`.inventory_item:nth-child(${index}) .inventory_item_desc`);
    }

    getAddToCartButton(index) {
        return cy.get(`.inventory_item:nth-child(${index}) .btn_primary`);
    }

    getRemoveButton(index) {
        return cy.get(`.inventory_item:nth-child(${index}) .btn_secondary.btn_inventory`);
    }


    // Métodos
    verifyProductName(index, expectedName) {
        this.getProductName(index).should('have.text', expectedName);
    }

    verifyProductPrice(index, expectedPrice) {
        this.getProductPrice(index).should('have.text', expectedPrice);
    }

    verifyProductDescription(index, expectedDescription) {
        this.getProductDescription(index).should('have.text', expectedDescription);
    }

    addToCart(index) {
        this.getAddToCartButton(index).click();
    }
    removeFromCart(index) {
        this.getRemoveButton(index).click();
    }

}

export default ProductPage;
