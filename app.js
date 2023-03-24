const needle = require("needle");
require('dotenv').config();
const fs = require('fs');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8100;
app.set('view engine', 'ejs');
const token = process.env.BEARER_TOKEN;
const id = "853861815465512961";

const endpointURL = `https://api.twitter.com/2/users/${id}/liked_tweets`;

async function getRequest() {
  // These are the parameters for the API request
  // by default, only the Tweet ID and text are returned
  const params = {
    "tweet.fields": "lang,author_id", // Edit optional query parameters here
    "user.fields": "created_at", // Edit optional query parameters here
  };

  // this is the HTTP header that adds bearer token authentication
  const res = await needle("get", endpointURL, params, {
    headers: {
      "User-Agent": "v2LikedTweetsJS",
      authorization: `Bearer ${token}`
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
}

app.get('/',(req, res)=>{
    let response,data;
    (async () => {
        try {
          // Make request
          response = await getRequest();
          // data =  JSON.stringify(response);
          // fs.writeFileSync('test.json', data);
         
          res.render('index',{response});
          
        } catch (e) {
          console.log(e);
        }
      })();
}); 

app.listen(PORT, ()=>{
    console.log(`Listening at port ${PORT}`);
});

