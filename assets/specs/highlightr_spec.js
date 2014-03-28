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
        el: document.body
      });

      it('should be true', function() {
        expect(true).to.equal(true);
      });
    });
  });
}());
