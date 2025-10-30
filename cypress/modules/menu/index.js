class Menu {
    navigateToLogin() {
        cy.visit('/login');
    }

    navigateToContectUs() {
        cy.visit('/contact_us');
    }

    navigateToProducts() {
        cy.visit('/products');
    }

    navigateToHome() {
        cy.visit('');
    }

    navigateToCart() {
        cy.visit('/view_cart');
    }
}

export default new Menu()