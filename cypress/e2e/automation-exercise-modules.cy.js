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
import product from '../modules/products/index'
import cart from '../modules/cart/index'
import home, {
    SUCCESS_MSG_SUBSCRIBED
} from '../modules/home/index'
import { faker } from '@faker-js/faker'
import { getRandomEmail } from '../support/helpers'

describe('Automation Exercise', () => {

    before(() => {
        menu.navigateToHome();
    })

    it('Register User', () => {
        const name = faker.person.firstName();
        const email = getRandomEmail();

        menu.navigateToLogin();
        login.fillPreRegisterForm(name, email);
        cadastro.fillCompleteRegisterForm();
        cadastro.clickCreateAccount();
        cadastro.checkAccountCreated();
    });

    it('Login User with correct email and password', () => {
        menu.navigateToLogin();
        login.fillLoginForm(userData.user, userData.password);
        login.checkLoggedUser(userData.name);
    })

    it('Login User with incorrect email and password', () => {
        menu.navigateToLogin();
        login.fillLoginForm('invalid@mail.com', '147845');
        login.checkIncorrectLogin(ERROR_MSG_INCORRECT_LOGIN);
    })

    it('Logout User', () => {
        menu.navigateToLogin();
        login.fillLoginForm(userData.user, userData.password);
        login.checkLoggedUser(userData.name);
        login.clickLogout();
        login.checkLogout();
    })

    it('Register User with existing email', () => {
        menu.navigateToLogin();
        login.fillFormWithExistingUser(userData.name, userData.user);
        login.checkExistingUser(ERROR_MSG_EXISTING_USER);
    })

    it('Contact Us Form', () => {
        menu.navigateToContectUs();
        contact.fillContactUsForm(
            contactData.name,
            contactData.email,
            contactData.subject,
            contactData.message);
        contact.selectFile('contact.json');
        contact.submitMessage();
        contact.checkDataSubmit();
    });

    it('Verify All Products and product detail page', () => {
        menu.navigateToProducts();
        product.verifyTitleText('All Products');
        product.verifyProductsAtList();
        product.clickOnTheFirstViewProduct();
        product.checkProductDetailsScreen();
        product.checkDetailsAreVisible();
    });

    it('Search Product', () => {
        const productName = 'Blue Top'

        menu.navigateToProducts();
        product.verifyTitleText('All Products');
        product.fillSearchProduct(productName);
        product.clickSearchProduct();
        product.verifyTitleText('Searched Products');
        product.checkQuantityProductsAtList(1);
        product.checkSearchProduct(productName);
    });

    it('Verify Subscription in home page', () => {
        menu.navigateToHome();
        home.verifyHomePage();
        home.scrollToBottom();
        home.verifySubscriptionTitle();
        home.fillFormSubscription(userData.user);
        home.submitSubscription();
        home.checkSubscription(SUCCESS_MSG_SUBSCRIBED);
    });

    it('Place Order: Register before Checkout', () => {
        const name = faker.person.firstName();
        const email = getRandomEmail();
        const productsId = [1, 2, 3];
        const comment = faker.lorem.lines(2);

        menu.navigateToLogin();
        login.fillPreRegisterForm(name, email);
        cadastro.registerUser();
        login.checkLoggedUser(name);

        productsId.forEach(productId => {
            cart.addProductToCart(productId);
            cart.clickContinueShoppingButton();
        });

        menu.navigateToCart();
        cart.checkCartPage();
        cart.checkout(productsId);
        cart.enterComment(comment);
        cart.clickPlaceOrder();
        cart.payment();
        home.deleteAccount();
    });
});