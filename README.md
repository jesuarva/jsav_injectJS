# "jsav_injectJS" by jesuarva: Jean Surkouf Ariza Varela.
A Library that allows asynchronously load JS libraries. Then injects each resource in the DOM by precedency.

## Methods
### load()
```
/**
* 'load' function, injects a JS libray and then execute a callback.
* @param {String} library Relative path to a local library or URL to an external resource.
* @param {Function} callback Function to be call after library injection.
*/
var load = function (library, callback) {
  return fetch(library)
  .then(function (success){
    return success.text();
  });
}
```

### loadAll()
```
/**
* 'loadAll' function, injects several JS libraries by precedency, then call the callback function.
* Precedency is assigned by the array index.
* @param {Array} librariesArray An array of libraries to inject. Local libraries or external resources.
* @param {Function} callback Function to be call after library injection.
*/
var loadAll = function (librariesArray, callback) {
  console.log('jsav_ijs.load(), fucntion called');
  fetchLibrary(library)
  .then( function ( response ) {
      injectJS(response);
      callback(response);
  })
  .catch(fetchLibraryCatch);
};
```


## Licensed under MIT license
