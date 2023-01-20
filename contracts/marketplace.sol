// SPDX-License-Identifier:MIT
pragma solidity ^0.8.17;
import "./cinetickettoken.sol";

contract marketPlace {
   
/// @title  CineTicketToken
/// @author Emirhan Cavusoglu
/// @notice It allows to create erc1155 token for film tickets and also erc1155 has id to token system which is extremely appropriate for films
   
    /// @dev it comes from our erc1155 contract. it is our ticket object
    CineTicketToken public cineTickets;

    mapping(uint256 => Ticket) public idToTicket;

    address private marketplaceAddress = address(this);

    /// @dev two dimension array for comparing ticket's amount 
    uint256[][] public tickets = [[0], [0], [0]];

    /// @dev ticket struct that I am using it in addTicket function to create ticket struct objects
    struct Ticket {
        uint256 ID;
        string name;
        uint256 price;
        uint256 totalAmount;
    }

    
    /// @dev this constructor creates our ticket's metadata not actual tickets we are using it for requires which compares ticket price and amount
    constructor(address _ticketAddress) {
        cineTickets = CineTicketToken(_ticketAddress);
        addTicket("Avatar", 0, 10000000000000, 100);
        addTicket("Cizmeli kedi", 1, 10000000000000, 120);
        addTicket("Babil", 2, 10000000000000, 130);
    }
    
    /// @dev function that mints our erc1155 ticket it is payable function 
    function buyTicket(uint256 _id, uint256 _amount)
        public
        payable
        idChecker(_id)
    {
        require(
            _amount < idToTicket[_id].totalAmount,
            "this number is invalid"
        );
        require(
            tickets[_id].length - 1 < idToTicket[_id].totalAmount,
            "There are no tickets anymore "
        );
        require(
            msg.value == _amount * idToTicket[_id].price,
            "not enough money for ticket"
        );

        cineTickets.mint(msg.sender, _id, _amount, "");
        addTicketAmount(_id, _amount);
    }

    
    /// @dev function that adds ticket amounts to my two dimension tickets array for comparing if tickets are sold out
    function addTicketAmount(uint256 _id, uint256 _amount) public {
        for (uint256 i = 0; i < _amount; i++) {
            tickets[_id].push(1);
        }
    }
    
    /// @dev this function creates metada for our tickets and I am using it only constructor 
    function addTicket(
        string memory _name,
        uint256 _id,
        uint256 _price,
        uint256 _totalAmount
    ) private {
        Ticket memory cineTicket;
        cineTicket.ID = _id;
        cineTicket.name = _name;
        cineTicket.price = _price;
        cineTicket.totalAmount = _totalAmount;
        idToTicket[_id] = cineTicket;
    }
    /// @dev modifier that checks if id is different 
    modifier idChecker(uint256 id) {
        require(id < 3, "id is invalid");
        _;
    }
    /// @dev this function only for controlling the tickets array length for.It is testing actually
    function ticketAmount(uint256 id) public view returns (uint256) {
        return idToTicket[id].totalAmount - (tickets[id].length - 1);
    }
}
