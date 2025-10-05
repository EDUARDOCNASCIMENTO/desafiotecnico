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

  // ADICIONAR NOVOS SELECTORES PARA BOTÕES 'ADD TO CART'
  // *** VERIFIQUE ESTES SELECTORES COM UM INSPECTOR, SÃO APENAS EXEMPLOS ***
  get addToCartButtonOne() {
    // Exemplo: assumindo que há um botão 'Add to Cart' associado ao instance(5) da imagem
    return $('android=new UiSelector().text("ADD TO CART").instance(1)'); // Ajuste este seletor
  }

  get addToCartButtonTwo() {
    // Exemplo: assumindo que há um botão 'Add to Cart' associado ao instance(6) da imagem
    return $('android=new UiSelector().text("ADD TO CART").instance(2)'); // Ajuste este seletor
  }

  // Seletor para o ícone do carrinho de compras (geralmente no topo)
  get shoppingCartIcon() {
    return $('~Cart-Badge'); // Este é um seletor comum para o ícone do carrinho
  }

  // Seletor para o botão "Proceed To Checkout"
  get proceedToCheckoutButton() {
    return $('android=new UiSelector().text("Proceed To Checkout")');
  }
}

export default new CatalogScreen();