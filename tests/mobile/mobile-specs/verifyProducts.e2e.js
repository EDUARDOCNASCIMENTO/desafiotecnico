import CatalogScreen from "../screen-objects/Catalog.screen.js";
import LoginScreen from "../screen-objects/Login.screen.js";
import LeftSideMenuScreen from "../screen-objects/LeftSideMenu.screen.js";

describe("Test login in and verify products", () => {
  beforeEach(async () => {
    await LeftSideMenuScreen.expandMenuButton.click();
    await LeftSideMenuScreen.loginMenuOption.click();
  });

  it("should not login with invalid credentials", async () => {
    LoginScreen.login("wrongUser", "wrongPassword");
    await expect(LoginScreen.errorMessageText).toHaveText(
      "Provided credentials do not match any user in this service."
    );
  });

  it("should display product on the catalog screen", async () => {
    LoginScreen.login("bob@example.com", "10203040");
    await expect(CatalogScreen.productImageOne).toBeDisplayed();
    await expect(CatalogScreen.productImageTwo).toBeDisplayed();
  });
});