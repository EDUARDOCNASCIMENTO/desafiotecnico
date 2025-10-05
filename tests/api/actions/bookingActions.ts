import { test, expect, APIRequestContext } from "@playwright/test";
import { Env } from "../../../config/config";

export class BookingActions {
  private reqContext: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.reqContext = request;
  }

  // POST AUTHENTICATION
  public async postAuthentication(body: any, returns: any, status: any) {
    let statusResponse: number;
    let callResponse: any;

    await test.step("01 - POST Authentication", async () => {
      const response = await this.reqContext.post(`/auth`, {
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

    await test.step(`04 - Get the TOKEN for future tests.`, async () => {
      Env.TOKEN = callResponse.token;
      expect.soft(callResponse, `TOKEN is now saved.`).toEqual(returns);
    });
  }

  // POST BOOKING
  public async postBooking(body: any, returns: any, status: any) {
    let statusResponse: number;
    let callResponse: any;

    await test.step("01 - POST new user", async () => {
      const response = await this.reqContext.post(`/booking`, {
        data: body,
      });
      statusResponse = response.status();
      try {
        callResponse = await response.json();
      } catch (error) {
        callResponse = await response.text();
        console.warn("Response was not a JSON but a text:", callResponse);
      }
    });

    await test.step(`02 - Validate the Status: ${status}.`, async () => {
      expect(statusResponse, "Expected status.").toBe(status);
    });

    await test.step("03 - Validate the POST response", async () => {
      expect
        .soft(callResponse, "The response does match the expected body.")
        .toEqual(returns);
    });

    await test.step(`04 - Get the booking ID for future tests: ${callResponse.bookingid}`, async () => {
      Env.BOOKING_ID = callResponse.bookingid;
      expect
        .soft(
          callResponse,
          `BOOOKING ID: ${Env.BOOKING_ID} created for this booking, is now saved.`
        )
        .toEqual(returns);
    });
  }

  // GET BOOKING
  public async getBookings(id: string | undefined, returns: any, status: any) {
    let statusResponse: number;
    let callResponse: any;

    const url = id ? `booking/${id}` : `booking`;

    await test.step(`01 - GET request to ${url}`, async () => {
      const response = await this.reqContext.get(url);
      statusResponse = response.status();
       try {
        callResponse = await response.json();
      } catch (error) {
        callResponse = await response.text();
        console.warn("Response was not a JSON but a text:", callResponse);
      }
    });

    await test.step(`02 - Validate GET status: ${status}`, async () => {
      expect(statusResponse, "Expected status").toBe(status);
    });

    await test.step("03 - Validate GET response", async () => {
      if (Array.isArray(callResponse)) {
        expect
          .soft(
            callResponse[0],
            "The GET ALL response does match the expected body."
          )
          .toEqual(returns);
      } else {
        expect
          .soft(
            callResponse,
            "The GET BY ID response does match the expected body."
          )
          .toEqual(returns);
      }
    });
  }

  //PUT BOOKING
  public async putBooking(
    id: string | undefined,
    body: any,
    returns: any,
    status: any
  ) {
    let statusResponse: number;
    let callResponse: any;
    const url = id ? `booking/${id}` : `booking`;

    await test.step(`01 - PUT user identified as Id: ${id}`, async () => {
      const response = await this.reqContext.put(url, {
        data: body,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Cookie: `token=${Env.TOKEN}`,
        },
      });

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

  //PATCH BOOKING
  public async patchBooking(
    id: string | undefined,
    body: any,
    returns: any,
    status: any
  ) {
    let statusResponse: number;
    let callResponse: any;
    const url = id ? `booking/${id}` : `booking`;

    await test.step(`01 - PUT user identified as Id: ${id}`, async () => {
      const response = await this.reqContext.patch(url, {
        data: body,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Cookie: `token=${Env.TOKEN}`,
        },
      });

      statusResponse = response.status();
      callResponse = await response.json();
    });

    await test.step(`02 - Validate the Status: ${status}.`, async () => {
      expect(statusResponse, "Expected status.").toBe(status);
    });

    await test.step("03 - Validate the PATCH response", async () => {
      expect
        .soft(callResponse, "The response does match the expected body.")
        .toEqual(returns);
    });
  }

  // DELETE BOOKING
  public async deleteBooking(
    id: string | undefined,
    returns: any,
    status: any
  ) {
    let statusResponse: number;
    let callResponse: any;
    const url = id ? `booking/${id}` : `booking`;

    await test.step(`1 - DELETE USER: ${Env.BOOKING_ID}`, async () => {
      const response = await this.reqContext.delete(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Cookie: `token=${Env.TOKEN}`,
        },
      });
      statusResponse = response.status();
      try {
        callResponse = await response.json();
      } catch (error) {
        callResponse = await response.text();
        console.warn("Response was not a JSON but a text:", callResponse);
      }
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
