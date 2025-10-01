import { test, request, APIRequestContext } from "@playwright/test";
import { MessageData } from "../data/messageDataUsers";
import { MessageActions } from "../actions/messageActionsUsers";
import { Env } from "../../../config/config";

test.describe.serial("Validate API", () => {
  
  let messageData: MessageData;
  let messageActions: MessageActions;
  let apiRequestContext: APIRequestContext;  

  test.beforeAll(async () => {
    apiRequestContext = await request.newContext();
    messageData = new MessageData();
    messageActions = new MessageActions(apiRequestContext);
  });

  test('01 - GET ALL USERS', async () => {
    await messageActions.getUser(Env.NULL_USER, messageData.responseGetUser, 200);
  });

  test('02 - POST NEW USER', async () => {
    await messageActions.postUser(messageData.payloadPostUser, messageData.responsePostUser, 201);
  });

  test('03 - GET USER BY ID', async () => {
    await messageActions.getUser(Env.USER_ID, messageData.responsePostUser, 200);
  });

  test('04 - PUT USER', async () => {
    await messageActions.putUser(messageData.payloadPutUser, messageData.responsePutUser, 200);
  });

  test('05 - DELETE USER', async () => {
    await messageActions.deleteUser(true, 200);
  });

  test('06 - POST USER WITH INVALID E-MAIL', async () => {
    await messageActions.postUser(messageData.payloadPostUserInvalidEmail, messageData.responseUserInvalidEmail, 400);
  });
}); 