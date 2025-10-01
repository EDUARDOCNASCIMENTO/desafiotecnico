import { test, expect, APIRequestContext } from "@playwright/test";
import { Env } from "../../../config/config";

export class MessageActions {
  private reqContext: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.reqContext = request;
  }

  // POST CATEGORIES REQUEST
  public async postCategories(body: any, returns: any, status: number) {
    let statusResponse: number;
    let callResponse: any;

    await test.step("01 - POST new category", async () => {
      const response = await this.reqContext.post(`/api/v1/categories`, {
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
      Env.CATEGORY_ID = callResponse.id;
      expect
        .soft(
          callResponse,
          `ID: ${Env.CATEGORY_ID} created for this category, is now saved.`
        )
        .toEqual(returns);
    });
  }

    // GET CATEGORIES REQUEST
    public async getCategories(id: string | undefined, returns: any, status: any) {
      let statusResponse: number;
      let callResponse: any;
  
      const url = id ? `/api/v1/categories/${id}` : `/api/v1/categories`;
  
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

  // PUT CATEGORIES REQUEST
  public async putCategory(body: any, returns: any, status: any) {
    let statusResponse: number;
    let callResponse: any;

    await test.step(`01 - PUT category identified as Id: ${Env.CATEGORY_ID}`, async () => {
      const response = await this.reqContext.put(
        `/api/v1/categories/${Env.CATEGORY_ID}`,
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

  // DELETE CATEGORIES REQUEST
  public async deleteCategory(returns: any, status: any) {
    let statusResponse: number;
    let callResponse: any;

    await test.step(`1 - DELETE CATEGORY ID: ${Env.CATEGORY_ID}`, async () => {
      const response = await this.reqContext.delete(
        `/api/v1/categories/${Env.CATEGORY_ID}`,
        {
          headers: {
            "x-auth-token": `${Env.TOKEN}`,
          },
        }
      );
      statusResponse = response.status();
      callResponse = await response.json();
    });

    await test.step(`2 - Validate DELETE category status: ${status}`, async () => {
      expect(statusResponse, "Expected status").toBe(status);
    });

    await test.step("3 - Validate DELETE response", async () => {
      expect
        .soft(callResponse, "The response does match the expected body.")
        .toEqual(returns);
    });
  }
}
