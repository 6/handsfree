var recording = {};

function setStartIcon() {
  chrome.browserAction.setIcon({path: "start.png"});
}

function setStopIcon() {
  chrome.browserAction.setIcon({path: "stop.png"});
}

chrome.browserAction.onClicked.addListener(function(tab) {
  if(typeof recording[tab.id] == "undefined") {
    recording[tab.id] = true;
  }
  else {
    recording[tab.id] = !recording[tab.id];
  }
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, {recording: recording[tab.id]});
    return recording[tab.id] ? setStopIcon() : setStartIcon();
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, info) {
  if(info.status == "complete") {
    chrome.tabs.sendMessage(tabId, {recording: recording[tabId]});
  }
});
