pragma solidity >=0.4.22< 0.60;

contract Donations{
    
    address payable owner = msg.sender;
    string verifierName = "MEWR";
    address public verifierAddr = 0xF7d8385E9f3800768b562A433db7a269CADDc42C; 
    uint public stake = 0.1 ether; 
    uint public startTime = block.timestamp;
    uint public daysAfter = 1000;
    
    event DonatedChange(string _name, uint _amt);
    event Completed(uint _completionTime);
    
    constructor() public payable{
        assert(msg.value >= stake);
    }
    
    function donateChange(string memory _name) public payable{
        emit DonatedChange(_name, msg.value);
    }
    
    function attestCompletion() public{
        assert(msg.sender==verifierAddr);
        assert(now <= startTime + daysAfter*1 days);
        emit Completed(now);
        owner.transfer(stake);
    }
    
    
}