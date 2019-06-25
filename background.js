function passTorch() {
  // select active tab for message
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // send first message to content script, to check whether it's on a product page
    chrome.tabs.sendMessage(tabs[0].id, {message: "check it"}, function(response) {
      // if user is on a product page, grant permission to generate keywords
      if (response.message === "verified") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {message: "generate"}, function(response) {
            // display final status of program to user
            alert(response.message);
          });
        });
        // if they're not a product page, let them know they need to be
      } else if (response.message === "notverified") {
        alert("You need to be on a product page.");
        return;
      }
    });
  });
}
// create context menu button
chrome.contextMenus.create({
    "title": "Generate Keywords",
    "contexts": ["page"],
    "documentUrlPatterns": ["https://www.basicinvite.com/index.php*"],
    "onclick": passTorch
});
