(function() {
  'use strict';

  describe('Highlightr prototype', function() {
    it('should have a prototype', function() {
      expect(exports).to.be.a('object');
      expect(exports.Highlightr).to.be.a('function');
      expect(exports.Highlightr.prototype.initialize).to.be.a('function');
    });
    
    describe('Highlightr instance', function() {
      var gadget = new exports.Highlightr({
        el: document.body,
        config: { code: 'function awesome() {}' }
      });

      gadget.initialize();

      it('not be editable initially', function() {
        expect(gadget.editable).to.equal(false);
      });

      it('should have a config', function() {
        expect(gadget.config).to.be.a('object');
        expect(gadget.config.code).to.equal('function awesome() {}');
      });

      it('should render', function(done) {
        window.postMessage({
          event: 'attributesChanged',
          data: {
            code: 'function() { var whoop; }',
            theme: 'default'
            }
        }, '*');

        window.postMessage({ event: 'attached' }, '*');

        this.timeout(500);

        setTimeout(function() {
          done();
        }, 250);
      });

      it('should have an updated config', function() {
        expect(gadget.config.theme).to.equal('default');
        expect(gadget.config.code).to.equal('function() { var whoop; }');
      });

      it('should have a code snippet', function() {
        expect($('pre.hljs').length).to.equal(1);
      });
    });
  });
}());
