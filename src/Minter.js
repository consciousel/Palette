import { useEffect, useState } from "react";
import { 
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
  uploadMetadata
} from "./utils/interact.js";
import { ImageUpload } from 'react-ipfs-uploader'

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [artist, setArtist] = useState("");
  const [collection, setCollection] = useState("");
  const [customTraitType1, setCustomTraitType1] = useState("");
  const [customTrait1, setCustomTrait1] = useState("");
  const [customTraitType2, setCustomTraitType2] = useState("");
  const [customTrait2, setCustomTrait2] = useState("");
  const [customTraitType3, setCustomTraitType3] = useState("");
  const [customTrait3, setCustomTrait3] = useState("");
  const [customTraitType4, setCustomTraitType4] = useState("");
  const [customTrait4, setCustomTrait4] = useState("");
  const [customTraitType5, setCustomTraitType5] = useState("");
  const [customTrait5, setCustomTrait5] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [extendAttributeStack, setExtendAttributeStack] = useState("false");
  const [showAttributeStack, setShowAttributeStack] = useState("false");
  const [minted, setMinted] = useState("false");
  const [tokenUrl, setTokenUrl] = useState("false");

  useEffect(() => {
    async function fetchAccountData(){
      const {address, status, } = await getCurrentWalletConnected();
      setWallet(address)
      setStatus(status);
    }
    fetchAccountData();
    // setMinted("false");
    addWalletListener();

  },[]);



  const connectWalletPressed = async () => { 
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const showAttributes = () => {
    if(showAttributeStack!=="true") {
      setShowAttributeStack("true")  
    } else {
      setExtendAttributeStack("true")
    }
  };

  const onUploadMetadataPressed = async () => {
    const traitValues = [customTrait1, customTrait2, customTrait3, customTrait4, customTrait5];
    const traits = [customTraitType1, customTraitType2, customTraitType3, customTraitType4, customTraitType5];
    let _attributes = {};
    let attributes =[];
    if (collection==="") {
      setCollection("N/A");
    } else{
      for(let i = 0; i < traits.length; i++) {
        if (traits[i]!=="" && traitValues[i]!=="") {
          _attributes = ({"trait_type":traits[i], "value":traitValues[i]});
          attributes.push(_attributes)
        }
      };
    }        
    console.log(attributes); 
    const urlOfLastUpload = imageUrl;
    console.log(name, description, artist, urlOfLastUpload, collection, attributes);
    const { success, status } = await uploadMetadata( name, description, artist, urlOfLastUpload, collection, attributes);
    setStatus(status);
    setTokenUrl(success);
  };

  const onMintPressed = async () => {
    const { success, status } = await mintNFT(tokenUrl)
    setMinted(success);
    setStatus(status);
  }

  function onShowAttributesStack() {
    if(showAttributeStack==="true") {
      return (
        <>
          <div className="Attributes">
            <div>
              <h4>🖼 Collection Name: </h4>
              <input
                type="text"
                placeholder="Starting an NFT collection?! Insert name here!"
                onChange={(event) => setCollection(event.target.value)}
              />
              <h4>✍️ Trait #1: </h4>
              <input
                type="text"
                placeholder="trait type 1"
                onChange={(event) => setCustomTraitType1(event.target.value)}
              />
              <input
                type="text"
                placeholder="value"
                onChange={(event) => setCustomTrait1(event.target.value)}
              /> 
              <h4>✍️ Trait #2: </h4>
              <input
                type="text"
                placeholder="trait type 2"
                onChange={(event) => setCustomTraitType2(event.target.value)}
              />
              <input
                type="text"
                placeholder="value"
                onChange={(event) => setCustomTrait2(event.target.value)}
              />
              <div>
                { onMoreTraitsPressed() }
              </div>     
            </div>
          </div>
        </>
      );      
    }
  }

  function addAttributesButton() {
    if(showAttributeStack==="false" && extendAttributeStack==="false"){
      return(
        <>
          <div>  
            <button id="attributesButton" onClick={showAttributes}>
              Add Attributes
            </button>
            <div>
              <ul>
                  <li>Add attributes to start a collection.</li>
              </ul>
            </div>
          </div>
        </>
      )
    } else if(showAttributeStack==="true" && extendAttributeStack==="false"){
      return(
        <>
          <div>
            <button id="attributesButton" onClick={showAttributes}>
              Add More Traits
            </button>
            <div>
              <ul>
                  <li>Up to 5 different traits can be added for each NFT.</li>
              </ul>
            </div>
          </div>
        </>
      )
      
    }
  } 

  function reloadPage() {
    window.location.reload(false);            
  }

  function showMintButton() {
    console.log(walletAddress);
    console.log(minted);
    if(walletAddress === "") {
      return
    }

    if(tokenUrl==="false") {
      return (
        <div>
          <button id="mintButton" onClick={onUploadMetadataPressed}>
            Upload Metadata
          </button>
        </div>
      )
    } else if((tokenUrl !== "false" && minted === "false")) {
      if(status.toString().includes("Something went wrong:")){
        return (
          <div>
            <button id="mintButton" onClick={onMintPressed}>
              Retry Mint
            </button>
          </div>
        )
      } else {
        return (
          <div>
            <button id="mintButton" onClick={onMintPressed}>
              Mint NFT
            </button>
          </div>
        )
      }      
    }

    if(minted === true ){
      if(walletAddress === ""){        
        return 
      } else {
        return (
          <div>
            <button id="mintButton" onClick={reloadPage}>
              Start Fresh Mint
            </button>
          </div>
        )
      }       
    }
  } 

  function onMoreTraitsPressed() {
    if(extendAttributeStack==="true") {
      return (
        <>
          <div>
            <div className="Attributes2">
              <div>
                <h4>✍️ Trait #3: </h4>
                <input
                  type="text"
                  placeholder="trait type 3"
                  onChange={(event) => setCustomTraitType3(event.target.value)}
                />
                <input
                  type="text"
                  placeholder="value"
                  onChange={(event) => setCustomTrait3(event.target.value)}
                /> 
                <h4>✍️ Trait #4: </h4>
                <input
                  type="text"
                  placeholder="trait type 4"
                  onChange={(event) => setCustomTraitType4(event.target.value)}
                />
                <input
                  type="text"
                  placeholder="value"
                  onChange={(event) => setCustomTrait4(event.target.value)}
                />
                <h4>✍️ Trait #5: </h4>
                <input
                  type="text"
                  placeholder="trait type 5"
                  onChange={(event) => setCustomTraitType5(event.target.value)}
                />
                <input
                  type="text"
                  placeholder="value"
                  onChange={(event) => setCustomTrait5(event.target.value)}
                />       
              </div>
            </div>
          </div>
        </>
      );      
    } 
  }
    
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Fill in the details of your NFT in the text-fields above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your browser.
          </a>
        </p>
      );
    }
  }

  function showContent() {
    console.log(walletAddress.length)
    if(walletAddress.length > 0) {
      return (
        <>
        <div>
          <div>
            <h5> NFT ASSET UPLOAD </h5>
            <ImageUpload setUrl={setImageUrl} />
            <b>AssetUrl</b> : 
              <a
                href={imageUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                { imageUrl } 
                { uploadMetadata }
              </a>
          </div>
        <br></br>
          <form>
            <h2>🤔 Name: </h2>
            <input
              type="text"
              placeholder="e.g. My first NFT!"
              onChange={(event) => setName(event.target.value)}
            />
            <h2>✍️ Description: </h2>
            <input
              type="text"
              placeholder="e.g. Even cooler than cryptokitties ;)"
              onChange={(event) => setDescription(event.target.value)}
            />
            <h2>👨‍🎨 Artist: </h2>
            <input
              margin-bottom="20px"
              type="text"
              placeholder="e.g. Arty the Sage;)"
              onChange={(event) => setArtist(event.target.value)}
            />     
          </form>
        <br></br>
          { onShowAttributesStack() }
          { addAttributesButton() }
          { showMintButton() }
        </div>
        </>
      )
    } else {
      return
    }
  }

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title">🎨 Palette NFT Minter</h1>
      <h5>
        Mint your custom NFT in three easy steps: 
      </h5>
      <div>
        <ol>        
          <li>Select and upload your art work.</li> 
          <li>Fill in the details for your NFT metadata.</li>             
          <li>Press Mint.</li>
        </ol>
      </div>
        { showContent() }
      <div id="status">
       {status}
      </div>
    </div>
  );
};

export default Minter; 
