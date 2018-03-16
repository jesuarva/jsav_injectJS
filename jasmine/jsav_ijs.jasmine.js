/**
* Must were runned on MAc's Google Chrome: Version 67.0.3372.0 (Official Build) canary (64-bit)
*/

describe('"Library injectJS"', function(){

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
        scripts = document.getElementsByTagName('script');
        scriptsLength = scripts.length;
        jsav_ijs.load(libraryToFetch, function() {
          done();
        });
      });

      it('Should "inject" the fetched library in the <head>, and must call the "callback" function.', function (done){
        expect(document.getElementsByTagName('script').length).toBe((++scriptsLength));
        done();
      });

    });

  });


  // describe('"loadAll() Function"', function (){
    // jsav_ijs.loadAll(arrayToFetch);

    // it('Should take as argument an Array of String-URLs', function (){
    //
    // });
    // it('Should fetch() asynchronously only Javascript files.', function (){
    //
    // });
    // it('Should "inject" the fetched library in the <head> by precedency; maintaining its Array index position.', function (){
    //
    // });
    // it('Should call a callback function after the library is injected.', function(){
    //
    // });

  // });

});
