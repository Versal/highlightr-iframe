var exports = exports || {};

// oh my god, Function.prototype.bind doesn't exist in PhantomJS
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== "function" ) {
      throw new TypeError(
        "Function.prototype.bind - what is trying to be bound" +
        "is not callable."
      );
    }

    var aArgs = Array.prototype.slice.call(arguments, 1);
    var fToBind = this;
    var fNOP = function() {};
    var fBound = function() {
      return fToBind.apply(this instanceof fNOP && oThis ?
                           this :
                           oThis,
                           aArgs.concat(Array.prototype.slice.call(arguments))
                          );
    };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

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

  exports.versalInterface = VersalGadgetInterface;
}());
