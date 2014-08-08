module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'bower_components/versal-component-runtime/dist/runtime.min.js',
      'lib/mocha.js',
      'lib/chai.js',
      'bower_components/eventEmitter/EventEmitter.js',
      'bower_components/versal-player-api/index.js',
      'lib/jquery-1.11.0.min.js',
      'lib/jquery.autosize.js',
      'lib/highlight.pack.js',
      'lib/behave.js',
      'scripts/post_message_interface.js',
      'scripts/highlightr.js',
      'specs/highlightr_spec.js'
    ],
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Firefox']
  });
};
