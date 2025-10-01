  import { expect } from "@playwright/test";
  import { faker } from "@faker-js/faker";
  import { Env } from "../../../config/config";

  const userName = faker.person.fullName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const role = faker.helpers.arrayElement(["customer", "admin"]);
  const avatar = faker.internet.url();

  export class MessageData {
    readonly payloadPostUser: any;
    readonly payloadPutUser: any;
    readonly payloadPostUserInvalidEmail: any;
    readonly responsePostUser: any;
    readonly responsePutUser: any;
    readonly responseGetUser: any;
    readonly responseUserInvalidEmail: any;
    readonly responseDeleteInvalidID: any;

    constructor() {
      // POST USER
      this.payloadPostUser = {
        email: email,
        name: userName,
        password: password,
        role: role,
        avatar: avatar,
      };

      // PUT USER
      this.payloadPutUser = {
        email: "emailupdated@gmail.com",
        name: "name updated",
        password: "123456",
        role: "admin",
        avatar: "https://www.avatar.com",
      };

      // POST USER Invalid Email
      this.payloadPostUserInvalidEmail = {
        email: "emailupdatedgmail.com",
        name: userName,
        password: password,
        role: role,
        avatar: avatar,
      };

      // EXPECTED RESPONSE POST USER
      this.responsePostUser = {
        email: email,
        name: userName,
        password: password,
        role: role,
        avatar: avatar,
        id: expect.any(Number),
        creationAt: expect.any(String),
        updatedAt: expect.any(String),
      };

      // EXPECTED RESPONSE PUT USER
      this.responsePutUser = {
        email: "emailupdated@gmail.com",
        name: "name updated",
        password: "123456",
        role: "admin",
        avatar: "https://www.avatar.com",
        id: expect.any(Number),
        creationAt: expect.any(String),
        updatedAt: expect.any(String),
      };

      // EXPECTED RESPONSE GET USERS
      this.responseGetUser = {
        id: expect.any(Number),
        email: expect.stringMatching(/@/),
        password: expect.any(String),
        name: expect.any(String),
        role: expect.any(String),
        avatar: expect.stringMatching(/^https?:\/\//),
        creationAt: expect.any(String),
        updatedAt: expect.any(String),
      };

      // EXPECTED RESPONSE POST USER INVALID EMAIL
      this.responseUserInvalidEmail = {
        message: ["email must be an email"],
        error: "Bad Request",
        statusCode: 400,
      };

      // EXPECTED RESPONSE DELETE INVALID ID
      this.responseDeleteInvalidID = {
        path: `/api/v1/users/${Env.USER_ID}`,
        timestamp: expect.any(String),
        name: "EntityNotFoundError",
        message: `Could not find any entity of type "User" matching: {\n    "id": ${Env.USER_ID}\n}`,
      };
    }
  }
