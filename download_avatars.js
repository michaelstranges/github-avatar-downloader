var myPass = require("./secrets.js")

var request = require("request");

function getRepoContributors(repoOwner, repoName, cb){

var options = {
  url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  headers: {
    "User-Agent" : "request",
    "Authorization" : myPass.GITHUB_TOKEN
  }
};

  request(options, function(err, res, body){
    cb(err,body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result){
  console.log("Errors:", err);
  console.log("Results", result);
});

console.log("Welcome to the Github Avatar Downloader!");

