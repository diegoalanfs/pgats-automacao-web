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

    navigateToCart() {
        cy.visit('/view_cart')
    }

    clickDeleteAccount (){
        cy.get('a[href="/delete_account"]').click();
    }
}

export default new Menu()