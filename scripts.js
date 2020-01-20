// scripts.js
// Remove the current rules 
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // Replace the current rules
     chrome.declarativeContent.onPageChanged.addRules([
     {
       conditions: [
       /*
       Create a new event Object with PageStateMatcher that
       matches page urls that follolw http and https schemes
       */
       new chrome.declarativeContent.PageStateMatcher({
         pageUrl: {
          urlMatches: "www.marriott.com/reservation/rateListMenu.mi",
          schemes: ['http', 'https']
         }
       })
       ], 
       actions: [
        /*
         displays the page action
         */
         new chrome.declarativeContent.ShowPageAction()
       ]
     }])
  })

  // listen for when someone clicks the page action
chrome.pageAction.onClicked.addListener( function () {
    // query the current tab on the current window
     chrome.tabs.query( { active: true, currentWindow: true }, function ( tabs ) {
      // exceute the main.js script on this tab
      chrome.tabs.executeScript(
        tabs[0].id, 
        { file: 'main.js' }
      );
     });
   });