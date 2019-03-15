pragma solidity ^0.4.24;

contract SmartPledge {
// Array logs live initiated pledges with creators address and IPFS hash.
// Pledges are removed when they have been finalised by sending to
// subject. Pledge status is set to 0 = pledge live, 1 = successfully complete, 2 = failed.
	struct PledgeStruct {
		address pledgeCreatorAddress;
		address pledgeSubjectAddress;
		bytes32 pledgeHash;
		uint pledgeAmount;
		uint8 pledgeStatus;
	}

	// Contract creator address
	address owner;
    function getOwner() view public returns (address) {
    	return owner;
    }
    constructor() public {
        owner = msg.sender;
    }

	// Fees collected for project creators from finalisePledge calls
	uint contractOwnerFees;
    function getContractOwnerFees() view public returns (uint) {
    	return contractOwnerFees;
    }

    // Dictionary of pledges
	mapping (bytes32 => PledgeStruct) public pledges;

	// Pledge creator functions
	// Creator sets up a pledge
	// with amount of Eth they want to give
	function createPledge(
		bytes32 _pledgeHash)
		public payable
		returns (bool success)
	{
		// Add pledge to mapping with unique hash
		// passed from IPFS storage node

		// Check that _pledgeHash is not already in use
		// since mapping index must be unique.
		require(pledges[_pledgeHash].pledgeCreatorAddress == 0x0000000000000000000000000000000000000000);
		// Add pledges 
		pledges[_pledgeHash].pledgeAmount = msg.value;
		pledges[_pledgeHash].pledgeCreatorAddress = msg.sender;
		pledges[_pledgeHash].pledgeStatus = 0;
		return true;
	}

	// Creator sets up a pledge including pledge subject's address
	// This is an overloaded function.
	function createPledgeWithAddress(
		bytes32 _pledgeHash,
		address _pledgeSubjectAddress)
		public payable
		returns (bool success)
	{
		// Add pledge to mapping with unique hash
		// passed from IPFS storage node

		// Check that _pledgeHash is not already in use
		// since mapping index must be unique.
		require(pledges[_pledgeHash].pledgeCreatorAddress == 0x0000000000000000000000000000000000000000);
		// Add pledges 
		pledges[_pledgeHash].pledgeAmount = msg.value;
		pledges[_pledgeHash].pledgeCreatorAddress = msg.sender;
		pledges[_pledgeHash].pledgeSubjectAddress = _pledgeSubjectAddress;
		pledges[_pledgeHash].pledgeStatus = 0;
		return true;
	}

	// Access a given pledge's details
	function getPledge(
		bytes32 _pledgeHash)
		view public
		returns(
			address pledgeCreatorAddress,
			address pledgeSubjectAddress,
			uint pledgeAmount,
			uint8 pledgeStatus
			) 
	{
		return (
			pledges[_pledgeHash].pledgeCreatorAddress,
			pledges[_pledgeHash].pledgeSubjectAddress,
			pledges[_pledgeHash].pledgeAmount,
			pledges[_pledgeHash].pledgeStatus
			);
	}

	// Pledge creator or contract owner accepts pledge on subject's behalf by adding their Ethereum address
	// TODO stop pledge being accepted if it already has an address assigned
	function acceptPledge(
		bytes32 _pledgeHash,
		address _pledgeSubjectAddress)
		public
		returns (bool success)
	{
		require(msg.sender == pledges[_pledgeHash].pledgeCreatorAddress || msg.sender == owner);
		pledges[_pledgeHash].pledgeSubjectAddress = _pledgeSubjectAddress;
		return true;
	}

	// Supporter adds funds to increase pledge success reward
	// TODO Check pledge is not complete before allowing funding
	function fundPledge(
		bytes32 _pledgeHash)
		public payable
		returns (bool success)
	{
		pledges[_pledgeHash].pledgeAmount += msg.value;
		return true;
	}

	// Creator marks pledge as successful and sends Ether to subject's Ethereum address if so
	function finalisePledge(
		bytes32 _pledgeHash,
		uint _pledgeStatus)
		public
		payable
		returns (bool success)
	{
		require(msg.sender == pledges[_pledgeHash].pledgeCreatorAddress || msg.sender == owner);
		require(pledges[_pledgeHash].pledgeStatus == 0);
		// Pay recipient Ether and project creators 2% of gift amount
		uint amount = pledges[_pledgeHash].pledgeAmount;
		uint fee = (amount / 100) * 2;
		uint finalPledge = amount - fee;
		contractOwnerFees = contractOwnerFees + fee;
		if(_pledgeStatus == 1) {
			// uint160 subjectAddress = address(uint160(bytes256(pledges[_pledgeHash].pledgeSubjectAddress)));
			// address payable subjectPayableAddress = subjectAddress;
			// subjectPayableAddress.transfer(finalPledge);
			pledges[_pledgeHash].pledgeSubjectAddress.transfer(finalPledge);
			pledges[_pledgeHash].pledgeStatus = 1;
		}
		else {
			pledges[_pledgeHash].pledgeStatus = 2;
		}
		return true;
	}

	// Project creators collect their fees
	function payContractOwner() public returns (bool success) {
		require (msg.sender == owner);
		owner.transfer(contractOwnerFees);
		contractOwnerFees = 0;
		return true;
	}

}
