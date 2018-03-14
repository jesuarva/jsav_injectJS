/*
 * "jsav_injectJS" by jesuarva: Jean Surkouf Ariza Varela.
 * A Library that allows asynchronously load JS libraries. Then injects each resource in the DOM by precedency.
 * Last update on Wed Mar 14 2018 13:29:45
 * Licenses under MIT License
 */

window.jsav_ijs = (function(){
  /**
  * Injector, this function injects a JS library in the DOM.
  * @param {String} response The 'fetched' library's body.
  */
  function injectJS (scriptBody) {
    // Create new <scritp> that'll be injected in DOM
    var newScript = document.createElement('script');
    // Add body to new <script>
    // newScript.appendChild(document.createTextNode(scriptBody.txt));
    newScript.insertAdjacentHTML('beforeend', scriptBody);

    // Inject new <script> to DOM
    document.head.appendChild(newScript);
  }

  /***
  * fetchLibrary, this function fetch a single resource and get it body vía the text() method.
  * @param {String} library Relative path to a local library or URL to an external resource.
  * @returns {Promise} A promise that resolves with Response.txt().
  */
  function fetchLibrary (library) {
    return fetch(library)
    .then(function (success){
      return success.text();
    });
  }

  /***
  * fetchLibraryCAtch, this is a function with custom Error messages, It is called after a Promise rejects.
  * @param {String} error Whatever 'fetch' decides to throws
  */
  function fetchLibraryCatch (error) {
    console.log('Upsss! seems that something went wrong fetching '+library);
    console.log(reason);
  }

  /**
  * 'load' function, injects a JS libray and then execute a callback.
  * @param {String} library Relative path to a local library or URL to an external resource.
  * @param {Function} callback Function to be call after library injection.
  */
  var load = function (library, callback) {
    console.log('jsav_ijs.load(), fucntion called');
    fetchLibrary(library)
    .then( function ( response ) {
        injectJS(response);
        callback(response);
    })
    .catch(fetchLibraryCatch);
  };


  /**
  * 'loadAll' function, injects several JS libraries by precedency, then call the callback function.
  * Precedency is assigned by the array index.
  * @param {Array} librariesArray An array of libraries to inject. Local libraries or external resources.
  * @param {Function} callback Function to be call after library injection.
  */
  var loadAll = function (librariesArray, callback) {
    console.log('jsav_ijs.loadAll(), function called');

    var thenables = [];

    librariesArray.forEach( function (library) {
      thenables.push(fetchLibrary(library).catch(fetchLibraryCatch));
    });
    console.log('There are '+thenables.length+' libraies in the thenables array');
    Promise.all(thenables)
    .then(function(responses){
      var count = 0;
      responses.forEach(function(response){
        injectJS(response);
        callback(response);
        console.log('loadAll()  -->  LibrariesArray['+count+'] --> '+librariesArray[count]+' injected');
        count++;
      });
      console.log('All Libraies injected in the DOM');
    });
  };

  return {
    load: load,
    loadAll: loadAll
  };
})();
