# keywordgenerator
This Chrome extension was designed specifically to work within the backend product pages of my employer's Magento site. 
Given a list of desired, comma-delineated keywords, this extension collects additional data from the product page in order to generate a full list of SEO-oriented keywords.

To demo the extension: 
1) Download the provided files.
2) Navigate to chrome://extensions in your Chrome browser.
3) Click "Load Unpacked" in the top left of the page, then navigate to and select the folder that houses all files, OR drag and drop the folder onto the page.
4) Load the "sample.html" page into the browser
5) Right click on the background of the page to see and select "Generate Keywords" as a context menu option.

Upon entering your desired keywords, the extension will read A) the name, B) internal search category, and C) meta title of the product.
It will then use that information to do two things:

1) Verify that the meta title is consistent with internal standards ("Name by Basic Invite")
2) Iterate over your inputted keywords
