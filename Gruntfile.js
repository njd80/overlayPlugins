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

    //WATCH
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      js: {
        files: ['src/*.js'],
        tasks: ['jshint'],
        options: {
          livereload: '<%=connect.options.livereload %>'
        }
      },
      html: {
        files: ['src/index.html'],
        options: {
          livereload: '<%=connect.options.livereload %>'
        }
      }
    },

    //CONNECT
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        base:'src',
        livereload: true
      },
      livereload: {
        options: {
          open: true,
          base:'src'
        }

      }
    },

    //CLEAN
    clean: {
      dist: ['dist/*']
    },

    //CONCAT
    concat: {
      dist: {
        src: ['src/*.js'],
        dest: 'dist/' + pkg.name + '_' + pkg.version + '.js',
        options: {
          separator: '\n\n',
          banner: '/*!\n * ' + pkg.name + '\n' +
          ' *   Version: ' + pkg.version + '\n' +
          ' *   Build Time: ' + grunt.template.today() + '\n' +
          ' */\n\n',
          footer: '\n\n/*! End ' + pkg.name + ' */'
        }
      }
    },

    //JSHINT
    jshint: {
      src: [
        'src/*.js'
      ]
    }
  }); //END TASK OPTIONS

  //register "build" task
  grunt.registerTask('build', [
    'jshint',       //check source JS file syntax
    'clean',        //wipe the dist/ folder
    'concat'        //merge the source js files and create the dist/ js file
  ]);

  //register "serve" task
  grunt.registerTask('serve', [
    'jshint',             //check source JS file syntax
    'connect:livereload', //create and connect to the server
    'watch'               //watch for changes
  ]);
};