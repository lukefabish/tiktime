import React from 'react';
import { expect } from 'chai';
import { TimerStore } from '../app/TimerStore.js';

describe('TimerStore', () => {
  describe('getDayStats', () => {
    it('is empty uninitialised', () => {
      expect(TimerStore.getDayStats()).to.have.length(0);
    });

    it('returns one element after execution of addToday()', () => {
      TimerStore.addToday();
      expect(TimerStore.getDayStats()).to.have.length(0);
    });
  });
});
