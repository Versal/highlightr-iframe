var exports = exports || {};

(function() {
  'use strict';

  var vi = exports.versalInterface;

  var Highlightr = function(options) {
    this.$el = $(options.el);
    this.editable = false;
  };

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
        console.log(data);
        this.config = data;
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
    var code = hljs.highlightAuto(this.config.code).value;
    var $container;

    if (!this.$el.find('.hljs-container').length) {
      this.$el.append('<div class="hljs-container"></div>');
    }

    $container = this.$el.find('.hljs-container');
    $container.addClass(this.config.theme);

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

    $textarea.on('blur', function(e) {
      vi.trigger('setAttributes', {
        code: e.target.value
      });
      this.config.code = e.target.value;
      this.render();
      this.afterRender();
    }.bind(this));

    return this;
  };

  // make Highlightr available to specs
  exports.Highlightr = Highlightr;

  var gadget = new Highlightr({
    el: document.querySelector('body')
  });

  gadget.initialize();

}());
