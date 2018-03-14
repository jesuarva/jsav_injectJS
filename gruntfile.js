// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {
   // CONFIGURE GRUNT
   grunt.initConfig({
      // get the configuration info from package.json file,
      // this way we can use things like name and version (pkg.name)
      pkg: grunt.file.readJSON('package.json'),
      bannerMessage: '/*\n * "<%= pkg.name %>" by <%= pkg.author %>.\n * <%= pkg.description %>.\n * Last update on <%= grunt.template.today() %>\n * Licenses under <%= pkg.license %>\n */\n\n',

      // all of our configuration goes here
      concat: {
        options: {
          separator: ';',
          banner: '<%= bannerMessage %>'
        },
        js: {
          src: ['<%= pkg.main %>'],
          dest: 'app/js/<%= pkg.name %>.js'
        }
      },

      uglify: {
        options: {
          banner: '<%= bannerMessage %>'
        },
        js: {
          files: {
            // 'app/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
            'app/js/<%= pkg.name %>.min.js': ['<%= pkg.main %>']
          }
        }
      },

      jshint: {
        files: ['gruntfile.js', 'src/**/*.js'],
        options: {
          globals: {
            jQuery: true
          }
        }
      },

      watch: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },

      jasmine: {
            test: {
                src: 'src/**/*.js',
                options: {
                  vendor: [
                          'bower_components/jquery/dist/jquery.js',
                          'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
                          ],
                  specs: 'src/**/*.jasmine.js'
                }
            }
        }

   });

   // log something
   grunt.log.write('Hi there, just grunt working!\n');

   // Load the plugins
     // Removes grunt.loadNpmTasks, then add the require('jit-grunt')(grunt) instead. Only it.
       require('jit-grunt')(grunt);
         // grunt.loadNpmTasks('grunt-contrib-concat');
         // grunt.loadNpmTasks('grunt-contrib-uglify');
         // grunt.loadNpmTasks('grunt-contrib-jshint');
         // grunt.loadNpmTasks('grunt-contrib-watch');
         // grunt.loadNpmTasks('grunt-contrib-less');

   // Default task(s).
   grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
   grunt.registerTask('concatuglify', ['concat', 'uglify']);
   grunt.registerTask('jasmine', ['jasmine']);
};
