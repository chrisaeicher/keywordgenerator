// listen for commands from background script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // handle a contextMenu click and first check to see if user is on a product page
    if (request.message === "check it") {
      if (getPageInfo()) {
        sendResponse({message: "verified"});
        return;
      } else {
        sendResponse({message: "notverified"});
        return;
      }
    }
    // if the user is on a product page, get the go ahead to gather information and generate keywords
    if (request.message === "generate") {
      if (generateKeywords()) {
        sendResponse({message: "All done!"});
        return;
      }
      sendResponse({message: "Something went wrong."})
    }
  }
)

function getPageInfo() {
  // return either an object of page values or false
  var name = document.getElementById('name');
  var searchCategory = document.getElementById('search_category');
  var metaTitle = document.getElementById('meta_title');
  var metaKeywordField = document.getElementById('meta_keyword');
  if (name && searchCategory && metaTitle && metaKeywordField) {
    return {name: name.value, searchCategory: searchCategory.options[searchCategory.selectedIndex].text, metaTitle: metaTitle, metaKeywordField: metaKeywordField};
  }
  return false;
}

function generateKeywords() {
  // gather keywords from user
  while (true) {
    var keywords = prompt("Enter your keywords in 'keyword, keyword, keyword' format:");
    // handle cancels
    if (keywords === null) {
      return false;
    }
    // handle no entry
    if (keywords === "") {
      alert("You didn't give me any keywords.");
      continue;
    }
    break;
  }

  // turn keyword string into an array for manipulation
  var keywordArray = keywords.split(',');
  // gather the page info for use
  var pageInfo = getPageInfo();
  // use the page information and given keywords to create a string of keywords
  var keywordString = finalizeString(pageInfo, keywordArray);
  if (keywordString) {
    pageInfo.metaTitle.value = pageInfo.name + " by Basic Invite";
    pageInfo.metaKeywordField.value = keywordString;
    return true;
  }
  // set the meta title field and meta keywords field to the proper values, then return as completed
  return false;
}

function finalizeString(object, keywordArray) {
  // gather Product Name, Product Search Category, and Product Meta Title
  var name = object.name;
  var searchCategory = object.searchCategory.toLowerCase();
  // change the meta title to always be "[Product Name] by Basic Invite"
  // add product name and search category to string
  var keywordString = name + ", " + searchCategory + ", ";
  for (i = 0; i < keywordArray.length; i++) {
    // trim whitespace from every keyword and add 'keyword+search category' to string
    keywordArray[i] =  keywordArray[i].trim();
    if (keywordArray[i] === "") {
      keywordArray.splice(i, 1);
      if (keywordArray.length === 0) {
        return false;
      }
      i -= 1;
      continue;
    }
    keywordString += keywordArray[i] + " " + searchCategory + ", ";
  }
  for (i = 0; i < keywordArray.length; i++) {
    // finish by adding each keyword to the string
    keywordString += keywordArray[i] + ", ";
  }
  return keywordString;
}
