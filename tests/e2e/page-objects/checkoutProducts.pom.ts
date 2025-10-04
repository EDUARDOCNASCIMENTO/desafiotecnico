import { type Locator, type Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.URL_BASE_E2E;
const nameOnCard = faker.person.fullName();
const card = faker.finance.creditCardNumber();
const cvc = faker.finance.creditCardCVV();

export default class Checkout {
  readonly page: Page;

  readonly inputEmail: Locator;
  readonly inputPassword: Locator;
  readonly loginButton: Locator;
  readonly cartButton: Locator;
  readonly productsButton: Locator;
  readonly firstProduct: Locator;
  readonly secondProduct: Locator;
  readonly continueShopping: Locator;
  readonly cartModal: Locator;
  readonly proceedButton: Locator;
  readonly addressDetailsSection: Locator;
  readonly placeOrderButton: Locator;
  readonly nameOnCard: Locator;
  readonly cardNumber: Locator;
  readonly cvcNumber: Locator;
  readonly expiryMonth: Locator;
  readonly expiryYear: Locator;
  readonly payButton: Locator;
  readonly orderedPlace: Locator;
  readonly downloadInvoice: Locator;

  constructor(page: Page) {
    this.page = page;

    this.inputEmail = page.locator('[data-qa="login-email"]');
    this.inputPassword = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.cartButton = page.locator('a[href="/view_cart"]').first();
    this.productsButton = page.locator('i.material-icons.card_travel');
    this.firstProduct = page.locator('a[data-product-id="5"].add-to-cart').first();
    this.secondProduct = page.locator('a[data-product-id="11"].add-to-cart').first();
    this.continueShopping = page.locator("button.close-modal", {hasText: "Continue",});
    this.cartModal = page.locator('[id="cartModal"]');
    this.proceedButton = page.locator('a.btn.btn-default.check_out', { hasText: 'Proceed To Checkout' });
    this.addressDetailsSection = page.locator('h2.heading', { hasText: 'Address Details' });
    this.placeOrderButton = page.locator('a', { hasText: 'Place Order' });
    this.nameOnCard = page.locator('[data-qa="name-on-card"]');
    this.cardNumber = page.locator('[data-qa="card-number"]');
    this.cvcNumber = page.locator('[data-qa="cvc"]');
    this.expiryMonth = page.locator('[data-qa="expiry-month"]');
    this.expiryYear = page.locator('[data-qa="expiry-year"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
    this.orderedPlace = page.locator('[data-qa="order-placed"]')
    this.downloadInvoice = page.locator('a.btn.btn-default.check_out');
  }

  async goto() {
    if (!BASE_URL) throw new Error("URL_BASE_E2E not defined in .env");
    await this.page.goto(`${BASE_URL}/signup`, {
      waitUntil: "domcontentloaded",
    });
  }

  async fillEmail(email: string) {
    await this.inputEmail.fill(email);
  }
  async fillPassword(password: string) {
    await this.inputPassword.fill(password);
  }
   async clickLogin() {
    await this.loginButton.click();
  }
  async clickProductsButton() {
    await this.productsButton.click({ force: true });
  }
  async clickCartButton() {
    await this.cartButton.click();
  }
  async addFirstProduct() {
    await this.firstProduct.click();
  }
  async continueShoppingButton() {
    await this.continueShopping.waitFor({ state: 'visible' });
    await this.continueShopping.click();
  }
  async cartModalCheck() {
    await this.cartModal.isVisible();
  }
  async addSecondProduct() {
    await this.secondProduct.click();
  }

  async clickToProcede() {
    await this.proceedButton.click();
    
  }
  async clickToPlaceOrder() {
     await this.placeOrderButton.click();
  }

  async fillNameOnCard() {
    await this.nameOnCard.fill(nameOnCard);
  }
  async fillCardNumber() {
    await this.cardNumber.fill(card);
  }
  async fillCvcNumber() {
    await this.cvcNumber.click();
    await this.cvcNumber.fill(cvc);
  }
  async fillExpiryMonth() {
    await this.expiryMonth.click();
    await this.expiryMonth.fill("06");
  }
  async fillExpiryYear() {
     await this.expiryYear.click();
    await this.expiryYear.fill("2029");
  }
  async clickPayButton() {
    await this.payButton.click();
  }
   async checkOrderPlace() {
    await this.orderedPlace.isVisible();
  }
     async clickDownloadInvoice() {
    await this.downloadInvoice.click();
  }
}
