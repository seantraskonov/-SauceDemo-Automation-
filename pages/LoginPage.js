 import {BASE_URL} from '../data/urls.js';

 export class LoginPage {
   constructor(page) {
    this.page = page;
  }
  // Locators
  get usernameField() {
    return this.page.locator('[data-test="username"]');
  }
  get passwordField() {
    return this.page.locator('[data-test="password"]');
  }
  get loginBtn() {
    return this.page.locator('[data-test="login-button"]');
  }
  get errorMessage() {
    return this.page.locator('[data-test="error"]');
   }
  // Navigate to login page
  async navigate() {
    await this.page.goto(BASE_URL);
   }
  // Login action
   async login(username, password) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginBtn.click();
  }}