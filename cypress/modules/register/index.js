import { faker } from '@faker-js/faker'

class Cadastro {
    fillCompleteRegisterForm() {
        cy.get('input#id_gender1').check()
        cy.get('input#password').type(faker.internet.password({ length: 6 }), { log: false })

        cy.get('select#days').select('13')
        cy.get('select#months').select('December')
        cy.get('select#years').select('1990')

        cy.get('input#newsletter').check()
        cy.get('input#optin').check()

        cy.get('input#first_name').type(faker.person.firstName())
        cy.get('input#last_name').type(faker.person.lastName())
        cy.get('input#company').type(faker.company.name())
        cy.get('input#address1').type(faker.location.streetAddress())
        cy.get('[data-qa="country"]').select('Canada')
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type('111 222 333')
    }

    clickCreateAccount() {
        cy.get('[data-qa="create-account"]').click()
    }

    checkAccountCreated (){
        cy.url().should('include', 'account_created')
        cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!')
    }

    clickButtonContinue (){
        cy.get('[data-qa="continue-button"]').click()
    }

    registerUser (){
        this.fillCompleteRegisterForm();
        this.clickCreateAccount();
        this.checkAccountCreated();
        this.clickButtonContinue();
    }
}

export default new Cadastro()