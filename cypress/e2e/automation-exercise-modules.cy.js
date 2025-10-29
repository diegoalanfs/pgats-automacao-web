/// <reference types="cypress" />

import userData from '../fixtures/user.json'
import contactData from '../fixtures/contact.json'
import menu from '../modules/menu/index'
import login, {
    ERROR_MSG_INCORRECT_LOGIN,
    ERROR_MSG_EXISTING_USER
} from '../modules/login/index'
import cadastro from '../modules/register/index'
import contact from '../modules/contact/index'

describe('Automation Exercise', () => {

    beforeEach(() => {
        cy.visit('')
    })

    it('Register User', () => {
        menu.navigateToLogin()
        login.fillPreRegisterForm()
        cadastro.fillCompleteRegisterForm()
        cadastro.clickCreateAccount()
        cadastro.checkAccountCreated()
    });

    it('Login User with correct email and password', () => {
        menu.navigateToLogin()
        login.fillLoginForm(userData.user, userData.password)
        login.checkLoggedUser(userData.name)
    })

    it('Login User with incorrect email and password', () => {
        menu.navigateToLogin()
        login.fillLoginForm('invalid@mail.com', '147845')
        login.checkIncorrectLogin(ERROR_MSG_INCORRECT_LOGIN)
    })

    it('Logout User', () => {
        menu.navigateToLogin()
        login.fillLoginForm(userData.user, userData.password)
        login.checkLoggedUser(userData.name)
        login.clickLogout()
        login.checkLogout()
    })

    it('Register User with existing email', () => {
        menu.navigateToLogin()
        login.fillFormWithExistingUser(userData.name, userData.user)
        login.checkExistingUser(ERROR_MSG_EXISTING_USER)
    })

    it('Contact Us Form', () => {
        menu.navigateToContectUs()
        contact.fillContactUsForm(
            contactData.name,
            contactData.email,
            contactData.subject,
            contactData.message)
        contact.selectFile('contact.json')
        contact.submitMessage()
        contact.checkDataSubmit()
    });

});