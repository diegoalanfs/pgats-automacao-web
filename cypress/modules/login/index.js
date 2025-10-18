import { getRandomEmail } from '../../support/helpers'
import { faker } from '@faker-js/faker'

class Login {
    preencherFormularioDePreCadastro() {
        cy.get('input[data-qa="signup-name"]').type('QA Tester')
        cy.get('input[data-qa="signup-email"]').type(getRandomEmail())
        cy.contains('button', 'Signup').click()
    }

    preencherFormularioDeLogin(user, password){
        cy.get('[data-qa="login-email"]').type(user)
        cy.get('[data-qa="login-password"]').type(password)
        cy.get('[data-qa="login-button"]').click()
    }
}

export default new Login()