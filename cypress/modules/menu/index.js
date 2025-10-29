class Menu {
    navigateToLogin() {
        cy.visit('/login')
    }

    navigateToContectUs() {
        cy.visit('/contact_us')
    }

    navigateToProducts() {
        cy.visit('/products')
    }

    navigateTohome() {
        cy.visit('')
    }
}

export default new Menu()