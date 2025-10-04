import { Given, When, Then } from "@cucumber/cucumber";
import Checkout from "../page-objects/checkoutProducts.pom";
import { CustomWorld } from "../support/world";

Given("I open the Login page", async function (this: CustomWorld) {
  const checkout = new Checkout(this.page);
  await checkout.goto();
});

When("I enter with a registered user", async function (this: CustomWorld) {
  const checkout = new Checkout(this.page);
  this.username = "user_1759603077261@test.com";
  this.password = "jJpQOiCBrrU0iVR";
  await checkout.fillEmail(`${this.username}`);
  await checkout.fillPassword(this.password!);
  await checkout.clickLogin();
});

When("I place the order", async function (this: CustomWorld) {
  const checkout = new Checkout(this.page);
  await checkout.clickProductsButton();
  await checkout.addFirstProduct();
  await checkout.cartModalCheck();
  await checkout.continueShoppingButton();
  await checkout.addSecondProduct();
  await checkout.continueShoppingButton();
  await checkout.clickCartButton();
  await checkout.clickToProcede();
  await checkout.clickToPlaceOrder();
  await checkout.fillNameOnCard();
  await checkout.fillCardNumber(); 
   await checkout.fillCvcNumber();
  await checkout.fillExpiryMonth();
  await checkout.fillExpiryYear();
  await checkout.clickPayButton(); 
});

Then(
  "I should see the purchase confirmation", async function (this: CustomWorld) {
  const checkout = new Checkout(this.page);
  await checkout.checkOrderPlace();
  await checkout.clickDownloadInvoice();

});
