import { faker } from "@faker-js/faker";

const firstname = faker.person.firstName();
const lastname = faker.person.lastName();
const breakfast = faker.food.vegetable();

export class BookingPayloads {

  readonly payloadPostBooking: any;
  readonly payloadPostAuth: any;
  readonly payloadPutBooking: any;
  readonly payloadPatchBooking: any;
  readonly payloadPostInvalidName: any;

  constructor() {

    // POST AUTH
    this.payloadPostAuth = {
      username: "admin",
      password: "password123",
    };

    // POST BOOKING
    this.payloadPostBooking = {
      firstname: firstname,
      lastname: lastname,
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
      },
      additionalneeds: breakfast,
    };

    // PUT BOOKING
    this.payloadPutBooking = {
      firstname: "Paulo",
      lastname: "Pires",
      totalprice: 600,
      depositpaid: true,
      bookingdates: {
        checkin: "2023-01-01",
        checkout: "2024-01-01",
      },
      additionalneeds: "Test",
    };

    //PATCH BOOKING
    this.payloadPatchBooking = {
      firstname: "Wagner",
      lastname: "Almeida",
      totalprice: 700,
      depositpaid: true,
      bookingdates: {
        checkin: "2025-05-06",
        checkout: "2025-08-11",
      },
      additionalneeds: "Test",
    };

    // POST INVALID BOOKING
    this.payloadPostInvalidName = {
      firstname: 60,
      lastname: lastname,
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
      },
      additionalneeds: breakfast,
    };
  }
}
