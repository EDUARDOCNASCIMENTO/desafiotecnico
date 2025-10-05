class LeftSideMenuScreen {
  get expandMenuButton() {
    return $("~open menu");
  }

  get loginMenuOption() {
    return $('//*[@text="Log In"]');
  }
}

export default new LeftSideMenuScreen();
