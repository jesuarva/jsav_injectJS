/*
 * "jsav_injectJS" by jesuarva: Jean Surkouf Ariza Varela.
 * A Library that allows asynchronously load JS libraries. Then injects each resource in the DOM by precedency.
 * Last update on Sat Mar 17 2018 13:51:20
 * Licenses under MIT License
 */

window.jsav_ijs = (function(){
  /**
  * Injector, this function injects a JS library in the DOM.
  * @param {String} scriptBody The 'fetched' library's body.
  * @param {String} librayURL The library URI.
  */
  function injectJS (scriptBody, libraryURI) {
    // Create new <scritp> that'll be injected in DOM
    var newScript = document.createElement('script');
    newScript.id = String(libraryURI);
    newScript.className = 'injectedScript';
    // Add body to new <script>
    newScript.insertAdjacentHTML('beforeend', scriptBody);
    // Inject new <script> to DOM
    document.head.appendChild(newScript);
    console.log('Library injected');
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
    console.log('Upsss! seems that something went wrong fetching a library');
    console.log(error);
  }

  /**
  * 'load' function, injects a JS libray and then execute a callback.
  * @param {String} library Relative path to a local library or URL to an external resource.
  * @param {Function} callback Function to be call after library injection.
  */
  var load = function (library, callback) {
    console.log('jsav_ijs.load(), fucntion called');
    if (typeof library != 'string') {
      throw (new Error('Argument Library -> Must be a String.'));
    } else if ( !(library.endsWith('.js')) ) {
      throw (new Error('library to Fetch must be a Javascript file.'));
    }
    fetchLibrary(library)
    .then( function ( response ) {
        injectJS(response, library);
        callback();
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
    console.log('jsav_ijs.loadAll(), function called.');

    if(!Array.isArray(librariesArray)) {
      throw ( new Error('Argument is not an Array. Pass your libraries by precedency into an Array.'));
    } else {
      // Items must be of String Array && JS files
      librariesArray.forEach( function( item ) {
        if (typeof item !== 'string') {
          throw (new Error('Elements in the Array must be in Strings format. At least one element in the Array is not of String type.'));
        } else if (!item.endsWith('.js')) {
          throw (new Error('injectJS only fetch Javascript files. At least one of the elements in the Array is no a JS file.'));
        }
      });
    }

    var thenables = [];

    librariesArray.forEach( function (library) {
      thenables.push(fetchLibrary(library).catch(fetchLibraryCatch));
    });
    console.log('There are '+thenables.length+' libraies in the thenables array');
    Promise.all(thenables)
    .then(function(responses){
      var count = 0;
      responses.forEach(function(response){
        injectJS(response, librariesArray[count]);
        console.log('loadAll()  -->  LibrariesArray['+count+'] --> '+librariesArray[count]+' injected');
        count++;
      });
      console.log('All Libraies injected in the DOM');
    })
    .then(function(){
      callback();
      console.log("ALL LIBRARIES FETCHED && INJECTED");
    })
    .catch(fetchLibraryCatch);
  };

  return {
    load: load,
    loadAll: loadAll
  };
})();
