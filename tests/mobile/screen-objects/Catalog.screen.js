class CatalogScreen {
  get productsHeader() {
    return $(
      'android=new UiSelector().text("Products").className("android.widget.TextView")'
    );
  }

  get productImageOne() {
    return $('android=new UiSelector().className("android.widget.ImageView").instance(5)');
  }

  get productImageTwo() {
    return $('android=new UiSelector().className("android.widget.ImageView").instance(6)');
  }

  get addToCartButtonOne() {
    return $('android=new UiSelector().text("ADD TO CART").instance(1)'); 
  }

  get addToCartButtonTwo() {
    return $('android=new UiSelector().text("ADD TO CART").instance(2)');
  }

  get shoppingCartIcon() {
    return $('~Cart-Badge'); 
  }

  get proceedToCheckoutButton() {
    return $('android=new UiSelector().text("Proceed To Checkout")');
  }
}

export default new CatalogScreen();