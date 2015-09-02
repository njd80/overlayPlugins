/**
* Grunt Configuration
*/
module.exports = function(grunt) {

	// Auto-Load Tasks
	require('load-grunt-tasks')(grunt);

	// Time Tasks.
	require('time-grunt')(grunt);

	// Read Package File
	var pkg = grunt.file.readJSON('package.json');

	/* CONFIGURE TASKS */
	grunt.initConfig({

		//WATCH
		watch: {
			gruntfile: {
				files: ['Gruntfile.js'],
				tasks: ['build'],
				options: {
					livereload: '<%=connect.options.livereload %>'
				}
			},
			js: {
				files: ['src/*.js'],
				tasks: ['build'],
				options: {
					livereload: '<%=connect.options.livereload %>'
				}
			},
			html: {
				files: ['src/index.html'],
				tasks: ['build'],
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
				base:'dev',
				livereload: true
			},
			livereload: {
				options: {
					open: true,
					base:'dev'
				}
			}
		},

		//CLEAN
		clean: {
			dev: ['dev/*'],
			dist: ['dist/*']
		},

		//CONCAT
		concat: {
			options: {
				separator: '\n\n'
			},
			dev: {
				src: ['src/*.js'],
				dest: 'dev/overlayPlugins.js'
			},
			dist: {
				src: ['src/*.js'],
				dest: 'dist/overlayPlugins.js'
			}
		},

		//PROCESS
		process: {
			options: {
				process: function (src, dest, content, fileObject) {
					var banner = '/*!\n*	' + pkg.name + '\n' +
						'*	Author: ' + pkg.author + '\n' +
						'*	Copyright: ' + grunt.template.today('yyyy') + '\n' +
						'*	Version: ' + pkg.version + '\n' +
						'*	Build Time: ' + grunt.template.today() + '\n' +
						'*/\n';
					var footer = '\n/*! End ' + pkg.name + ' */';
					var jQueryWrapper = '(function ($){\n' + content + '\n}(jQuery));';
					return banner + jQueryWrapper + footer;
				}
			},
			dev: {
				src: 'dev/overlayPlugins.js',
				dest: 'dev/overlayPlugins.js'
			},
			dist: {
				src: 'dist/overlayPlugins.js',
				dest: 'dist/overlayPlugins.js'
			}
		},

		//COPY
		copy: {
			htmldev: {
				src: 'src/index.html',
				dest: 'dev/index.html',
				options : {
					process: function (content, srcpath) {
						var buildTime = content.replace(/{bt}/, grunt.template.today());
						return buildTime.replace(/{env}/g, 'Development');
					}
				}
			},
			htmldist: {
				src: 'src/index.html',
				dest: 'dist/index.html',
				options : {
					process: function (content, srcpath) {
						var buildTime = content.replace(/{bt}/, grunt.template.today());
						var env = buildTime.replace(/{env}/g, 'Distribution');
						return env.replace(/overlayPlugins.js/g,'overlayPlugins.min.js');
					}
				}
			}
		},

		//JSHINT
		jshint: {
			src: [
				'src/*.js'
			],
			dev: [
				'dev/overlayPlugins.js'
			],
			dist: [
				'dist/overlayPlugins.js'
			]
		},

		//UGLIFY
		uglify: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'dist/overlayPlugins.min.js':['dist/overlayPlugins.js']
				}
			}
		}
	});
	/* END CONFIGURE TASKS */

	/* REGISTER TASKS */
	//"build"
	grunt.registerTask('build', [
		'jshint:src',       //check source JS files syntax
		'clean',        	//wipe the dev/ and dist/ folders
		'concat',       	//merge the source js files and copy to dev/ & dist/
		'process',      	//wrap the generated file(s) in jQuery wrapper & add banner
		'jshint:dev',       //jshint hint the final concatenated file(s)
		'jshint:dist',      //jshint hint the final concatenated file(s)
		'copy',				//copy index.html files to dev/ & dist/ folders
		'uglify'			//minify the dist/ JS file for release
	]);

	//"serve" task
	grunt.registerTask('serve', [
		'build',            	//build
		'connect:livereload',   //create and connect to the server
		'watch'                 //watch for changes
	]);
	/* END REGISTER TASKS */

};
// END module.exports = function(grunt)