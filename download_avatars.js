var myPass = require("./secrets.js")
var myJson = {};

var request = require("request");
var fs = require("fs");

function getRepoContributors(repoOwner, repoName, cb){

var options = {
  url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  headers: {
    "User-Agent" : "request",
  //added authorization key using the MyPass module from secrets
    "Authorization" : myPass.GITHUB_TOKEN
  }
};

  request(options, function(err, res, body){
    cb(err,body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result){
  //used Json to parse the results into an array of objects
  var myJson = JSON.parse(result);
  //looping through to pick out the avatar_urls and print to screen
  for(i = 0; i < myJson.length; i++){
    console.log(myJson[i].avatar_url)
  }
  //returning my parsed JSON to cb
  return myJson;
});

console.log("Welcome to the Github Avatar Downloader!");

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")

function downloadImageByURL(url, filepath){
  request.get(url)
    .pipe(fs.createWriteStream(filepath));
    }


