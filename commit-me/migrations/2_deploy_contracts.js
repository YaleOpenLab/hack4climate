var SmartPledge = artifacts.require("./SmartPledge.sol");

module.exports = function(deployer) {
  deployer.deploy(SmartPledge);
};
