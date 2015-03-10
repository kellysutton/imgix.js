"use strict";

/* global window */

module.exports = {
  debouncer: function debouncer(func, wait) {
    var timeoutRef;
    return function () {
      var self = this,
          args = arguments,
          later = function later() {
        timeoutRef = null;
        func.apply(self, args);
      };

      window.clearTimeout(timeoutRef);
      timeoutRef = window.setTimeout(later, wait);
    };
  },

  pixelRound: function pixelRound(pixelSize, pixelStep) {
    return Math.ceil(pixelSize / pixelStep) * pixelStep;
  }
};