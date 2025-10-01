import { test, request, APIRequestContext } from "@playwright/test";
import { MessageData } from "../data/messageDataCategories";
import { MessageActions } from "../actions/messageActionsCategories";
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

  test('01 - GET ALL CATEGORY', async () => {
    await messageActions.getCategories(Env.NULL_USER, messageData.responseGetCategories, 200);
  });
 
  test('02 - POST NEW CATEGORY', async () => {
    await messageActions.postCategories(messageData.payloadPostCategories, messageData.responsePostCategories, 201);
  });

  test('03 - GET CATEGORY BY ID', async () => {
    await messageActions.getCategories(Env.CATEGORY_ID, messageData.responsePostCategories, 200);
  });

  test('04 - PUT CATEGORY', async () => {
    await messageActions.putCategory(messageData.payloadPutCategories, messageData.responsePutCategories, 200);
  });

  test('05 - DELETE CATEGORY', async () => {
    await messageActions.deleteCategory(true, 200);
  }); 
}); 