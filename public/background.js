console.log('background.js');



// on chrome extension install
chrome.runtime.onInstalled.addListener(function() {
  console.log('Installed');
  // create a new tab
  // chrome.tabs.create({ url: 'https://www.google.com' });

  // chrome.windows.create({
  //     url: chrome.runtime.getURL('index.html'),
  //     type: 'popup',
  //     width: 500,
  //     height: 750
  // });
});

// chrome.scripting.executeScript({
//   target: {tabId: id, allFrames: true},
//   files: ['content.js'],
// });

// on chrome extension click
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: 'index.html' });
  // on tabs loaded
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.active) {
      // send message to content script
      console.log('tabId', tabId);
    }
  });
});