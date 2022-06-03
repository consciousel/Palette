# Welcome to my Dapp, Palette. 

Palette is a simple NFT minting dapp that allows anyone with an Ethereum wallet to mint a custom NFT on the Polygon network. 

On the dapp a user can upload their NFT media/artwork to IPFS, add metadata for their asset and pin it to IPFS, and mint their custom NFT all in a few easy steps. All NFTs are compatible with trading platforms like OpenSea.

### Instructions

This dapp is currently live in production and ready to use at the following address: https://palette-nft-minter.vercel.app/

1. To begin you will want to connect your Metamask wallet with the connect button on the top right corner. If metamask is not installed in your browser you will be prompted to install it as you will need an ethereum address to connect to the blockchain.

2. Once your metamask wallet is connected, the page will expand showing input containers for your NFT file and metadata. At this stage you can select your art file from your device and upload it to IPFS for storage. If this step is successful, the url for your upload wil be displayed. 

3. From here, the next step is to fill out the metadata form for your nft. The "name" and "description" fields are required for each NFT. While the "author" field is optional it is included in this section to allow creators to have their names on their art as anyone can access this dapp. Here you will also see an option to "add attributes" for your NFT. Attributes can be really handy when you want to start a collection. They allow you to differentiate NFTs within a collection by giving them different traits. When you are finished you can hit the "upload metadata" button.

4. If the above step is successful, the status message will confirm the upload and the 'mint' button will be displayed. Go ahead and press mint. This will prompt a metamask popup with the transaction to be signed. Confirm and sign the transaction and wait for it to be cofirmed on the blockchain. And there you go, your NFT has been minted and is now available to view and trade on OpenSea and other platforms of your choice.


### Trouble Shooting

Due to network issues, conjection on the blockchain, internal converstion errors or any other number of issues we are yet to discover, you may have technical issues with step four.

- If there is an issue retreiving the file url you can try to reupload your metadata on step three.
- If signing the transaction and it fails the 'retry mint' button or the 'start fresh mint' button will be displayed if the mint can still be executed with the available data. If not, you can simply reload the page and try the process again. 



