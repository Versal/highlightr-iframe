module.exports = function(grunt) {
  grunt.initConfig({
    stylus: {
      compile: {
        options: {
          use: [ require('nib') ]
        },
        files: {
          'styles/gadget.css': 'src/styles/**/*.styl'
        }
      }
    },
    
    mocha: {
      test: {
        src: ['./test.html'],
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
        files: ['./specs/**/*.js'],
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
