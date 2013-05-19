var recognition = new webkitSpeechRecognition();
var links = {};
var fixedNumber = {
  "for": 4,
  "ate": 8
};
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = 'en'; // TODO - add option to select this

var enableHandsFree = function() {
  console.log("Enabling handsfree");
  initializeLinks();
  recognition.start();
};

var disableHandsFree = function() {
  removeLinks();
  recognition.stop();
};

var scrollPageY = function(direction) {
  var scrollDelta = innerHeight - 50;
  if(direction == "up") scrollDelta *= -1;
  $("html, body").animate({scrollTop: pageYOffset + scrollDelta, duration: 100});
};

var goToLink = function(linkNumber) {
  if(links[linkNumber]) window.location.href = links[linkNumber].attr("href");
};

recognition.onresult = function(event) {
  var words = event.results[event.results.length - 1][0].transcript.trim().split(/\s+/);
  var lastWord = words[words.length - 1];
  if(fixedNumber[lastWord]) lastWord = fixedNumber[lastWord];

  if(lastWord == "up" || lastWord == "down") scrollPageY(lastWord);
  if(lastWord == "top") scroll(pageXOffset, 0);
  if(lastWord == "bottom") scroll(pageXOffset, $(document).height());
  if(lastWord.match(/^[0-9]+$/)) goToLink(parseInt(lastWord, 10));
};

chrome.runtime.onMessage.addListener(function(request, sender) {
  if(request.recording) {
    enableHandsFree();
  }
  else {
    disableHandsFree();
  }
});

var initializeLinks = function() {
  var linkNumber = 1;
  $("a:visible[href]").each(function(i, el) {
    var $el = $(el);
    var offset = $el.offset();
    if(offset.top <= 0 && offset.left <= 0) return true;

    links[linkNumber] = $el;

    var offsetTop = Math.max(0, offset.top - 8);
    var offsetLeft = Math.max(0, offset.left - 14);
    var html = $("<span class='handsfree-link-title'>"+ linkNumber + "</span>").css("top", offsetTop).css("left", offsetLeft);
    html.appendTo("body");
    linkNumber += 1;
  });
};

var removeLinks = function() {
  $(".handsfree-link-title").remove();
};
