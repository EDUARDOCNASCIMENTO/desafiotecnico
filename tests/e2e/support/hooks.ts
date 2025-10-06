import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser } from "@playwright/test";
import { CustomWorld } from "./world";

// Aumenta o timeout para 60 segundos por step (isso está correto)
setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld) {
  // Inicia o navegador.
  // A opção 'headless' agora é dinâmica:
  // - Localmente (sem a var CI), ele abrirá a janela do navegador.
  // - Na pipeline (onde CI=true), ele rodará em background.
  this.browser = await chromium.launch({
    headless: process.env.CI === 'true' 
  });
  
  const context = await this.browser.newContext();
  this.page = await context.newPage();
});

After(async function (this: CustomWorld) {
  // Adiciona uma verificação para garantir que o navegador foi iniciado
  // antes de tentar fechá-lo. Isso evita erros.
  if (this.browser) {
    await this.browser.close();
  }
});