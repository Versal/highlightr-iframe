module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'bower_components/eventEmitter/EventEmitter.js',
      'bower_components/versal-gadget-api/versal-player-api.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/jquery-autosize/jquery.autosize.js',
      'bower_components/highlightjs/highlight.pack.js',
      'bower_components/Behave.js/behave.js',
      'highlightr.js',
      'highlightr_spec.js'
    ],
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Firefox']
  });
};
