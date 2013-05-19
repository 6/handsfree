var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = 'en'; // TODO - add option to select this

var enableHandsFree = function() {
  console.log("Enabling handsfree");
  recognition.start();
};

var disableHandsFree = function() {
  recognition.stop();
};

var scrollPageY = function(direction) {
  var scrollDelta = innerHeight - 50;
  if(direction == "up") scrollDelta *= -1;
  $("html, body").animate({scrollTop: pageYOffset + scrollDelta, duration: 100});
};

recognition.onresult = function(event) {
  var words = event.results[event.results.length - 1][0].transcript.trim().split(/\s+/);
  var lastWord = words[words.length - 1];

  if(lastWord == "up" || lastWord == "down") scrollPageY(lastWord);
  if(lastWord == "top") scroll(pageXOffset, 0);
  if(lastWord == "bottom") scroll(pageXOffset, $(document).height());
};

chrome.runtime.onMessage.addListener(function(request, sender) {
  if(request.recording) {
    enableHandsFree();
  }
  else {
    disableHandsFree();
  }
});
