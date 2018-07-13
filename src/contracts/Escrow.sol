pragma solidity ^0.4.17;

//Contract to Spawn new Escrow Contracts ensuring the Integrity.
contract EscrowFactory{
    //BEGIN DECLARATIONS
    //Mapping to ensure that an specific contract was deployed using this Factory
    mapping(address => bool) public deployedContracts;
    //Manager info, in case that someone needs to contact the createEscrowContract
    address public creator;
    //END DECLARATIONS
    
    //BEGIN EVENTS
    event ContractCreated(address contractAddress);
    //END EVENTS
    
    //BEGIN FUNCTIONS
    constructor() public {
        creator = msg.sender;
    }
    //Spawner Function
    function createEscrowContract(address seller) public payable returns (address) {
        address deployedContract = (new Escrow).value(this.balance)(msg.sender, seller);
        emit ContractCreated(deployedContract);
        creator = msg.sender;
        deployedContracts[deployedContract] = true;
        return deployedContract;
    }
    
    function checkDeployedContract(address contractAddress) public view returns (bool){
        return deployedContracts[contractAddress];
    }
    //END FUNCTIONS
    
}

contract Escrow{
    //BEGIN DECLARATIONS
    uint constant FROZEN_DAYS = 45 days; //45 Days for Frozen Transaction
    address public buyer;
    address public seller;
    uint public frozenDate;
    bool public frozenPayment;
    mapping(address => bool) public status;
    mapping(address => bool) public consensus;
    //END DECLARATIONS
    
    //BEGIN MODIFIERS
    modifier isBuyerOrSeller(){
        require(msg.sender == buyer || msg.sender == seller);
        _;
    }
    
    modifier openContract(){
        //If both, Buyer and Seller got their status for transaction as true
        require(!(status[buyer] && status[seller]));
        _;
    }
    
    modifier closedContract(){
        require(status[buyer] && status[seller]);
        _;
    }
    
    modifier statusSet(){
        //Buyer or Seller has already the status for the contract
        require(!status[msg.sender]);
        _;
    }
    //END MODIFIERS
    
    //BEGIN EVENTS
    event MessageGenerator(string message);
    //END EVENTS
    
    //BEGIN CONSTRUCTOR
    constructor(address _buyer, address _seller) public payable {
        //The Buyer creates the Contract
        require(_buyer != _seller);
        buyer = _buyer;
        seller = _seller;
        frozenPayment = false;
    }
    //END CONSTRUCTOR
    
    //FUNCTIONS
    //Set Status for the contract for buyer or seller
    function setStatus(bool _status) public isBuyerOrSeller openContract statusSet{
        consensus[msg.sender] = _status;
        status[msg.sender] = true;
    }
    
    function claimPayment() public isBuyerOrSeller closedContract {
        //Multiple Cases
        //Case #1 Buyer and Seller Agreed on Pay the Transaction
        if(consensus[buyer] && consensus[seller]){
            //Transfer all the money to the Seller.
            seller.transfer(this.balance);
            emit MessageGenerator("Transfer to the Seller: Done");
        }
        //Case #2 Buyer and Seller Agreed on Cancel the Transaction
        else if(!consensus[buyer] && !consensus[seller]){
            //Transfer all the money to the Buyer
            buyer.transfer(this.balance);
            emit MessageGenerator("Return to the Buyer: Done");
        }
        //Case #3 Seller Agreed on Pay the Transaction but Buyer Agreed on Cancel the Transaction
        else if(!consensus[buyer] && consensus[seller]){
            //Froze the Money by 30 Days 
            //Check if the the claims is happening for the very first time
            if(!frozenPayment){
                frozenPayment = true;
                frozenDate = now;
                emit MessageGenerator("Frozen Transaction");
            } else {
                if(now >= (frozenDate + FROZEN_DAYS)){
                    //Return the money to the Buyer
                    buyer.transfer(this.balance);
                    emit MessageGenerator("Return to the Buyer: Done");
                }else{
                    emit MessageGenerator("Frozen Transaction");
                }
            }
        }
        //Case #4 Seller Agreed on Cancel the Transaction but Buyer Agreed on Pay the Transaction
        else {
            seller.transfer(this.balance);
            emit MessageGenerator("Transfer to the Seller without his/her consensus");
        }
    }
    
    function getBalance() public view returns (uint) {
        return this.balance;
    }
}