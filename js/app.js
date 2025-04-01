// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
window.addEventListener('DOMContentLoaded', function () {

  // We'll ask the browser to use strict code to help us catch errors earlier.
  // https://developer.mozilla.org/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
  'use strict';

  var APIURL = "https://teletekst-data.nos.nl/json?p=";

  var notFoundHtml = `<pre id="content" tabindex="10">                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
  Pagina niet gevonden...
  Ga terug naar de <a class="cyan" href="/?p=100">startpagina</a>
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
</pre>
`;

  var enteredPage = 0;
  var nextPage;
  var prevPage;
  var fastTextLinks;
  var ftlIdx = 0;


  document.onkeydown = function (ev) {
    var keyCode = ev.keyCode || ev.which;
    // console.log(fastTextLinks[ftlIdx].page);
    // var key = {
    //   left: 37,
    //   up: 38,
    //   right: 39,
    //   down: 40,
    //   pageDown: 34,
    //   pageUp: 33
    // };
    const num = (keyCode - 48);
    if (num >= 0 && num <= 9) {
      enteredPage = enteredPage * 10 + num;
      if (enteredPage > 99) {
        fetchPage("" + enteredPage);
        enteredPage = 0;
      }
      return;
    }
    switch (ev.key) {
      case 'SoftLeft':
        fetchPage(prevPage);
        break;
      case 'SoftLeft':
        fetchPage(prevPage);
        break;

      case 'SoftRight':
        fetchPage(nextPage);
      break;

      case 'Enter':
          // Action case press center key
          if ( enteredPage > 99 ) {
            fetchPage("" + enteredPage);
            enteredPage = 0;
          }
          break;
      case '#':
        enteredPage = fastTextLinks[ftlIdx].page;
        ftlIdx = ++ftlIdx % fastTextLinks.length;
        return;
      }

    enteredPage = 0;
    return;
  }


  var request = null;

  function fetchPage(page) {

    var url = APIURL + page;

    // If you don't set the mozSystem option, you'll get CORS errors (Cross Origin Resource Sharing)
    // You can read more about CORS here: https://developer.mozilla.org/docs/HTTP/Access_control_CORS
    request = new XMLHttpRequest({ mozSystem: true });

    request.open('get', url, true);
    request.responseType = 'json';
    request.addEventListener('error', onRequestError);
    request.addEventListener('load', onRequestLoad);

    request.send();

  }


  function onRequestError() {
    enteredPage = 100;
    document.getElementById("content").innerHTML = notFoundHtml;
  }


  function onRequestLoad() {
    if (request.status == 404) {
      onRequestError();
      return;
    }
    const resp = request.response;
    nextPage = resp.nextSubPage || resp.nextPage;
    prevPage = resp.prevSubPage || resp.prevPage;
    fastTextLinks = resp.fastTextLinks
    ftlIdx = 0;

    var tto = request.response.content;
    tto = tto.replace(/href=\"#/g, "href=\"/?p=");

    document.getElementById("content").innerHTML = tto;
  }

  var url = new URL(window.location.href);
  fetchPage(url.searchParams.get("p") || "100");

  // Enter full-screen mode
  document.documentElement.requestFullscreen();

});
