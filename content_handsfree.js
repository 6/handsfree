var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = 'en'; // TODO - add option to select this

var enableHandsFree = function() {
  console.log("Enabling handsfree");
  recognition.start();
};

var disableHandsFree = function() {
  console.log("Disabling handsfree");
  recognition.stop();
};

chrome.runtime.onMessage.addListener(function(request, sender) {
  if(request.recording) {
    enableHandsFree();
  }
  else {
    disableHandsFree();
  }
});
