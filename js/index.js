// Helper functions

function getEventTarget(e) {
  e = e || window.event;
  return e.target || e.srcElement; 
}

function escapeHtml(unsafe) {
  return unsafe
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");
 }


// Elements

var d = document;
    $lips = d.getElementById("lips"),
    $save = d.getElementById("save"),
    $tods = d.getElementById("tods");

// Here goes the Tod!

var Tod = {};

Tod.defaults = {
  limit: 140
};

Tod.addItem = function(value) {
  if(value !== "") {
    if($tods.children.length > 0) {
      $tods.children[0].insertAdjacentHTML("beforebegin","<li>"+value+"</li>");
    } else {
      $tods.innerHTML = "<li>"+value+"</li>";
    }
    return true;
  } else {
    return false;
  }
}

Tod.say = function(what, display) {
  var audioElement = '<audio src="http://tts-api.com/tts.mp3?q='+what+'" preload="auto" autoplay></audio>';
  $lips.className = "talk";
  setTimeout(function() {
    $lips.className = "";
  }, what.length * 100);
  if (typeof display === "undefined") {
    $tods.children[0].insertAdjacentHTML("beforeend",audioElement);
  } else {
    $lips.insertAdjacentHTML("beforeend",audioElement);
  }
   
}

$save.onclick = function() {
  Tod.addItem($lips.value);
};

$lips.onkeydown = function(e) {
  var value = escapeHtml($lips.value),
      limit = Tod.defaults.limit;
  
  if(value.length >= limit) {
    Tod.say("Staaahp!", true);
    $lips.value = value.substr(0, limit);
  } else {
    if(e.which === 13) {
      Tod.addItem(value);
      Tod.say(value);
      $lips.value = "";
    }
  }
};

$tods.onclick = function(event) {
  var target = getEventTarget(event);
  if(target.children.length > 0) {
    target.children[0].play(0);
  }
};