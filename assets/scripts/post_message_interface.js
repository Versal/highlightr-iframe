var exports = exports || {};

(function() {
  'use strict';

  // not available by default
  var each = Array.prototype.forEach;

  /**
   * @constructor
   * Wrapper for postMessage communication
   * between gadget and player
   */
  var VersalGadgetInterface = function() {
    var receiveMessage;
    var decodeEvent;

    /**
     * @private
     * @returns parsed JSON data
     */
    decodeEvent = function(event) {
      if (typeof(event.data) === 'string') {
        return JSON.parse(event.data);
      }
    };

    /**
     * @private
     * Handles the initial reception of post
     * messages and executing handler functions
     */
    receiveMessage = function(event) {
      var obj = decodeEvent(event);

      if (this.eventListeners[obj.event]) {
        each.call(this.eventListeners[obj.event], function(listener) {
          listener(obj.data);
        });
      }
    };

    this.eventListeners = {};

    /**
     * @public
     * Used to trigger a postMessage to the Player
     */
    this.trigger = function(event, data) {
      var obj = {
        event: event,
        data: data
      };

      window.parent.postMessage(JSON.stringify(obj), '*');
    };

    /**
     * @public
     * Used to add event listener for Player events
     */
    this.addEventListener = function(event, fn) {
      this.eventListeners[event] = this.eventListeners[event] || [];
      this.eventListeners[event].push(fn);
    };

    window.addEventListener('message', receiveMessage.bind(this));
  };

  exports.versalInterface = new VersalGadgetInterface();
}());
