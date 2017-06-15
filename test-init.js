/* eslint-env mocha */

import expect from 'expect';

import { getValueForAssertion, loadAll, saveAll } from '.';


let currentTest;

before(() => {
  loadAll();
});

after(() => {
  saveAll();
});

beforeEach(function () {
  currentTest = this.currentTest;
});

expect.extend({
  toMatchSnapshot(name = '') {
    const { actual } = this;
    const value = getValueForAssertion({
      testPath: currentTest.file,
      testName: currentTest.fullTitle(),
      name,
      expected: actual,
    });

    expect(actual).toEqual(value);

    return this;
  },
});
