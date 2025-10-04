Feature: Sign Up

  Scenario: Validate the register new user
    Given I open the Sign Up page
    When I fill the registration form
    And I submit the registration
    Then I should see the confirmation page