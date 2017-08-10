const assert = require('assert');
const util = require('../app/timer-util.js');

describe('timer-util', () => {
  describe('zpad', () => {

    it('does not pad 10', () => {
      assert.equal('10', util.zpad(10));
    });

    it('pads 9', () => {
      assert.equal('09', util.zpad(9));
    });

    it('pads 0', () => {
      assert.equal('00', util.zpad(0));
    });

  });

  describe('timeStr function for turning seconds into mintes & seconds', () => {
    it('exists', () => {
      util.timeStr(0);
    });

    it('returns 00:00 for 0 seconds', () => {
      assert.equal(util.timeStr(0), '00:00');
    });

    it('returns 02:00 for 120 seconds', () => {
      assert.equal(util.timeStr(120), '02:00');
    });

    it('returns 02:01 for 121 seconds', () => {
      assert.equal(util.timeStr(121), '02:01');
    });
  })

  describe('hmsStr function for turning seconds into hours:mintes:seconds', () => {
    it('exists', () => {
      util.hmsStr(0);
    });

    it('returns 00:00:00 for 0 seconds', () => {
      assert.equal(util.hmsStr(0), '00:00:00');
    });

    it('returns 00:02:00 for 120 seconds', () => {
      assert.equal(util.hmsStr(120), '00:02:00');
    });

    it('returns 00:02:01 for 121 seconds', () => {
      assert.equal(util.hmsStr(121), '00:02:01');
    });

    it('returns 01:00:01 for 3601 seconds', () => {
      assert.equal(util.hmsStr(3601), '01:00:01');
    });

    it('returns 10:00:01 for 36001 seconds', () => {
      assert.equal(util.hmsStr(36001), '10:00:01');
    });
  })


  describe('hms function for returning seconds as an object of hours minutes & seconds', () => {
    it('exists', () => {
      util.hms(0);
    });
    
    it('returns 0,0,0 for 0 seconds', () => {
      let t = util.hms(0);
      assert.equal(t.h, 0);
      assert.equal(t.m, 0);
      assert.equal(t.s, 0);
    });
    
    it('returns 0, 2, 0 for 120 seconds', () => {
      let t = util.hms(120);
      assert.equal(t.h, 0);
      assert.equal(t.m, 2);
      assert.equal(t.s, 0);
    });

    it('returns 1, 0, 1 for 3601 seconds', () => {
      let t = util.hms(3601);
      assert.equal(t.h, 1);
      assert.equal(t.m, 0);
      assert.equal(t.s, 1);
    });
  })

  describe('todayStr function for returning today\'s date as YYYYMMDD', () => {
    it('exists', () => {
      util.todayStr();
    });

    it('returns 20200202 for 2020 Feb 2nd', () => {
      let d = new Date();
      d.setFullYear(2020, 1, 2);
      assert.equal(util.todayStr(d), '20200202');
    });

    it('returns 20201212 for 2020 Dec 12th', () => {
      let d = new Date();
      d.setFullYear(2020, 11, 12);
      assert.equal(util.todayStr(d), '20201212');
    });
  });

  describe('todayStrLess function for returning today\'s date less N days as YYYYMMDD', () => {
    it('exists', () => {
      let d = new Date();
      util.todayStrLess(d, 0);
    });

    it('returns 20200202 for 2020 Feb 2nd', () => {
      let d = new Date();
      d.setFullYear(2020, 1, 2);
      assert.equal(util.todayStrLess(d, 0), '20200202');
    });

    it('returns 20200130 for 2020 Feb 2nd less 3 days', () => {
      let d = new Date();
      d.setFullYear(2020, 1, 2);
      assert.equal(util.todayStrLess(d, 3), '20200130');
    });

    it('returns 20201211 for 2020 Dec 12th less one day', () => {
      let d = new Date();
      d.setFullYear(2020, 11, 12);
      assert.equal(util.todayStrLess(d, 1), '20201211');
    });

  });
});
