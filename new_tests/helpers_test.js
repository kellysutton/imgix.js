/* global navigator */

import helpers from '../new_src/helpers';

describe('helpers', () => {
  describe('.mergeObject', () => {
    it('merges two empty objects', () => {
      let a = {};
      let b = {};

      expect(helpers.mergeObject(a, b)).toEqual({});
    });

    it('merges multiple empty objects', () => {
      let a = {};
      let b = {};
      let c = {};

      expect(helpers.mergeObject(a, b, c)).toEqual({});
    });

    it('merges three non-empty objects', () => {
      let a = { a: 1 };
      let b = { b: 2 };
      let c = { c: 3 };

      expect(helpers.mergeObject(a, b, c)).toEqual({
        a: 1,
        b: 2,
        c: 3
      });
    });

    it('is an identity function when the second parameter is null', () => {
      let a = { a: 1 };
      let b = null;

      expect(helpers.mergeObject(a, b)).toEqual(a);
    });

    it('is an identity function when the second parameter is undefined', () => {
      let a = { a: 1 };
      let b = undefined;

      expect(helpers.mergeObject(a, b)).toEqual(a);
    });
  });

  describe('.pixelRound', () => {
    it('rounds up', () => {
      let width = 198;
      let step = 5;

      expect(helpers.pixelRound(width, step)).toEqual(200);
    });

    it('stays put when evenly divisible by the pixel step', () => {
      let width = 195;
      let step = 5;

      expect(helpers.pixelRound(width, step)).toEqual(195);
    });

    it('rounds up when over the number', () => {
      let width = 195.0001;
      let step = 5;

      expect(helpers.pixelRound(width, step)).toEqual(200);
    });
  });

  describe('.isMobileDevice', () => {
    it('is false by default', () => {
      expect(helpers.isMobileDevice()).toBe(false);
    });

    xit('is true when on an iPhone', () => {
      expect(navigator).not.toBe(null);
      expect(navigator.userAgent).toEqual("balls");
      navigator.userAgent = "Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.12 Mobile/11A465 Safari/8536.25 (3B92C18B-D9DE-4CB7-A02A-22FD2AF17C8F)";
      expect(helpers.isMobileDevice()).toBe(true);
    });
  });

  describe('.isNumber', () => {
    it('works', () => {
      expect(helpers.isNumber(1)).toBe(true);
      expect(helpers.isNumber(1.01)).toBe(true);
      expect(helpers.isNumber(NaN)).toBe(false);
      expect(helpers.isNumber(undefined)).toBe(false);
      expect(helpers.isNumber(null)).toBe(false);
      expect(helpers.isNumber("string")).toBe(false);
      expect(helpers.isNumber({ a: 1 })).toBe(false);
      expect(helpers.isNumber([1, 2, 3])).toBe(false);
    });
  });

  describe('.getZoom', () => {
    it('returns 1 by default', () => {
      expect(helpers.getZoom()).toEqual(1);
    });

    xit('reports the correct zoom level');
  });

  describe('.getDPR', () => {
    it('returns 1 by default', () => {
      expect(helpers.getDPR()).toEqual(1);
    });

    it('returns 2 when the dpr is 2', () => {
      window.devicePixelRatio = 2;
      expect(helpers.getDPR()).toEqual(2);
    });

    it('returns a string of the dpr when it is a fraction', () => {
      window.devicePixelRatio = 1.5;
      expect(helpers.getDPR()).toEqual("1.5");
    });
  });

  describe('.getImgSrc', () => {
    var element;

    beforeEach(() => {
      element = document.createElement('img');
    });

    afterEach(() => {
      element = null;
    });

    it('prefers the data-src to the normal src', () => {
      let dataSrc = "https://dogs.com";
      let src = "https://cats.com";

      element.setAttribute('data-src', dataSrc);
      element.setAttribute('src', src);

      expect(helpers.getImgSrc(element)).toEqual(dataSrc);

      element.removeAttribute('data-src');

      expect(helpers.getImgSrc(element)).toEqual(src);
    });
  });

  describe('.isReallyObject', () => {
    it('works', () => {
      expect(helpers.isReallyObject(1)).toBe(false);
      expect(helpers.isReallyObject(1.06)).toBe(false);
      expect(helpers.isReallyObject(false)).toBe(false);
      expect(helpers.isReallyObject(true)).toBe(false);
      expect(helpers.isReallyObject([])).toBe(false);
      expect(helpers.isReallyObject({})).toBe(true);
    });
  });

  describe('.extractInt', () => {
    it('returns 0 if str is undefined', () => {
      expect(helpers.extractInt(undefined)).toEqual(0);
    });

    it('returns the number if str is a number', () => {
      expect(helpers.extractInt(1)).toEqual(1);
      expect(helpers.extractInt(1.05)).toEqual(1.05);
    });

    it('parses the number out of a boring string', () => {
      expect(helpers.extractInt("10")).toEqual(10);
    });

    it('parses the number out of a str suffixed with "px"', () => {
      expect(helpers.extractInt("10px")).toEqual(10);
    });

    xit('parses the decimal number out of a str suffixed with "px"', () => {
      expect(helpers.extractInt("10.5px")).toEqual(10.5);
    });
  });

  describe('.isFluidSet', () => {
    it('not yet tested');
  });

  describe('.camelize', () => {
    it('camelizes something with spaces', () => {
      expect(helpers.camelize("hi john")).toEqual("hiJohn");
    });

    it('camelizes something with underscores', () => {
      expect(helpers.camelize("hi_john")).toEqual("hiJohn");
    });

    it('camelizes something with dashes', () => {
      expect(helpers.camelize("hi-john")).toEqual("hiJohn");
    });

    it('does nothing to something that is already camelized', () => {
      expect(helpers.camelize("hiJohn")).toEqual("hiJohn");
    });

    xit('downcaps the first letter if capitalized', () => {
      expect(helpers.camelize("HiJohn")).toEqual("hiJohn");
    });

    xit('camelizes something with en dashes', () => {
      expect(helpers.camelize("hi–john")).toEqual("hiJohn");
    });

    xit('camelizes something with em dashes', () => {
      expect(helpers.camelize("hi—john")).toEqual("hiJohn");
    });
  });

  describe('.getElementCssProperty', () => {
    it('is not yet tested');
  });
});
