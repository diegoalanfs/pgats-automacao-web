class Menu {
    navigateToLogin() {
        cy.visit('/login')
    }

    navigateToContectUs() {
        cy.visit('/contact_us')
    }
}

export default new Menu()