/**
 * Created by ndonaldson on 31/03/2015.
 */
module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  //store package info in variable
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    //CLEAN
    clean: {
      dist: ['dist/*']
    },

    //CONCAT
    concat: {
      dev: {
        src: ['src/js/controller.js','src/js/configuratorModule.js','src/js/displayModule.js','src/js/retrievalModule.js'],
        dest: 'dev/'+pkg.name+'-'+pkg.version+'.js',
        options: {
          separator: '\n\n'
        }
      },
      dist: {
        src: ['src/js/controller.js','src/js/*.js'],
        dest: 'dist/'+pkg.name+'-'+pkg.version+'.js',
        options: {
          separator: '\n\n',
          banner: '/*!\n * '+pkg.name+'\n' +
            ' *   Version: '+pkg.version+'\n' +
            ' *   Build Time: ' + grunt.template.today() + '\n' +
            ' */\n\n',
          footer: '\n\n/*! End '+pkg.name+' */'
        }
      }
    },

    //JSHINT
    jshint: {
      src: [
        'src/js/*.js'
      ]
    }
  }); //END TASK OPTIONS

  //register "build" task
  grunt.registerTask('build', [
    'jshint',       //check source JS file syntax
    'clean:dist',   //wipe the dist/ folder
    'concat:dist',  //merge the source js files and copy to dist/
    'copy:dist',    //construct the index.html using src/index_template.html as source
    'process:dist'  //add in "Distribution" titles and Version tags to index.html
  ]);

  //register "serve" task
  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']); // if the serve target is 'dist' - build and serve that
    }

    grunt.task.run([
      'jshint',             //check source JS file syntax
      'clean:dev',          //clean the /dev folder
      'concat:dev',         //construct the dev version of the concatenated JS files
      'copy:dev',           //construct the index.html using src/index_template.html as source
      'process:dev',        //add in "Development" titles and Version tags to index.html
      'connect:livereload', //create and connect to the server
      'watch'               //watch for changes
    ]);
  });

  //register "clean all" task
  grunt.registerTask('wipe', [
    'clean:dist',
    'clean:dev'
  ]);
};