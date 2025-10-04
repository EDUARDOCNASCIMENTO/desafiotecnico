Feature: Checkout

  Scenario: Checkout some products
    Given I open the Login page
    When I enter with a registered user
    And I place the order
    Then I should see the purchase confirmation
