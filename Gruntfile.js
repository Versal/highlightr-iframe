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

    watch: {
      styles: {
        files: ['src/styles/**/*.styl'],
        tasks: ['stylus']
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus');

  grunt.registerTask('default', ['stylus']);
  grunt.registerTask('dev', ['stylus', 'watch']);
};
