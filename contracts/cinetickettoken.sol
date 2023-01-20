// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts@4.8.0/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts@4.8.0/access/Ownable.sol";

contract CineTicketToken is ERC1155, Ownable {
    string public name;
    string public symbol;
    
    constructor() ERC1155("") {
       name = "CineTicket";
       symbol = "CTT";
      
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        
        onlyOwner
    {
        
        _mint(account, id, amount, data);
    }

   
}