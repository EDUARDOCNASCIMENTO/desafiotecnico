import { Before, After , setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { CustomWorld } from "./world";

// Aumenta timeout para 60 segundos por step
setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld) {
  // Abre navegador e cria página apenas uma vez por cenário
  this.browser = await chromium.launch({ headless: false });
  const context = await this.browser.newContext();
  this.page = await context.newPage();
});

After(async function (this: CustomWorld) {
  // Fecha navegador ao final do cenário
  await this.browser.close();
});
