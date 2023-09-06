@Multidelegation-DelegatedFunds-Popup @Testnet
Feature: Staking Page - Popup View

  @LW-8330
  Scenario Outline: Popup View - Delegation card displays correct data
    Given I open wallet: "<walletName>" in: popup mode
    And I disable showing Multidelegation beta banner
    When I navigate to Staking popup page
    Then I see Delegation title displayed for multidelegation
    And I see Delegation card displaying correct data
    Examples:
    | walletName                     |
    | MultidelegationDelegatedSingle |
    | MultidelegationDelegatedMulti  |