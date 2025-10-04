import { Given, When, Then } from "@cucumber/cucumber";
import SignUp from "../page-objects/registerNewUser.pom";
import { CustomWorld } from "../support/world";
import { faker } from "@faker-js/faker";

Given("I open the Sign Up page", async function (this: CustomWorld) {
  const signUp = new SignUp(this.page);
  await signUp.goto();
});

When("I fill the registration form", async function (this: CustomWorld) {
  const signUp = new SignUp(this.page);

  // Gerar dados aleatórios e salvar no World
  this.username = `user_${Date.now()}`;
  this.password = faker.internet.password();

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

  console.log(`✅ Usuário criado: ${this.username} / ${this.password}`);
});
