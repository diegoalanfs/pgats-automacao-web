// ***************** MESSAGES *****************
export const SUCCESS_MSG_SUBSCRIBED =
    'You have been successfully subscribed!';

export const SUCCESS_MSG_DELETE_ACCOUNT =
    'Your account has been permanently deleted!';

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
            .should('contain', 'Subscription');
    }

    fillFormSubscription(email) {
        cy.get('input#susbscribe_email').type(email);
    }

    submitSubscription() {
        cy.get('button#subscribe').click();
    }

    checkSubscription(message) {
        cy.get('.alert-success')
            .should('be.visible')
            .should('have.text', message);
    }

    checkDeleteAccount(message) {
        cy.get('[data-qa="account-deleted"]').should('be.visible')
        cy.get('#form p')
            .first()
            .should('contain', message);
    }

    clickContinueAfterDeleteAccount (){
        cy.get('[data-qa="continue-button"]').click();
    }

    clickDeleteAccount (){
        cy.get('a[href="/delete_account"]').click();
    }

    deleteAccount(){
        this.clickDeleteAccount();
        this.checkDeleteAccount(SUCCESS_MSG_DELETE_ACCOUNT);
        this.clickContinueAfterDeleteAccount();
        this.verifyHomePage();
    }
}

export default new Home()