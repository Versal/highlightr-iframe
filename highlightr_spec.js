(function() {
  'use strict';

  describe('Highlightr prototype', function() {

    before(function() {
      $(document.body).append('<link rel="stylesheet" id="highlightStylesheet">');
    });

    describe('Highlightr instance', function() {
      var gadget = new Highlightr;
      document.body.appendChild(gadget.getEl());

      it('not be editable initially', function() {
        expect(gadget.editable).to.equal(false);
      });

      it('should have a config', function() {
        expect(gadget.config).to.be.a('object');
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
          expect(gadget.config.theme).to.equal('default');
          expect(gadget.config.code).to.equal('function() { var whoop; }');
          expect($('pre.hljs').length).to.equal(1);
          done();
        }, 100);
      });
    });
  });
}());
