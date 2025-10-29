class Product {
    get title() {
        return cy.get('h2.title.text-center');
    }

    verifyTitleText(expectedText) {
        this.title.should('be.visible');
        this.title.should('have.text', expectedText);
    }

    verifyProductsAtList() {
        cy.get('a:contains("View Product")').should('have.length.greaterThan', 0);
    }

    clickOnTheFirstViewProduct() {
        cy.get('a[href="/product_details/1"]').click();
    }

    checkProductDetailsScreen() {
        cy.url().should('include', 'product_details');
    }

    checkDetailsAreVisible() {
        cy.get('div.product-information h2')
            .should('be.visible')
        cy.get('div.product-information p')
            .should('contain.text', 'Category')
            .should('be.visible')
        cy.get('div.product-information span span')
            .should('be.visible')
        cy.get('div.product-information p')
            .should('contain.text', 'Availability')
            .should('be.visible')
        cy.get('div.product-information p')
            .should('contain.text', 'Condition')
            .should('be.visible')
        cy.get('div.product-information p')
            .should('contain.text', 'Brand')
            .should('be.visible')
    }

    fillSearchProduct(name, time = 0) {
        cy.get('input#search_product').clear().type(name, { delay: time });
    }

    clickSearchProduct() {
        cy.get('button#submit_search').click();
    }

    checkQuantityProductsAtList(quantity) {
        cy.get('a:contains("View Product")').should('have.length', quantity);
    }

    checkSearchProduct (product){
        cy.get('div.productinfo.text-center p').should('contain',  product)
    }
}

export default new Product();