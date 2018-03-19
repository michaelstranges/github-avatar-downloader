var myPass = require("./secrets.js")
var myJson = {};
var requestURL = process.argv.slice(2)
var request = require("request");
var fs = require("fs");

if(requestURL[0] === undefined){ //throws error if owner empty
  throw new Error("Invalid repository owner");
}

if(requestURL[1] === undefined){ //throws error if name empty
  throw new Error("Invalid repository name");
}

function getRepoContributors(repoOwner, repoName, cb){
  var options = {
    url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent" : "request",
      "Authorization" : myPass.GITHUB_TOKEN //added authorization key using the MyPass module from secrets
  }
};
  request(options, function(err, res, body){ //request uses options info to achieve connection to server
    cb(err,body);
  });
}

getRepoContributors(requestURL[0], requestURL[1], function(err, result){ //used Json to parse the results into an array of objects
  var myJson = JSON.parse(result);
    for(i = 0; i < myJson.length; i++){    //looping through to pick out the avatar_urls
      downloadImageByURL(myJson[i].avatar_url, "avatars/" + myJson[i].login + ".jpg") //function picks out urls and save filepath
    }
  return myJson; //returning my parsed JSON to cb
});

console.log("Welcome to the Github Avatar Downloader!");

function downloadImageByURL(url, filepath){ //function requests url
  request.get(url)
    .pipe(fs.createWriteStream(filepath)); //gets jpg from url and saves to filepath
  }
