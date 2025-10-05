import { type Locator, type Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.URL_BASE_E2E;

// Dados Faker padrão (continuam para métodos originais)
const fullName = faker.person.fullName();
const email = faker.internet.email();
const password = faker.internet.password();
const name = faker.person.firstName();
const lastName = faker.person.lastName();
const company = faker.company.name();
const address = faker.location.streetAddress();
const address2 = faker.location.streetAddress();
const city = faker.location.city();
const state = faker.location.state();
const zipcode = faker.location.zipCode();
const mobile = faker.phone.number();

export default class SignUp {
  readonly page: Page;

  readonly inputFullName: Locator;
  readonly inputEmail: Locator;
  readonly signUpButton: Locator;
  readonly femaleGender: Locator;
  readonly inputPassword: Locator;
  readonly selectDay: Locator;
  readonly selectMonth: Locator;
  readonly selectYear: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly companyName: Locator;
  readonly firstAddress: Locator;
  readonly secondAddress: Locator;
  readonly country: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zipCode: Locator;
  readonly mobileNumber: Locator;
  readonly createAccountButton: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.inputFullName = page.locator('[data-qa="signup-name"]');
    this.inputEmail = page.locator('[data-qa="signup-email"]');
    this.signUpButton = page.locator('[data-qa="signup-button"]');
    this.femaleGender = page.locator('[id="id_gender2"]');
    this.inputPassword = page.locator('[data-qa="password"]');
    this.selectDay = page.locator('[data-qa="days"]');
    this.selectMonth = page.locator('[data-qa="months"]');
    this.selectYear = page.locator('[data-qa="years"]');
    this.firstName = page.locator('[data-qa="first_name"]');
    this.lastName = page.locator('[data-qa="last_name"]');
    this.companyName = page.locator('[data-qa="company"]');
    this.firstAddress = page.locator('[data-qa="address"]');
    this.secondAddress = page.locator('[data-qa="address2"]');
    this.country = page.locator('[data-qa="country"]');
    this.city = page.locator('[data-qa="city"]');
    this.state = page.locator('[data-qa="state"]');
    this.zipCode = page.locator('[data-qa="zipcode"]');
    this.mobileNumber = page.locator('[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('[data-qa="create-account"]');
    this.confirmationMessage = page.locator("text=ACCOUNT CREATED!");
  }

  async goto() {
    if (!BASE_URL) throw new Error("URL_BASE_E2E not defined in .env");
    await this.page.goto(`${BASE_URL}/signup`, { waitUntil: "domcontentloaded" });
  }

  // ----------------- Métodos originais usando Faker ----------------
  async fillFullName() { await this.inputFullName.fill(fullName); }
  async fillEmail() { await this.inputEmail.fill(email); }
  async clickSignUp() { await this.signUpButton.click(); }
  async selectGender() { await this.femaleGender.check(); }
  async fillPassword() { await this.inputPassword.fill(password); }
  async selectDate() {
    await this.selectDay.selectOption("3");
    await this.selectMonth.selectOption("March");
    await this.selectYear.selectOption("1988");
  }
  async inputFirstName() { await this.firstName.fill(name); }
  async inputLastName() { await this.lastName.fill(lastName); }
  async inputCompany() { await this.companyName.fill(company); }
  async inputFirstAddress() { await this.firstAddress.fill(address); }
  async inputSecondAddress() { await this.secondAddress.fill(address2); }
  async selectCountry() { await this.country.selectOption("Australia"); }
  async inputCity() { await this.city.fill(city); }
  async inputState() { await this.state.fill(state); }
  async inputZipCode() { await this.zipCode.fill(zipcode); }
  async inputMobileNumber() { await this.mobileNumber.fill(mobile); }
  async createAccount() { await this.createAccountButton.click(); }

  async waitForConfirmation() {
    await this.confirmationMessage.waitFor({ timeout: 60000 });
  }

  // ----------------- Novos métodos para usar dados do World -----------------
  async fillEmailWith(email: string) {
    await this.inputEmail.fill(email);
  }

  async fillPasswordWith(password: string) {
    await this.inputPassword.fill(password);
  }
}
