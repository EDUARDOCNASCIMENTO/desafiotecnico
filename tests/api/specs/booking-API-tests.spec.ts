import { test, request , APIRequestContext } from "@playwright/test";
import { BookingPayloads } from "../data/bookingPayloads";
import { BookingResponses } from "../data/bookingResponses"; 
import { BookingActions } from "../actions/bookingActions";
import { Env } from "../../../config/config";

test.describe.serial("Validate API BOOKINGS - Positive Scenarios", () => {

    let bookingPayloads: BookingPayloads;
    let bookingResponses: BookingResponses;
    let bookingActions: BookingActions;
    let apiRequestContext: APIRequestContext;  
  
    test.beforeAll(async () => {
    apiRequestContext = await request.newContext({
    baseURL: process.env.URL_BASE_API, 
  });
      
      bookingPayloads = new BookingPayloads();
      bookingResponses = new BookingResponses();
      bookingActions = new BookingActions(apiRequestContext);
    });

  test('01 - POST Auth', async () => {
    await bookingActions.postAuthentication(bookingPayloads.payloadPostAuth, bookingResponses.responsePostAuth, 200);
  });

  test('02 - GET all bookings', async () => {
    await bookingActions.getBookings(Env.NULL_USER, bookingResponses.responseGetBooking, 200);
  });
 
   test('03 - POST new booking', async () => {
    await bookingActions.postBooking(bookingPayloads.payloadPostBooking, bookingResponses.responsePostBooking, 200);
  });

  test('04 - GET booking by ID', async () => {
    await bookingActions.getBookings(Env.BOOKING_ID, bookingPayloads.payloadPostBooking, 200);
  });

  test('05 - PUT booking', async () => {
    await bookingActions.putBooking(Env.BOOKING_ID, bookingPayloads.payloadPutBooking, bookingPayloads.payloadPutBooking, 200);
  });

  test('06 - PATCH booking', async () => {
    await bookingActions.patchBooking(Env.BOOKING_ID, bookingPayloads.payloadPatchBooking, bookingPayloads.payloadPatchBooking, 200);
  });

  test('07 - DELETE booking', async () => {
    await bookingActions.deleteBooking(Env.BOOKING_ID, "Created", 201);
  });  

  
  test.describe.serial("Validate API BOOKINGS - Negative Scenarios", () => {

    test('01 - POST new booking with invalid name', async () => {
    await bookingActions.postBooking(bookingPayloads.payloadPostInvalidName, "Internal Server Error", 500);
  });

   test('02 - DELETE invalid booking', async () => {
    await bookingActions.deleteBooking("X", "Method Not Allowed", 405);
  });  

   test('03 - GET non-existing booking by ID', async () => {
    await bookingActions.getBookings("3456789", "Not Found", 404);
  });
});
}); 