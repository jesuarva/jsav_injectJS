describe('"Library injectJS"', function(){

  it('"jsav_ijs" must be a property of Window Object', function(){
    expect(window.hasOwnProperty('jsav_ijs')).toBe(true);
  });

  describe('"load() Function"', function (){
    jsav_ijs.load("libraryToFetch.js");

    it('Should taka as argument a String with a single URL.', function(){

    });
    it('Should fetch() asynchronously only a Javascript file.', function (){

    });
    it('Should "inject" the fetched library in the <head>.', function (){

    });
    it('Should call a callback function after the library is injected.', function(){

    });

  });

  describe('"loadAll() Function"', function (){
    jsav_ijs.loadAll(arrayToFetch);

    it('Should take as argument an Array of String-URLs', function (){

    });
    it('Should fetch() asynchronously only Javascript files.', function (){

    });
    it('Should "inject" the fetched library in the <head> by precedency; maintaining its Array index position.', function (){

    });
    it('Should call a callback function after the library is injected.', function(){

    });

  });

});
