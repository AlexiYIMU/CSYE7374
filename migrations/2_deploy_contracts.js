var Election = artifacts.require("./Election.sol");
var Register = artifacts.require("./Register.sol");
module.exports = function(deployer) {
  deployer.deploy(Election);
  deployer.deploy(Register);
};
