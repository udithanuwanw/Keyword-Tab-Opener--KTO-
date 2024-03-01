chrome.omnibox.onInputEntered.addListener(function(text) {
 
    var keyword = text;
    chrome.storage.local.get('keywords', function(result) {
      var keywords = result.keywords || {};
      var urls = keywords[keyword];
      if (urls && urls.length > 0) {
        for (var i = 0; i < urls.length; i++) {
          chrome.tabs.create({ url: urls[i] });
        }
      }
    });
  
});
