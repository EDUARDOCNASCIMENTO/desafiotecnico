import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

const categoryName = faker.person.fullName();
const image = faker.internet.url();

export class MessageData {
  readonly payloadPostCategories: any;
  readonly payloadPutCategories: any;
  readonly responsePutCategories: any;
  readonly responseGetCategories: any;
  readonly responsePostCategories: any;

  constructor() {
    // POST USER
    this.payloadPostCategories = {
      name: categoryName,
      image: image,
    };

    // PUT CATEGORY
    this.payloadPutCategories = {
      name: "name Updated",
      image: "https://www.x.com",
    };

    // EXPECTED RESPONSE POST CATEGORIES
    this.responsePostCategories = {
      name: categoryName,
      image: image,
      id: expect.any(Number),
      creationAt: expect.any(String),
      updatedAt: expect.any(String),
    };

    // EXPECTED RESPONSE GET CATEGORIES
    this.responseGetCategories = {
      name: expect.any(String),
      image: expect.stringMatching(/^https?:\/\//),
      id: expect.any(Number),
      creationAt: expect.any(String),
      updatedAt: expect.any(String),
    };

    // EXPECTED RESPONSE PUT CATEGORIES
    this.responsePutCategories = {
      id: expect.any(Number),
      name: "name Updated",
      image: "https://www.x.com",
      creationAt: expect.any(String),
      updatedAt: expect.any(String),
    };
  }
}
