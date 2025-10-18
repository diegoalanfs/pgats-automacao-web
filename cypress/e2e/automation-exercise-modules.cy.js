/// <reference types="cypress" />

import userData from '../fixtures/example.json'

import { faker } from '@faker-js/faker'

import menu from '../modules/menu/index'
import login from '../modules/login/index'
import cadastro from '../modules/cadastro/index'

describe('Automation Exercise', () => {

    beforeEach(() => {
        //cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com/')
        menu.navegarParaLogin()
    })

    it('Register User', () => {
        login.preencherFormularioDePreCadastro()

        cadastro.preencherFormularioDeCadastroCompleto()

        cy.get('[data-qa="create-account"]').click()

        cy.url().should('include', 'account_created')
        cy.contains('[data-qa="account-created"]', 'Account Created!')
        cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!')

    });

    it('Login User with correct email and password', () => {

        login.preencherFormularioDeLogin(userData.user,userData.password)

        cy.get('i.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible')


    })

    it('Login User with incorrect email and password', () => {

        login.preencherFormularioDeLogin('invalid@mail.com','147845')

        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')


    })

    it('Logout User', () => {

        login.preencherFormularioDeLogin(userData.user,userData.password)

        cy.get('i.fa-user').parent().should('contain', userData.name)
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