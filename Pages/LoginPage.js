class LoginPage {
    
    getUserNameField() {
        return cy.get('[data-test="username"]');
    }

    getPasswordField() {
        return cy.get('[data-test="password"]');
    }

    getLoginButton() {
        return cy.get('#login-button');
    }

    enterUsername(username) {
        this.getUserNameField().type(username);
    }

    enterPassword(password) {
        this.getPasswordField().type(password);
    }

    clickLogin() {
        this.getLoginButton().click();
    }

    login(username, password) {
        this.enterUsername(username);
        this.enterPassword(password);
        this.clickLogin();
    }
}

export default LoginPage;
