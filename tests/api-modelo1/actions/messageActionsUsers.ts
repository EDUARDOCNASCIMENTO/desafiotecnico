import { test, expect, APIRequestContext } from "@playwright/test";
import { Env } from "../../../config/config";

export class MessageActions {
  private reqContext: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.reqContext = request;
  }

  // POST USER REQUEST
  public async postUser(body: any, returns: any, status: any) {
    let statusResponse: number;
    let callResponse: any;

    await test.step("01 - POST new user", async () => {
      const response = await this.reqContext.post(`/api/v1/users`, {
        data: body,
      });
      statusResponse = response.status();
      callResponse = await response.json();
    });

    await test.step(`02 - Validate the Status: ${status}.`, async () => {
      expect(statusResponse, "Expected status.").toBe(status);
    });

    await test.step("03 - Validate the POST response", async () => {
      expect
        .soft(callResponse, "The response does match the expected body.")
        .toEqual(returns);
    });

    await test.step(`04 - Get the user ID for future tests: ${callResponse.id}`, async () => {
      Env.USER_ID = callResponse.id;
      expect
        .soft(
          callResponse,
          `ID: ${process.env.USER_ID} created for this user, is now saved.`
        )
        .toEqual(returns);
    });
  }

  // GET USERS REQUEST
  public async getUser(id: string | undefined, returns: any, status: any) {
    let statusResponse: number;
    let callResponse: any;

    const url = id ? `/api/v1/users/${id}` : `/api/v1/users`;

    await test.step(`01 - GET request to ${url}`, async () => {
      const response = await this.reqContext.get(url);
      statusResponse = response.status();
      callResponse = await response.json();
    });

    await test.step(`02 - Validate GET status: ${status}`, async () => {
      expect(statusResponse, "Expected status").toBe(status);
    });

    await test.step("03 - Validate GET response", async () => {
      if (Array.isArray(callResponse)) {
        expect
          .soft(callResponse[0], "The GET ALL response does match the expected body.")
          .toEqual(returns);
      } else {
        expect
          .soft(callResponse, "The GET BY ID response does match the expected body.")
          .toEqual(returns);
      }
    });
  }

  // PUT USER REQUEST
  public async putUser(body: any, returns: any, status: any) {
    let statusResponse: number;
    let callResponse: any;

    await test.step(`01 - PUT user identified as Id: ${Env.USER_ID}`, async () => {
      const response = await this.reqContext.put(
        `/api/v1/users/${Env.USER_ID}`,
        {
          data: body,
        }
      );
      statusResponse = response.status();
      callResponse = await response.json();
    });

    await test.step(`02 - Validate the Status: ${status}.`, async () => {
      expect(statusResponse, "Expected status.").toBe(status);
    });

    await test.step("03 - Validate the PUT response", async () => {
      expect
        .soft(callResponse, "The response does match the expected body.")
        .toEqual(returns);
    });
  }

  // DELETE USER REQUEST
  public async deleteUser(returns: any, status: any) {
    let statusResponse: number;
    let callResponse: any;

    await test.step(`1 - DELETE USER: ${Env.USER_ID}`, async () => {
      const response = await this.reqContext.delete(
        `/api/v1/users/${Env.USER_ID}`,
        {
          headers: {
            "x-auth-token": `${Env.TOKEN}`,
          },
        }
      );
      statusResponse = response.status();
      callResponse = await response.json();
    });

    await test.step(`2 - Validate DELETE user status: ${status}`, async () => {
      expect(statusResponse, "Expected status").toBe(status);
    });

    await test.step("3 - Validate DELETE response", async () => {
      expect
        .soft(callResponse, "The response does match the expected body.")
        .toEqual(returns);
    });
  }
}