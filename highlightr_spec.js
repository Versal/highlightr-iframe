(function() {
  'use strict';

  describe('Highlightr prototype', function() {

    before(function() {
      $(document.body).append('<link rel="stylesheet" id="highlightStylesheet">');
    });

    describe('Highlightr instance', function() {
      var gadget = new Highlightr;
      document.body.appendChild(gadget.getEl());

      // TODO: don't look at private variables, but at the HTML output instead

      it('not be editable initially', function() {
        expect(gadget._editable).to.equal(false);
      });

      it('should have a config', function() {
        expect(gadget._config).to.be.a('object');
      });

      it('should update the config', function(done) {
        window.postMessage({
          event: 'attributesChanged',
          data: {
            code: 'function() { var whoop; }',
            theme: 'default'
          }
        }, '*');

        setTimeout(function() {
          expect(gadget._config.theme).to.equal('default');
          expect(gadget._config.code).to.equal('function() { var whoop; }');
          expect($('pre.hljs').length).to.equal(1);
          done();
        }, 100);
      });
    });
  });
}());
