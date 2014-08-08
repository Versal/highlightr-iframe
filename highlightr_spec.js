(function() {
  'use strict';

  describe('Highlightr prototype', function() {

    before(function() {
      $(document.body).append('<link rel="stylesheet" id="highlightStylesheet">');
    });

    it('should have a prototype', function() {
      expect(Highlightr).to.be.a('function');
      expect(Highlightr.prototype.initialize).to.be.a('function');
    });

    describe('Highlightr instance', function() {
      var gadget = new Highlightr({
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