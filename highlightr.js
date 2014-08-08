(function() {
  'use strict';

  // wrapper for postMessage communication
  var player = new VersalPlayerAPI();

  /**
   * @constructor
   * Gadget constructor
   * @param options Used to set container DOM element
   */
  window.Highlightr = function() {
    this.$el = $('<div class="hljs-container"></div>');
    this.config = {};
    this.editable = false; // a toggle-able state for the gadget

    /**
     * add a bunch of theme options in the property sheet
     * NOTE: the select will trigger attributeChanged if
     * a different option is selected
     */
    player.sendMessage('setPropertySheetAttributes', {
      theme: {
        type: 'Select',
        options: [
          'arta',
          'ascetic',
          'atelier-dune dark',
          'atelier-dune light',
          'atelier-forest dark',
          'atelier-forest light',
          'atelier-heath dark',
          'atelier-heath light',
          'atelier-lakeside dark',
          'atelier-lakeside light',
          'atelier-seaside dark',
          'atelier-seaside light',
          'brown-paper',
          'dark-style',
          'default',
          'docco',
          'far',
          'foundation',
          'github',
          'googlecode',
          'idea',
          'ir-black',
          'magula',
          'monokai',
          'monokai-sublime',
          'obsidian',
          'paraiso dark',
          'paraiso light',
          'pojoaque',
          'railscasts',
          'rainbow',
          'school-book',
          'solarized dark',
          'solarized light',
          'sunburst',
          'tomorrow-night-blue',
          'tomorrow-blue-bright',
          'tomorrow-night-eighties',
          'tomorrow-night',
          'tomorrow',
          'vs',
          'xcode',
          'zenburn'
        ]
      }
    });

    this.createListeners();
    this.createBehaveHooks();

    player.startListening();
    player.watchBodyHeight();
  };

  Highlightr.prototype.getEl = function() {
    return this.$el[0];
  };

  // auto-size hook for Behave.js editor plugin
  Highlightr.prototype.createBehaveHooks = function() {
    BehaveHooks.add(['keydown'], function(data) {
      var numLines = data.lines.total;
      var fontSize = parseInt($(data.editor.element).css('font-size'), 10);
      var padding = parseInt($(data.editor.element).css('padding'), 10);

      $(data.editor.element).height((numLines * fontSize) + padding);
    });
  };

  Highlightr.prototype.createListeners = function() {
    player.on(
      'attributesChanged',
      function(config) {
        this.config = config;
        this.render();
      }.bind(this)
    );

    player.on(
      'editableChanged',
      function(editable) {
        this.editable = editable;
        if (!this.editable) {
          if (this.editor !== undefined) {
            this.editor.destroy();
            delete this.editor;
          }
        }

        this.render();
      }.bind(this)
    );
  };

  Highlightr.prototype.cssFiles = {
    'arta': 'arta.css',
    'ascetic': 'ascetic.css',
    'atelier-dune dark': 'atelier-dune.dark.css',
    'atelier-dune light': 'atelier-dune.light.css',
    'atelier-forest dark': 'atelier-forest.dark.css',
    'atelier-forest light': 'atelier-forest.light.css',
    'atelier-heath dark': 'atelier-heath.dark.css',
    'atelier-heath light': 'atelier-heath.light.css',
    'atelier-lakeside dark': 'atelier-lakeside.dark.css',
    'atelier-lakeside light': 'atelier-lakeside.light.css',
    'atelier-seaside dark': 'atelier-seaside.dark.css',
    'atelier-seaside light': 'atelier-seaside.light.css',
    'brown-paper': 'brown_paper.css',
    'dark-style': 'dark.css',
    'default': 'default.css',
    'docco': 'docco.css',
    'far': 'far.css',
    'foundation': 'foundation.css',
    'github': 'github.css',
    'googlecode': 'googlecode.css',
    'idea': 'idea.css',
    'ir-black': 'ir_black.css',
    'magula': 'magula.css',
    'monokai': 'monokai.css',
    'monokai-sublime': 'monokai-sublime.css',
    'obsidian': 'obsidian.css',
    'paraiso dark': 'paraiso_dark.css',
    'paraiso light': 'paraiso_light.css',
    'pojoaque': 'pojoaque.css',
    'railscasts': 'railscasts.css',
    'rainbow': 'rainbow.css',
    'school-book': 'school_book.css',
    'solarized dark': 'solarized_dark.css',
    'solarized light': 'solarized_light.css',
    'sunburst': 'sunburst.css',
    'tomorrow-night-blue': 'tomorrow-night-blue.css',
    'tomorrow-blue-bright': 'tomorrow-blue-bright.css',
    'tomorrow-night-eighties': 'tomorrow-night-eighties.css',
    'tomorrow-night': 'tomorrow-night.css',
    'tomorrow': 'tomorrow.css',
    'vs': 'vs.css',
    'xcode': 'xcode.css',
    'zenburn': 'zenburn.css',
  };

  Highlightr.prototype.render = function() {
    var themeFile = this.cssFiles[this.config.theme || 'default'];
    document.getElementById('highlightStylesheet').href = 'bower_components/highlightjs/styles/' + themeFile;

    // show either the code or an editable textarea
    if (this.editable) {
      var $textarea = $('<textarea class="code hljs"></textarea>');
      this.$el.html($textarea);
      $textarea.text(this.config.code || '');
      $textarea.autosize();

      this.editor = new Behave({
        textarea: $textarea[0],
        replaceTab: true,
        softTabs: true,
        tabSize: 2,
        autoOpen: true,
        overwrite: true,
        autoStrip: true,
        autoIndent: true,
        fence: false
      });

      // on blur of textarea, save contents to config
      $textarea.on('blur', function(e) {
        player.setAttributes({ code: e.target.value });
      }.bind(this));
    } else {
      this.$el.html(
        '<pre class="hljs"><code>' +
        hljs.highlightAuto(this.config.code || '').value +
        '</code></pre>'
      );
    }
  };

}());
