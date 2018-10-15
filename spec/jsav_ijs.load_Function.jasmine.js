/**
* Jasmine test originaly runned on Mac's Google Chrome: Version 67.0.3372.0 (Official Build) canary (64-bit)
*/

describe('"Library injectJS"', function(){

  // Check if injectJS is in the global scope.
  it('"jsav_ijs" must be a property of Window Object', function(){
    expect(window.hasOwnProperty('jsav_ijs')).toBe(true);
  });

  describe('"load() Function"', function (){

    var libraryToFetch = "src/js/auxiliarLibraries/libraryToFetch.js";

    describe('"Library to Fetch"', function (){
      it('Should take as argument a String with a single URL.', function(){
        expect(typeof libraryToFetch).toBe('string');
      });
      it('Should fetch() only Javascript files.', function (){
        expect(libraryToFetch.endsWith('.js')).toBe(true);
      });

    });

    describe('"Funtionalities"', function (){
      var scripts;
      var scriptsLength;

      beforeEach(function (done){
        jsav_ijs.load(libraryToFetch, function() {
          done();
        });
      });

      it('Should "inject" the fetched library in the <head> && call the "callback" function.',
        function (done){
          expect(document.getElementsByClassName('injectedScript').length).toBe((1));
          done();
        }
      );

    });

  });

});
