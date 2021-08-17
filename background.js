var blockLoader = false;
var pubName = "amongusonline";
var blockUrlString = "*://cdn.taboola.com/libtrc/"+pubName+"/loader*";
var blockedDomains = [blockUrlString];
var cssStylings = {};

// console.log("blockUrlString at start: ", blockUrlString);
var methods = {};
methods.updatePublisherName = function (p) {
	pubName = p.publisherName;
	blockUrlString = "*://cdn.taboola.com/libtrc/"+pubName+"/loader*";
	blockedDomains = [blockUrlString];
    
    // console.log("blockUrlString after variable udpate start: ", blockUrlString);
    // console.log("Param recieved in callback udpate start: ", p.publisherName);
    // console.log("Pubname after variable udpate start: ", pubName);
    chrome.webRequest.onBeforeRequest.addListener(
	  function(details) { 
	  	return {cancel: blockLoader}; },
	  {urls: blockedDomains},
	  ["blocking"]
	);
    return {
        "error": false,
        message: "Updated pub name"
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    //console.log("Request is " + request.method);
    // console.log("blockUrlString when recieving message: ", blockUrlString);
    if (request.method == "updateBlockerList") {
        var params = request.params;
        //console.log(methods.checkSelector(request.params));
        sendResponse(methods.updatePublisherName(request.params));
        return (true);
    }
    return "Anonymus message recieved";
})

// console.log("blockUrlString before executing webRequest: ", blockUrlString);
// console.log("blockLoader before executing webRequest: ", blockLoader);
chrome.webRequest.onBeforeRequest.addListener(
  function(details) { 
  	return {cancel: blockLoader}; },
  {urls: blockedDomains},
  ["blocking"]
);