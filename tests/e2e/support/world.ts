import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, Page } from "@playwright/test";

export class CustomWorld extends World {
  browser!: Browser;  // ⬅️ declare o tipo
  page!: Page;        // ⬅️ declare o tipo
  username?: string;
  password?: string;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
