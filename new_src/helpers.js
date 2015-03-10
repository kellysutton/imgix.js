"format es6";
/* global window, document, navigator */

export default {
  debouncer: function (func, wait) {
    var timeoutRef;
    return function () {
      var self = this,
        args = arguments,
        later = function () {
          timeoutRef = null;
          func.apply(self, args);
        };

      window.clearTimeout(timeoutRef);
      timeoutRef = window.setTimeout(later, wait);
    };
  },

  mergeObject: function() {
    var obj = {},
      i = 0,
      il = arguments.length,
      key;

    for (; i < il; i++) {
      for (key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  },

  pixelRound: function (pixelSize, pixelStep) {
    return Math.ceil(pixelSize / pixelStep) * pixelStep;
  },

  isMobileDevice: function () {
    return (/iPhone|iPod|iPad/i).test(navigator.userAgent);
  },

  isNumber: function (value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },

  getZoom: function () {
    // http://stackoverflow.com/a/16091319/24998
    if (!document.createElementNS) {
      return 1;
    }
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('version', '1.1');
    document.body.appendChild(svg);
    var z = svg.currentScale || 1;
    document.body.removeChild(svg);
    return z;
  },

  getDPR: function () {
    var dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;

    if (dpr % 1 !== 0) {
      var tmpStr = '' + dpr;
      tmpStr = tmpStr.split('.')[1];
      dpr = (tmpStr.length > 1 && tmpStr.slice(1, 2) !== "0") ? dpr.toFixed(2) : dpr.toFixed(1);
    }

    return dpr;
  },

  getWindowWidth: function () {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0) || 1024;
  },

  getWindowHeight: function () {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0) || 768;
  },

  getImgSrc: function (elem) {
    return elem.getAttribute("data-src") || elem.getAttribute("src");
  },

  calculateElementSize: function (elem) {
    var val = {
      width: elem.offsetWidth,
      height: elem.offsetHeight
    };

    if (elem.parentNode === null || elem === document.body) {
      val.width = this.getWindowWidth();
      val.height = this.getWindowHeight();
      return val;
    }

    if (val.width !== 0 || val.height !== 0) {
      if (elem.alt && !elem.fluid) {
        elem.fluid = true;
        return this.calculateElementSize(elem.parentNode);
      }
      return val;
    } else {
      var found,
        prop,
        past = {},
        visProp = {position : "absolute", visibility : "hidden", display : "block"};

      for (prop in visProp) {
        if (visProp.hasOwnProperty(prop)) {
          past[prop] = elem.style[prop];
          elem.style[prop] = visProp[prop];
        }
      }

      found = val;

      for (prop in visProp) {
        if (visProp.hasOwnProperty(prop)) {
          elem.style[prop] = past[prop];
        }
      }

      if (found.width === 0 || found.height === 0) {
        return this.calculateElementSize(elem.parentNode);
      } else {
        return found;
      }
    }
  },

  isReallyObject: function(elem) {
    return elem && typeof elem === "object" && (elem + '') === '[object Object]';
  },

  isFluidSet: function(elem) {
    return elem && typeof elem === "object" && (elem + '') === '[object FluidSet]';
  },

  extractInt: function(str) {
    if (str === undefined) {
      return 0;
    } else if (typeof str === "number") {
      return str;
    }
    return parseInt(str.replace(/\D/g, ''), 10) || 0;
  },

  camelize: function(str) {
    return str.replace(/[-_\s]+(.)?/g, function(match, c){ return c ? c.toUpperCase() : ""; });
  },

  getElementCssProperty: function(elem, prop) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(elem, null).getPropertyValue(prop);
    } else {
      if (elem && elem.style && prop) {
        return elem.style[this.camelize(prop)];
      }
    }

    return '';
  }
};
