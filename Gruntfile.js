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
				tasks: ['dev-build'],
				options: {
					livereload: '<%=connect.options.livereload %>'
				}
			},
			js: {
				files: ['src/*.js'],
				tasks: ['dev-build'],
				options: {
					livereload: '<%=connect.options.livereload %>'
				}
			},
			html: {
				files: ['src/index.html'],
				tasks: ['dev-build'],
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
			dist: ['dist/*'],
			dev: ['dev/*']
		},

		//CONCAT
		concat: {
			dev: {
				src: ['src/*.js'],
				dest: 'dev/overlayPlugins.js',
				options: {
					separator: '\n\n',
					stripBanners: true,
					banner: '/*!\n * ' + pkg.name + '\n' +
					' *   Version: ' + pkg.version + '\n' +
					' *   Build Time: ' + grunt.template.today() + '\n' +
					' */\n\n',
					footer: '\n\n/*! End ' + pkg.name + ' */'
				}
			}
			//TODO - Strip Comments
		},

	//PROCESS
		process: {
			dev: {
				src: 'dev/overlayPlugins.js',
				dest: 'dev/overlayPlugins.js',
				options: {
					process: function (src, dest, content, fileObject) {
						//wrap script in jQuery object
						return '(function ($){\n' + content + '\n}(jQuery));';
					}
				}
			},
			dist: {
				src: 'dev/overlayPlugins.js',
				dest: 'dist/overlayPlugins.js'
			}
		},

		//COPY
		copy: {
			dev: {
				src: 'src/index.html',
				dest: 'dev/index.html'
			},
			dist: {
				src: 'dev/index.html',
				dest: 'dist/index.html'
			}
		},

		//JSHINT
		jshint: {
			pre: [
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
			dev: {
				options: {
					sourceMap: true
				},
				files: {
					'dev/overlayPlugins.min.js':['dev/overlayPlugins.js']
				}
			},
			dist: {
				options: {
					sourceMap: true
				},
				files: {
					'dev/overlayPlugins.min.js':['dev/overlayPlugins.js']
				}
			}
		}
		//END UGLIFY
	});
	/* END CONFIGURE TASKS */

	/* REGISTER TASKS */
	//"dev-build"
	grunt.registerTask('dev-build', [
		'jshint:pre',       //pre-check source JS files syntax
		'clean:dev',        //wipe the dev/ folder
		'concat:dev',       //merge the source js files and create the dist/ js file
		'process:dev',      //wrap the generated file in jQuery object closure
		'jshint:dev',       //jshint hint the final concatenated file
		'uglify:dev',		//minify the concatenated JS file
		'copy:dev'          //copy the index.html tester to the dev folder
	]);

	//"dist-build"
	grunt.registerTask('dist-build', [
		'jshint:pre',       //pre-check source JS files syntax
		'clean:dev',        //wipe the dev/ folder
		'concat:dev',       //merge the source js files and create the dist/ js file
		'process:dev',      //wrap the generated file in jQuery object closure
		'jshint:dev',       //jshint hint the final concatenated file
		'uglify:dev',		//minify the concatenated JS file
		'copy:dev'          //copy the index.html tester to the dev folder

		//strip comments
	]);

	//"serve" task
	grunt.registerTask('serve', [
		'dev-build',            //check source JS file syntax
		'connect:livereload',   //create and connect to the server
		'watch'                 //watch for changes
	]);
	/* END REGISTER TASKS */
};
// END module.exports = function(grunt)