/* eslint-env mocha */

import fs from 'fs';

import expect from 'expect';


describe('Snapshots', () => {
  describe('basic functionality', () => {
    it('should handle a string snapshot', () => {
      expect('test').toMatchSnapshot();
    });

    it('should handle an object snapshot', () => {
      expect({ object: ['array'] }).toMatchSnapshot();
    });

    it('should throw for multiple unnamed snapshots', () => {
      expect(() => {
        expect('test').toMatchSnapshot();
        expect('test').toMatchSnapshot();
      }).toThrow(/more than one unnamed snapshot/);
    });

    it('should handle multiple named snapshots', () => {
      expect('test').toMatchSnapshot('first');
      expect('test2').toMatchSnapshot('second');
      expect('test3').toMatchSnapshot('third');
    });

    it('should handle multiple snapshots with the same name', () => {
      expect('test').toMatchSnapshot('same');
      expect('test').toMatchSnapshot('same');
    });

    it('should handle multiple snapshots with the same name but different values', () => {
      expect(() => {
        expect('test').toMatchSnapshot('same');
        expect('test2').toMatchSnapshot('same');
      }).toThrow();
    });

    it('should handle a named and an unnamed snapshots', () => {
      expect('test').toMatchSnapshot();
      expect('test2').toMatchSnapshot('same');
    });

    it('should handle multiline strings', () => {
      expect('test\ntest2\ntest3').toMatchSnapshot();
    });

    it('should handle special template literal characters', () => {
      expect('${value} ${4 + 2} \\u00A9 \\u{2F804} \\xA9 \\251').toMatchSnapshot();
    });
  });

  describe('pre-existing snapshots', () => {
    it('should throw if there\'s a mismatch with a pre-existing snapshot', () => {
      expect(() => {
        expect('test').toMatchSnapshot();
      }).toThrow(/pre-existing first/);
    });

    it('should throw if there\'s a mismatch with a pre-existing named snapshot', () => {
      expect(() => {
        expect('test').toMatchSnapshot('named');
      }).toThrow(/pre-existing second/);
    });
  })
});
