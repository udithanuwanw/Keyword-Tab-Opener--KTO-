function saveKeywordURL(keyword, url) {
  chrome.storage.local.get('keywords', function(result) {
    var keywords = result.keywords || {};
    if (!keywords[keyword]) {
      keywords[keyword] = [];
    }

    // Split the URL input by comma to extract multiple URLs
    var urls = url.split(',');

    // Trim each URL and add it to the keyword's URLs array
    for (var i = 0; i < urls.length; i++) {
      var trimmedURL = urls[i].trim();
      if (trimmedURL !== '') {
        keywords[keyword].push(trimmedURL);
      }
    }

    chrome.storage.local.set({ 'keywords': keywords }, function() {
      console.log('Keyword-URL association saved.');
      displayKeywords();
    });
  });
}

function deleteKeyword(keyword) {
  chrome.storage.local.get('keywords', function(result) {
    var keywords = result.keywords || {};
    delete keywords[keyword];
    chrome.storage.local.set({ 'keywords': keywords }, function() {
      console.log('Keyword-URL association deleted.');
      displayKeywords();
    });
  });
}

function displayKeywords() {
  chrome.storage.local.get('keywords', function(result) {
    var keywords = result.keywords || {};
    var keywordsList = document.getElementById('keywords-list');
    keywordsList.innerHTML = '';

    for (var keyword in keywords) {
      var listItem = document.createElement('li');
      var deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.classList.add('delete-button'); 
      deleteButton.dataset.keyword = keyword;
      listItem.innerText = keyword + ' - ' + keywords[keyword].join(', ');
      listItem.appendChild(deleteButton);
      keywordsList.appendChild(listItem);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  displayKeywords();

  var saveButton = document.getElementById('save-button');
  saveButton.addEventListener('click', function() {
    var keyword = document.getElementById('keyword-input').value;
    var url = document.getElementById('url-input').value;
    saveKeywordURL(keyword, url);
  });

  var keywordsList = document.getElementById('keywords-list');
  keywordsList.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
      var keyword = event.target.dataset.keyword;
      deleteKeyword(keyword);
    }
  });
});
