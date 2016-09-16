module.exports = function(grunt) {
	"use strict";
	var version = 'vos_lib_1.0.0.1';
	grunt.initConfig({
		concat: {
			options: {
				separator: "\n",
				process: function(src, filepath) {
					return '/*' + filepath + '*/\n' + src;
				}
			},
			js: {
				options: {
					separator: ";\n"
				},
				files: {
					'dist/library.js': [
						'main.js',
						'page1.js',
						'sub_lib1.js'
					]
				}
			}
		},
		uglify: {
			options: {
				preserveComments: function(node, comment) {
					return /^@preserve|@license|@cc_on/i.test(comment.value);
				}
				,banner: '/* Build version '+version+' */\r'
			}
			,all: {
				files: {
					'dist/library.min.js': 'dist/library.js',
					//'../../../someplace/library.min.js': 'dist/library.js'
				}
			}
		},
		watch: {
			dev: {
				files: ['Gruntfile.js', '**.js'],
				tasks: ['build'],
				options: {
					atBegin: true
				}
			}
		},
		clean: {
			tmp: {
				options: {
					'force': true
				},
				src: ['tmp/*/']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('build', [
		'concat:js',
		'uglify:all',
		'clean:tmp'
	]);
};
