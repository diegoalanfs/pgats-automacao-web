import { getRandomEmail } from '../../support/helpers'
import { faker } from '@faker-js/faker'

export const ERROR_MSG_INCORRECT_LOGIN =
  'Your email or password is incorrect!'
export const ERROR_MSG_EXISTING_USER =
  'Email Address already exist!'

class Login {
    fillPreRegisterForm() {
        cy.get('input[data-qa="signup-name"]').type('QA Tester')
        cy.get('input[data-qa="signup-email"]').type(getRandomEmail())
        cy.contains('button', 'Signup').click()
    }

    fillLoginForm(user, password){
        cy.get('[data-qa="login-email"]').type(user)
        cy.get('[data-qa="login-password"]').type(password)
        cy.get('[data-qa="login-button"]').click()
    }

    checkLoggedUser (name){
        cy.get('i.fa-user').parent().should('contain', name)
        cy.get('a[href="/logout"]').should('be.visible')
    }

    checkIncorrectLogin (message){
        cy.get('.login-form > form > p').should('contain', message)
    }

    clickLogout (){
        cy.get('a[href="/logout"]').click()
    }

    checkLogout (){
        cy.url().should('contain', 'login')
        cy.contains('Login to your account')
        cy.get('a[href="/logout"]').should('not.exist')
        cy.get('a[href="/login"]').should('contain', 'Signup / Login')
    }

    fillFormWithExistingUser(name , email) {
        cy.get('input[data-qa="signup-name"]').type(name)
        cy.get('input[data-qa="signup-email"]').type(email)
        cy.contains('button', 'Signup').click()
    }

    checkExistingUser (message) {
        cy.get('.signup-form > form > p').should('contain', message)
    }
}

export default new Login()