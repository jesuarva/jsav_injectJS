/*
 * Testing ijs.load()
 */
function load_Callback (scriptBody){
  document.getElementById('load').insertAdjacentHTML('beforeend', '<div class="response"><h4>Example<br>Library to fetch<pre>jsav_ijs.load("src/js/auxiliarLibraries/library2.js", load_Callback);</pre></h4><h5>Library\'s body response<br><pre>'+scriptBody+'+</pre></h5></div>');
}
jsav_ijs.load('src/js/auxiliarLibraries/library2.js', load_Callback);
// jsav_ijs.load('src/js/auxiliarLibraries/wrongLibrary.js', load_Callback);


/*
 * Testing ijs.loadAll()
 */
document.getElementById('loadAll').insertAdjacentHTML('beforeend', '<div class="response"><h4>Example<br>Library array to fetch: <pre>var libsToFetch = [\'https://code.jquery.com/jquery-3.3.1.min.js\',\'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js\',\'src/js/auxiliarLibraries/library3.js\'];<br>jsav_ijs.loadAll(libsToFetch, loadAll_Callback);</pre></div>');
function loadAll_Callback (scriptBody){
    document.getElementById('loadAll').insertAdjacentHTML('beforeend', '<div class="response"><h4>Library fetched and injected</h4><pre><code>'+scriptBody+'+</code></pre></div>');
}

var libsToFetch = ['https://code.jquery.com/jquery-3.3.1.min.js',
                   'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
                   'src/js/auxiliarLibraries/library3.js'];

var libsToFetch_2 = ['https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js',
                     'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
                     'src/js/auxiliarLibraries/library3.js'];

var libsToFetch_3 = ['src/js/auxiliarLibraries/library3.js',
                     'src/js/auxiliarLibraries/library2.js',
                     'src/js/auxiliarLibraries/library1.js'];

jsav_ijs.loadAll(libsToFetch, loadAll_Callback);
// jsav_ijs.loadAll(libsToFetch_2, loadAll_Callback);
// jsav_ijs.loadAll(libsToFetch_3, loadAll_Callback);
