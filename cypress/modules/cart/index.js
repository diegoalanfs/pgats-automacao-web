import { faker } from '@faker-js/faker'

export const SUCCESS_MSG_ORDER_PLACED =
    'Congratulations! Your order has been confirmed!'

class Cart {
    addProductToCart = (productId) => {
        cy.get(`a[data-product-id="${productId}"].add-to-cart`)
            .first()
            .should('be.visible')
            .click();
    };

    clickContinueShoppingButton() {
        cy.contains('button', 'Continue Shopping').click();
    }

    checkCartPage() {
        cy.url().should('contain', 'cart');
        cy.get('section#cart_items').should('contain', 'Shopping Cart');
    }

    clickProceedToCheckout() {
        cy.get('a.btn.btn-default.check_out').click();
    }

    checkCheckoutPage() {
        cy.url().should('include', '/checkout');
        cy.get('section#cart_items')
            .should('contain', 'Checkout')
            .should('be.visible');
    }

    reviewOrder(productId) {
        cy.get(`a[href="/product_details/${productId}"]`).should('be.visible');
    }

    enterComment(message) {
        cy.get('textarea[name="message"]').type(message);
    }

    clickPlaceOrder() {
        cy.get('a.btn.btn-default.check_out').click();
    }

    checkPaymentPage() {
        cy.url().should('include', '/payment');
        cy.get('section#cart_items')
            .should('contain', 'Payment')
            .should('be.visible');
    }

    fillPaymentForm() {
        cy.get('input[data-qa=name-on-card]').type(faker.person.fullName());
        cy.get('input[data-qa=card-number]').type(faker.finance.creditCardNumber());
        cy.get('input[data-qa=cvc]').type(faker.finance.creditCardCVV());
        cy.get('input[data-qa=expiry-month]').type(faker.date.future().getMonth() + 1);
        cy.get('input[data-qa=expiry-year]').type(faker.date.future().getFullYear());
    }

    clickPayAndConfirmOrder() {
        cy.get('[data-qa="pay-button"]').click();
    }

    checkOrderPlaced(message) {
        cy.get('[data-qa="order-placed"]').should('be.visible');
        cy.get('.col-sm-9 > p').should('contain', message);
    }

    checkout(productsId) {
        this.clickProceedToCheckout();
        this.checkCheckoutPage();

        productsId.forEach(productId => {
            this.reviewOrder(productId);
        });
    }

    payment() {
        this.checkPaymentPage();
        this.fillPaymentForm();
        this.clickPayAndConfirmOrder();
        this.checkOrderPlaced(SUCCESS_MSG_ORDER_PLACED);
    }
}

export default new Cart()