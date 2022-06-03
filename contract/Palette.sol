//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.4; 

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';

/*
 * @title IERC2981Royalties
 * @dev Interface for the ERC2981 - Token Royalty standard
 */
interface IERC2981Royalties {

    /* 
     * Notice called with the sale price to determine how much royalty
     * is owed and to whom.
     * @param _tokenId - the NFT asset queried for royalty information
     * @param _value - the sale price of the NFT asset specified by _tokenId
     * @return _receiver - address of who should be sent the royalty payment
     * @return _royaltyAmount - the royalty payment amount for value sale price
     */

    function royaltyInfo(uint256 _tokenId, uint256 _value)
        external
        view
        returns (address _receiver, uint256 _royaltyAmount);
}

/*
 * @dev This contract is used to add ERC2981 support to the ERC721 standard
 * @dev This implementation has the same royalties for each token minted from this contract
 */

abstract contract Royalties is ERC165, IERC2981Royalties {

    struct RoyaltyInfo {
        address recipient;
        uint24 amount;
    }

    RoyaltyInfo private _royalties;
    uint256 maxRoyalties = 500; //@dev limiting royalties to 5%

    /// @inheritdoc	ERC165
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            interfaceId == type(IERC2981Royalties).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /* 
     * @dev Sets token royalties
     * @param recipient - recipient of the royalties
     * @param value - royalties amount percentage (using 2 decimals - 10000 = 100%, 0 = 0%)
     */

    function _setRoyalties(address recipient, uint256 value) internal {    	
        require(value <= maxRoyalties, 'ERC2981Royalties: Too high'); 
        _royalties = RoyaltyInfo(recipient, uint24(value));
    }

    // @inheritdoc	IERC2981Royalties
    function royaltyInfo(uint256, uint256 value)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        RoyaltyInfo memory royalties = _royalties;
        receiver = royalties.recipient;
        royaltyAmount = (value * royalties.amount) / 10000;
    }
}

contract Ownable {
   address private _owner;

   constructor() {
        _owner = msg.sender;
   } 

   modifier onlyOwner() {
        require(isOwner());
        _;
   }

   function owner() public view returns (address) {
        return _owner;
   }

   function isOwner() public view returns (bool) {
        return msg.sender  == _owner;
   }
}

contract Palette is
    ERC721,
    Royalties,
    Ownable
{
    uint256 public tokenCounter;
	mapping (uint256 => string) private _tokenURIs;
    mapping (uint256 => address) private _tokenCreators; 

	///Inherit ERC721 from openzeppelin contracts 
    constructor(
	    string memory name_, 
	    string memory symbol_
    ) ERC721(name_, symbol_) {
    	tokenCounter = 0;
    }

    /// @inheritdoc	ERC165
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(Royalties, ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function setRoyalties(address recipient, uint256 value) external onlyOwner {
        _setRoyalties(recipient, value);
    }

    // @dev define mint function that can be called by any user
    function mint(string memory _tokenURI) public {
	    _safeMint(msg.sender, tokenCounter);
	    _setTokenURI(tokenCounter, _tokenURI, msg.sender);

	    tokenCounter++;
	}

	// @dev define a function that sets the tokenURI and creator address
	function _setTokenURI(uint256 _tokenId, string memory _tokenURI, address _creator) internal virtual {
	    require(
	        _exists(_tokenId),
	        "ERC721Metadata: URI set of nonexistent token"
	    );  // Checks if the tokenId exists
	    _tokenURIs[_tokenId] = _tokenURI;
        _tokenCreators[_tokenId] = _creator;
	}

	/* 
     * @dev define a funtion that checks whether the tokenId was actaully minted, 
     * and returns the respective tokenURI
     */
	function tokenURI(uint256 _tokenId) public view virtual override returns(string memory) {
	    require(
	        _exists(_tokenId),
	        "ERC721Metadata: Token id does not exist"
	    );
	    return _tokenURIs[_tokenId];
	}

    /*
     * @dev define a funtion that checks whether the tokenId was actaully minted, 
     * and returns the respective address of the token creator
     */
    function tokenCreator(uint256 _tokenId) public view virtual returns(address) {
        require(
            _exists(_tokenId),
            "ERC721Metadata: Token id does not exist"
        );
        return _tokenCreators[_tokenId];
    }

    // @dev define a function that returns the total number of NFTs minted
    function tokenCount() public view virtual returns(uint256) {
        return tokenCounter;
    }
}
