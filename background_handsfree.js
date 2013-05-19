var recording = false;

function setStartIcon() {
  chrome.browserAction.setIcon({path: "start.png"});
}

function setStopIcon() {
  chrome.browserAction.setIcon({path: "stop.png"});
}

chrome.browserAction.onClicked.addListener(function(tab) {
  recording = !recording;
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, {recording: recording});
    return recording ? setStopIcon() : setStartIcon();
  });
});
