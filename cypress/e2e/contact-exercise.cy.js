/// <reference types="cypress" />

import contactData from '../fixtures/contact.json'

describe('Contact Us - Exercise', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
        cy.get('a[href="/contact_us"]').click()
    })

    it('Contact Us Form', () => {

        cy.get('input[data-qa="name"]').type(contactData.name)
        cy.get('input[data-qa="email"]').type(contactData.email)
        cy.get('input[data-qa="subject"]').type(contactData.subject)
        cy.get('[data-qa="message"]').type(contactData.message)

        cy.fixture('contact.json').as('file')
        cy.get('input[type="file"]').selectFile('@file')

        cy.get('[data-qa="submit-button"]').click()

        cy.get('.status')
            .should('be.visible')
            .should('have.text', 'Success! Your details have been submitted successfully.')

    });

});