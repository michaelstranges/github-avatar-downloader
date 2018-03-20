module.exports = {
  urlCheck : function(urlInput){
    if(urlInput.length > 2){
      console.log("Too many entries, but I will still work. All good.")
      }
    else {
      for(var i = 0; i < 2; i++){ // only expect 2 inputs
        if(urlInput[i] === undefined){
          throw new Error("Invalid Repo Owner");
        }
        if(urlInput[i] === undefined){
          throw new Error("Invalid Repo Name");
        }
      }
    }
  }
}