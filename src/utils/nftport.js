var axios = require("axios").default;

const data = {};

export const NFTPortPinJSONToIPFS = (name, description, artist, url, collection, attributes) => {

  /*
  * Create container for attributes and append with additional attributes data from input
  */ 
  
  let _altFields = [
    {
      "trait_type":"Artist",
      "value":artist
    },
    {
      "trait_type":"Collection",
      "value":collection
    },
  ]

  let appendAttributes = [];
  
  if(attributes.length!==0){
    appendAttributes = _altFields.concat(attributes);
  } else {
    appendAttributes = [
      {
      "trait_type":"Artist",
      "value":artist
      },
    ]
  }
  
  /*
   * Define 'options' object that will be passed with our axios request
   */

  var options = {
    method: 'POST',
    url: 'https://api.nftport.xyz/v0/metadata',
    headers: {
      'Content-Type': 'application/json', 
      Authorization: '2d0719e3-a0ba-461f-a382-a5558bd86ac2'
    },
    data: {
      "name": name,
      "description":description,
      "file_url":url,
      "attributes":appendAttributes,
    }
  }
  
  /*
   * Make axios request to post metadata
   */

  return axios
    .request(options).then(function (response) {
      console.log(response.data);
      const url = response.data.metadata_uri;
      console.log(url);
      return {
        success: true,
        nftPortUrl: response.data.metadata_uri,
      };
    }).catch(function (error) {
    console.error(error);
    return {
      success: false,
      message: error.message,
    }
  });

};
