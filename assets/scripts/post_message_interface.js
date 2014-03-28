var exports = exports || {};

(function() {
  'use strict';

  var each = Array.prototype.forEach;

  var VersalGadgetInterface = function() {
    var receiveMessage;
    var decodeEvent;

    decodeEvent = function(event) {
      if (typeof(event.data) === 'string') {
        return JSON.parse(event.data);
      }
    };

    receiveMessage = function(event) {
      var obj = decodeEvent(event);

      if (this.eventListeners[obj.event]) {
        each.call(this.eventListeners[obj.event], function(listener) {
          listener(obj.data);
        });
      }
    };

    this.eventListeners = {};

    this.trigger = function(event, data) {
      var obj = {
        event: event,
        data: data
      };

      window.parent.postMessage(JSON.stringify(obj), '*');
    };

    this.addEventListener = function(event, fn) {
      this.eventListeners[event] = this.eventListeners[event] || [];
      this.eventListeners[event].push(fn);
    };

    window.addEventListener('message', receiveMessage.bind(this));
  };

  exports.versalInterface = new VersalGadgetInterface();
}());
