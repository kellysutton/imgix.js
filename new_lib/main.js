"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var helpers = _interopRequire(require("helpers"));

console.log(helpers.pixelRound(100, 5));
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
