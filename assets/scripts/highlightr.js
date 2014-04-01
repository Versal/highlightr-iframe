var exports = exports || {};

(function() {
  'use strict';

  // wrapper for postMessage communication
  var vi = new exports.versalInterface();

  /**
   * @constructor
   * Gadget constructor
   * @param options Used to set container DOM element
   */
  var Highlightr = function(options) {
    this.$el = $(options.el);
    if (options.config)
      this.config = options.config;

    // a toggle-able state for the gadget
    this.editable = false;
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
    vi.addEventListener(
      'attributesChanged',
      function(data) {
        for (var key in data) {
          this.config[key] = data[key];
        }

        this.render();
        this.afterRender();
      }.bind(this)
    );

    vi.addEventListener(
      'attached',
      function() {
        this.render();
        this.afterRender();
      }.bind(this)
    );

    vi.addEventListener(
      'setEditable',
      function(data) {
        this.editable = data.editable;
        if (!data.editable) {
          if (this.editor !== undefined) {
            this.editor.destroy();
          }
        }

        this.render();
        this.afterRender();
      }.bind(this)
    );
  };

  Highlightr.prototype.initialize = function() {
    /**
     * add a bunch of theme options in the property sheet
     * NOTE: the select will trigger attributeChanged if
     * a different option is selected
     */
    vi.trigger('setPropertySheetAttributes', {
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

    return this;
  };

  Highlightr.prototype.render = function() {
    // this generates the markup from the raw code input
    var code;
    var $container;

    if (this.config.code !== '') {
      code = hljs.highlightAuto(this.config.code).value;
    } else {
      code = '';
    }

    if (!this.$el.find('.hljs-container').length) {
      this.$el.append('<div class="hljs-container"></div>');
    } else {
      this.$el.find('.hljs-container')[0].className = "hljs-container";
    }

    $container = this.$el.find('.hljs-container');
    $container.addClass(this.config.theme);

    // show either the code or an editable textarea
    if (this.editable) {
      $container.html('<textarea class="code hljs"></textarea>');
    } else {
      $container.html(
        '<pre class="hljs"><code>' +
        code +
        '</code></pre>'
      );
    }

    return this;
  };

  // Behave.js needs certain elements rendered before it can be initialized
  Highlightr.prototype.afterRender = function() {
    var $textarea = this.$el.find('textarea');

    $textarea.html(this.config.code);

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

    $textarea.autosize();

    // on blur of textarea, save contents to config
    $textarea.on('blur', function(e) {
      vi.trigger('setAttributes', {
        code: e.target.value
      });
    }.bind(this));

    return this;
  };

  // make Highlightr available to specs
  exports.Highlightr = Highlightr;

  var gadget = new Highlightr({
    el: document.querySelector('body'),
    config: {
      code: 'function awesome() {}',
      theme: 'default'
    }
  });

  gadget.initialize();

}());
