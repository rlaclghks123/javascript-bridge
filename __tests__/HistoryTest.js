const History = require('../src/model/History');

describe('tryCount Test', () => {
  test('Initial tryCount Test', () => {
    const history = new History();
    expect(history.getHistory()).toEqual({ moveTrace: [], tryCount: 1 });
  });

  test('4번 시도후 tryCount Test', () => {
    const history = new History();
    history.resetHistory();
    history.resetHistory();
    history.resetHistory();
    expect(history.getHistory()).toEqual({ moveTrace: [], tryCount: 4 });
  });
});
