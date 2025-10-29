// ***************** MESSAGES *****************
export const SUCCESS_MSG_SUBSCRIBED =
    'You have been successfully subscribed!'

class Home {
    verifyHomePage() {
        cy.get('.fa-home')
            .parent()
            .should('have.attr', 'style')
            .and('include', 'color: orange');
    }

    scrollToBottom() {
        cy.scrollTo('bottom');
    }

    verifySubscriptionTitle() {
        cy.get('.single-widget h2')
            .should('be.visible')
            .should('contain', 'Subscription')
    }

    fillFormSubscription(email) {
        cy.get('input#susbscribe_email').type(email)
    }

    submitSubscription() {
        cy.get('button#subscribe').click()
    }

    checkSubscription(message) {
        cy.get('.alert-success')
            .should('be.visible')
            .should('have.text', message)
    }
}

export default new Home()