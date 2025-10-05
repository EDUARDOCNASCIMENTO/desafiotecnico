import { expect } from "@playwright/test";

export class BookingResponses {

  readonly responseGetBooking: any;
  readonly responsePostAuth: any;
  readonly responsePostBooking: any;

  constructor() {
      // EXPECTED RESPONSE POST AUTH
      this.responsePostAuth = {
        token: expect.any(String),
      };
  
      // EXPECTED RESPONSE POST BOOKING
      this.responsePostBooking = {
        bookingid: expect.any(Number),
        booking: {
          firstname: expect.any(String),
          lastname: expect.any(String),
          totalprice: expect.any(Number),
          depositpaid: expect.any(Boolean),
          bookingdates: {
            checkin: expect.any(String),
            checkout: expect.any(String),
          },
          additionalneeds: expect.any(String),
        },
      };
  
      // EXPECTED RESPONSE GET ALL BOOKINGS
      this.responseGetBooking = {
        bookingid: expect.any(Number),
      };
    }
  }