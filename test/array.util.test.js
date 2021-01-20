import { expect } from 'chai';

import { sortArrayByKeyDirection } from '../utilites/array.util';

describe('utils', () => {
  it('sortArrayByKeyDirection should return a sorted object list with a given key and direction', () => {
    const testList = [
      { name: 'A', key: 11 },
      { name: 'B', key: 55 },
      { name: 'C', key: 33 },
      { name: 'D', key: 22 },
      { name: 'E', key: 44 },
    ];

    const expected = [
      { name: 'A', key: 11 },
      { name: 'D', key: 22 },
      { name: 'C', key: 33 },
      { name: 'E', key: 44 },
      { name: 'B', key: 55 },
    ];

    const resultAsc = sortArrayByKeyDirection(testList, 'asc', 'key');
    const resultDesc = sortArrayByKeyDirection(testList, 'desc', 'key');
    const resultKey = sortArrayByKeyDirection(testList, null, 'key');

    expect(resultAsc).to.deep.equal(expected);
    expect(resultDesc).to.deep.equal(expected.reverse());
    expect(resultKey).to.deep.equal(testList);
  });
});
