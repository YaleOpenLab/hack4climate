pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SmartPledge.sol";

contract TestSmartPledge {

    function testSettingAnOwnerDuringCreation() public {
    SmartPledge smartpledge = new SmartPledge();
    Assert.equal(smartpledge.getOwner(), this, "Owner is different than a deployer");
  }

}
