module.exports = function(grunt) {
  grunt.initConfig({
    stylus: {
      compile: {
        options: {
          use: [ require('nib') ]
        },
        files: {
          'assets/gadget.css': 'src/styles/**/*.styl'
        }
      }
    },
    
    mocha: {
      test: {
        src: ['assets/test.html'],
        options: {
          reporter: 'Spec',
          log: true,
          logErrors: true,
          run: true
        }
      }
    },

    watch: {
      styles: {
        files: ['src/styles/**/*.styl'],
        tasks: ['stylus']
      },

      tests: {
        files: ['assets/specs/**/*.js'],
        tasks: ['mocha']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('default', ['stylus', 'mocha']);
  grunt.registerTask('dev', ['stylus', 'mocha', 'watch']);
};
