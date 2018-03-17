/**
* Jasmine test originaly runned on Mac's Google Chrome: Version 67.0.3372.0 (Official Build) canary (64-bit)
*/

describe('"Library injectJS"', function(){

  // Check if injectJS is in the global scope.
  it('"jsav_ijs" must be a property of Window Object', function(){
    expect(window.hasOwnProperty('jsav_ijs')).toBe(true);
  });

  describe('"loadAll() Function"', function (){
    var arrayToFetch = ["src/js/auxiliarLibraries/libraryToFetch.js",
                        "src/js/auxiliarLibraries/library1.js",
                        "src/js/auxiliarLibraries/library2.js",
                        "src/js/auxiliarLibraries/library3.js"
                      ];

    describe('"Libraries to Fetch"', function(){
      var isValid = false;

      // If the library is not ending with '.js' -> then is not a valid URI.
      arrayToFetch.forEach( function (item) {
        if (item.endsWith('.js')) {
          isValid = true;
        } else {
          isValid = false;
        }
      });

      it('Should take as argument an Array of String-URLs', function (){
        expect(Array.isArray(arrayToFetch)).toBe(true);
      });
      it('Elements in the Array must be of String type && only JS files.', function (){
        expect(isValid).toBe(true);
      });

    });

    describe('"Functionalities"', function() {
      var arrayLength = arrayToFetch.length;

      /**
        * ASSUMTIONS:
        * Each injected script has an 'Id' that is equal to its URI.
        * Each injected script has a class="injectedScript".
        * Libraries are append() to <head> element one by one.
        * We assume that each library was injected in the <head> element acording to its index in the 'arrayToFetch'.
        *
        * This function gets the injected scripts and return an Array with their 'Ids'.
        * @return {Array} idsArray.
        */
        function librariesInjected () {
          var idsArray = [];
          var injectedScripts = document.getElementsByClassName('injectedScript');
          // console.log(injectedScripts);
          for (var i = 0; i < arrayLength; i++){
            idsArray.push(injectedScripts[ i ].id);
          }
          return idsArray;
        }

      beforeEach(function(done) {
        jsav_ijs.loadAll(arrayToFetch, function (){
          done();
        });
      });

      it('Should "inject" the fetched libraries in the <head> element by precedency && call the "callback" function.',
        function (done){

          /**
            * Both arrays must contains the original URIs to fetch.
            * join() each array.
            * The returned Strings must to be equals to each other..
            */
            expect(librariesInjected().join()).toBe(arrayToFetch.join());

          expect(document.getElementsByClassName('injectedScript').length).toBe(arrayLength);
          done();
        }
      );

    });


  });

});
