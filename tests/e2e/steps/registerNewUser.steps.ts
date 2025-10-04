import { Before, After, Given, When, Then } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import SignUp from "../page-objects/registerNewUser.pom";
import { CustomWorld } from "../support/world";

// ----------------- Hooks -----------------

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({ headless: false });
  const context = await this.browser.newContext();
  this.page = await context.newPage();
});

After(async function (this: CustomWorld) {
  await this.browser.close();
});

// ----------------- Steps -----------------

Given("I open the Sign Up page", async function (this: CustomWorld) {
  const signUp = new SignUp(this.page);
  await signUp.goto();
});

When("I fill the registration form", async function (this: CustomWorld) {
  const signUp = new SignUp(this.page);

  // Gerar e salvar dados de usuário no World
  this.username = `user_${Date.now()}`;
  this.password = "test@123";

  await signUp.fillFullName();
await signUp.fillEmailWith(`${this.username}@test.com`);
  await signUp.clickSignUp();
  await signUp.selectGender();
  await signUp.fillPasswordWith(this.password);
  await signUp.selectDate();
  await signUp.inputFirstName();
  await signUp.inputLastName();
  await signUp.inputCompany();
  await signUp.inputFirstAddress();
  await signUp.inputSecondAddress();
  await signUp.selectCountry();
  await signUp.inputState();
  await signUp.inputCity();
  await signUp.inputZipCode();
  await signUp.inputMobileNumber();
});

When("I submit the registration", async function (this: CustomWorld) {
  const signUp = new SignUp(this.page);
  await signUp.createAccount();
});

Then("I should see the confirmation page", async function (this: CustomWorld) {
  const signUp = new SignUp(this.page);
  await signUp.waitForConfirmation();

  // Validação opcional e log de confirmação
  console.log(`✅ Usuário criado: ${this.username!} / ${this.password!}`);
});
