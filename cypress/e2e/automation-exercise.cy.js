/// <reference types="cypress" />

import usarData from '../fixtures/user.json'
import { 
    getRandomEmail,
    getRandomNumber
} from '../support/helpers'

import { faker } from '@faker-js/faker'

describe('Automation Exercise', () => {

    beforeEach(() => {
        //cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com/')
        cy.get('a[href="/login"]').click()
    })

    it('Register User', () => {
        //const timestamp = new Date().getTime()

        cy.get('input[data-qa="signup-name"]').type('QA Tester')
        cy.get('input[data-qa="signup-email"]').type(getRandomEmail())
        cy.contains('button', 'Signup').click()

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

        cy.get('[data-qa="create-account"]').click()

        cy.url().should('include', 'account_created')
        cy.contains('[data-qa="account-created"]', 'Account Created!')
        cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!')

    });

    it('Login User with correct email and password', () => {

        cy.get('[data-qa="login-email"]').type('qa-tester-1759531043853@mail.com')
        cy.get('[data-qa="login-password"]').type('pwd123')
        cy.get('[data-qa="login-button"]').click()

        cy.get('i.fa-user').parent().should('contain', 'QA Tester')
        cy.get('a[href="/logout"]').should('be.visible')


    })

    it('Login User with incorrect email and password', () => {

        cy.get('[data-qa="login-email"]').type('invalid@mail.com')
        cy.get('[data-qa="login-password"]').type('147845')
        cy.get('[data-qa="login-button"]').click()

        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')


    })

    it('Logout User', () => {

        cy.get('[data-qa="login-email"]').type('qa-tester-1759531043853@mail.com')
        cy.get('[data-qa="login-password"]').type('pwd123')
        cy.get('[data-qa="login-button"]').click()

        cy.get('i.fa-user').parent().should('contain', 'QA Tester')
        cy.get('a[href="/logout"]').should('be.visible')

        cy.get('a[href="/logout"]').should('be.visible').click()

        cy.url().should('contain', 'login')
        cy.contains('Login to your account')

        cy.get('a[href="/logout"]').should('not.exist')
        cy.get('a[href="/login"]').should('contain', 'Signup / Login')


    })

    it('Register User with existing email', () => {

        cy.get('input[data-qa="signup-name"]').type('QA Tester')
        cy.get('input[data-qa="signup-email"]').type('qa-tester-1759531043853@mail.com')
        cy.contains('button', 'Signup').click()

        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')


    })

});