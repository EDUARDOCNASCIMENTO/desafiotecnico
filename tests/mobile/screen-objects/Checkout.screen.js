class CheckoutScreen {

  get checkoutAddressScreen() {
    return $('//android.widget.ScrollView[@content-desc="checkout address screen"]');
  }

  get fullNameField() {
    return $('~Full Name* input field');
  }

  get addressLineOneField() {
    return $('~Address Line 1* input field');
  }

  get cityField() {
    return $('~City* input field');
  }

  get zipCodeField() {
    return $('~Zip Code* input field');
  }
  
  get countryField() {
    return $('~Country* input field');
  }

  get toPaymentButton() {
    return $('~To Payment button');
  }

  async fillShippingAddress(fullName, address, city, zipCode, country) {
    await this.fullNameField.setValue(fullName);
    await this.addressLineOneField.setValue(address);
    await this.cityField.setValue(city);
    await this.zipCodeField.setValue(zipCode);
    await this.countryField.setValue(country);
  }
}

export default new CheckoutScreen();