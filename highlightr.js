(function() {
  'use strict';

  // wrapper for postMessage communication
  var player = new VersalPlayerAPI();

  var highlightjsThemes = [
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
  ];

  var highlightjsCssFiles = {
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

  /**
   * @constructor
   * Gadget constructor
   * @param options Used to set container DOM element
   */
  window.Highlightr = function() {
    this._$el = $('<div class="hljs-container"></div>');
    this._config = {};
    this._editable = false; // a toggle-able state for the gadget

    /**
     * Add a bunch of theme options in the property sheet
     * NOTE: the select will trigger attributeChanged if
     * a different option is selected
     */
    player.setPropertySheetAttributes({
      theme: {
        type: 'Select',
        options: highlightjsThemes
      }
    });

    player.on('attributesChanged', (function(config) {
        this._config = config;
        this._render();
    }).bind(this));

    player.on('editableChanged', (function(data) {
        this._editable = data.editable;
        this._render();
    }).bind(this));

    player.startListening();
    player.watchBodyHeight();
  };

  Highlightr.prototype.getEl = function() {
    return this._$el[0];
  };

  Highlightr.prototype._render = function() {
    var themeFile = highlightjsCssFiles[this._config.theme || 'default'];
    document.getElementById('highlightStylesheet').href = 'bower_components/highlightjs/styles/' + themeFile;

    if (this._editor) {
      this._editor.destroy();
      delete this._editor;
    }
    this._$el.empty();

    // show either the code or an editable textarea
    if (this._editable) {
      var $textarea = $('<textarea class="code hljs"></textarea>');
      this._$el.html($textarea);
      $textarea.text(this._config.code || '');
      $textarea.autosize();

      this._editor = new Behave({
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

      $textarea.on('keyup', function(e) {
        $textarea.trigger('autosize.resize');
      });
      $textarea.on('blur', function(e) {
        player.setAttributes({ code: e.target.value });
      });
    } else {
      this._$el.html(
        '<pre class="hljs"><code>' +
        hljs.highlightAuto(this._config.code || '').value +
        '</code></pre>'
      );
    }
  };

}());
