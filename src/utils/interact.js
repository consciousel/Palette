import { NFTPortPinJSONToIPFS } from './nftport.js'
import React, { useState } from 'react';

require('dotenv').config();
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3("https://polygon-mainnet.g.alchemy.com/v2/uARWIhArZMQ_weyAQQ6dMzOO6YMeBMco");
const ipfsClient = require("ipfs-http-client");

const contractABI = require('../contract-abi.json');
const contractAddress = "0x825387120171F22D5240c26D877Eb21D0a548E52"; // Smart contract address for the Palette NFT Dapp on Polygon mainnet 

var tokenURI = "";

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <>
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
        </>
      ),
    };
  }
};

export const uploadMetadata = async(name, description, artist, urlOfLastUpload, collection, attributes) => {
  //error handling
  if (urlOfLastUpload === "" || (name.trim() === "" || description.trim() === "")) { 
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
  
  // Make call to NFT Port 
  const nftPortResponse = await NFTPortPinJSONToIPFS(name, description, artist, urlOfLastUpload, collection, attributes); 
  if (!nftPortResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while retrieving your tokenURI.",
    }
  } else {
    return {
      success: nftPortResponse.nftPortUrl,
      status: "✅ Metadata pinned to IPFS successfully. Proceed with mint!"
    }
  }
}

export const mintNFT = async(tokenUrl) => {
  // pin data and get asset url
  tokenURI = tokenUrl.toString();
  tokenURI = tokenURI.replace("ipfs://","https://gateway.pinata.cloud/ipfs/");
  console.log(tokenURI);

  //load the smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);  

  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    'data': window.contract.methods.mint(tokenURI).encodeABI()//make call to NFT smart contract 
  };

  var txnHash = "";

  //sign the transaction via Metamask
  try {
    const txHash = await window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      txnHash = txHash;
    return {
      success: true,
      status: (
        <>
        <div className="success">
          <p>Congrats, your NFT is being minted. It will be available to view and trade on <a target="_blank" rel="noreferrer" href={'https://testnets.opensea.io/accounts/'}>OpenSea</a> shortly.</p>
          <p>✅ Check out your transaction on Polygonscan: https://mumbai.polygonscan.com//tx/{txnHash}</p>
        </div>
        </>
      )
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message
    }
  }
}

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
          // success: false
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
          // success: false
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
        // success: false
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};


