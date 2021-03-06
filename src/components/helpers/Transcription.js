export function copied() {
  let el = document.getElementById("btnCopy");
  el.innerText = "Copied";
  setTimeout(function() {
    el.innerText = "Copy";
  }, 3000);
}

export function clearSlate() {
  if (working) {
    speech.stop();
  }
  document.getElementById("labnol").innerHTML = "";
  document.getElementById("notfinal").innerHTML = "";
  final_transcript = "";
  reset();
}

export function reset() {
  working = false;
  document.getElementById("status").style.display = "none";
  document.getElementById("btn").innerHTML = "Start Dictation";
}

export function action() {
  if (working) {
    speech.stop();
    reset();
  } else {
    working = true;
    document.getElementById("status").style.display = "block";
    document.getElementById("warning").style.display = "none";
    document.getElementById("btn").innerHTML = "Stop Listening";
    speech.start();
  }
}

export function toggleVisibility(selectedTab) {
  let content = document.getElementsByClassName('info');
  for (let i = 0; i < content.length; i++) {
    if (content[i].id == selectedTab) {
      content[i].style.display = 'block';
    } else {
      content[i].style.display = 'none';
    }
  }
}

// export function save() {
//
//   action();
//   let fileType = "text/plain;charset=utf-8";
//   let fileName = ".txt";
//   let elem = document.getElementById("labnol");
//   let d = elem.innerHTML.replace(/<br>/g, "\n");
//   let text = elem.innerText.trim().replace(/\s+/g, " ").substr(0, 20);
//   if (text === "")
//     text = "dictation";
//
//   if (d.indexOf("<") !== -1) {
//     d = d.replace(/\n/g, "<br>");
//     fileName = ".html";
//     fileType = "application/xhtml+xml;charset=utf-8";
//   } else {
//     d = d.replace(/&nbsp;/g, " ");
//   }
//
//   fileName = text + fileName;
//
//   let blob = new Blob([d], {type: fileType});
//   saveAs(blob, fileName);
//   return;
// }

export function updateLang(sel) {
  let value = sel.options[sel.selectedIndex].value;
  speech.lang = value;
  localStorage['language'] = value;
}

export function format(s) {
  return s.replace(/\n/g, '<br>');
}

export function capitalize(s) {
  return s.replace(/\S/, function(m) {
    return m.toUpperCase();
  });
}

export function initialize() {
  speech = new webkitSpeechRecognition();
  speech.continuous = true;
  speech.maxAlternatives = 5;
  speech.interimResults = true;
  speech.lang = localStorage['language'];
  speech.onend = reset;
}

let clear,
  working,
  speech,
  final_transcript = "";

if (!('webkitSpeechRecognition' in window)) {

  document.getElementById("labnol").innerHTML = "Dictation.io requires <a href='https://www.google.com/chrome/browser/' target='_blank'>Google Chrome</a>. You can however still use this app as a notepad. Just click anywhere, start writing and it will auto-save the text.<br><br>For support, tweet <a href='http://twitter.com/labnol' target='_blank'>@labnol</a> or email the <a href='https://ctrlq.org/' target='_blank'>developer</a> at amit@labnol.org";
  document.getElementById("messages").style.display = "none";
  document.getElementById("platformslang").style.display = "none";

} else {

  localStorage['language'] = localStorage['language'] || "en-US";
  localStorage['transcript'] = localStorage['transcript'] || "";
  document.getElementById("labnol").innerHTML = localStorage['transcript'];
  final_transcript = localStorage['transcript'];

  if (localStorage['transcript'] === "") {
    document.getElementById("warning").innerHTML = "Please select your native language from the dropdown menu below, then click the \"Start Dictation\" button and begin speaking.<br><br>For support, tweet <a href='http://twitter.com/labnol' target='_blank'>@labnol</a> or email the <a href='https://ctrlq.org/' target='_blank'>developer</a> at amit@labnol.org";
  }

  setInterval(function() {
    let text = document.getElementById("labnol").innerHTML;
    if (text !== localStorage['transcript']) {
      localStorage['transcript'] = text;
    }
  }, 5000);

  document.getElementById("lang").value = localStorage['language'];

  initialize();
  reset();

  speech.onerror = function(e) {
    let msg = e.error + " error";
    if (e.error === 'no-speech') {
      msg = "No speech was detected. Please turn on the microphone and try again.";
    } else if (e.error === 'audio-capture') {
      msg = "Please ensure that your microphone is connected to the computer and turned on.";
    } else if (e.error === 'not-allowed') {
      msg = "Dication.io cannot access your microphone. Please go to chrome://settings/contentExceptions#media-stream and allow Microphone access to this website.";
    }
    document.getElementById("warning").innerHTML = "<p>" + msg + "</p>";
    setTimeout(function() {
      document.getElementById("warning").innerHTML = "";
    }, 5000);
  };

  speech.onresult = function(e) {
    let interim_transcript = '';
    if (typeof(e.results) == 'undefined') {
      reset();
      return;
    }
    for (let i = e.resultIndex; i < e.results.length; ++i) {
      let val = e.results[i][0].transcript;
      if (e.results[i].isFinal) {
        final_transcript += " " + val;
      } else {
        interim_transcript += " " + val;
      }
    }
    document.getElementById("labnol").innerHTML = format(capitalize(final_transcript));
    document.getElementById("notfinal").innerHTML = format(interim_transcript);
  };
}
