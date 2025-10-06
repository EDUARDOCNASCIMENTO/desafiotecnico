import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser } from "@playwright/test";
import { CustomWorld } from "./world";


setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({
    headless: process.env.CI === 'true' 
  });
  
  const context = await this.browser.newContext();
  this.page = await context.newPage();
});

// Verificando se o navegador foi iniciado
After(async function (this: CustomWorld) {
  if (this.browser) {
    await this.browser.close();
  }
});