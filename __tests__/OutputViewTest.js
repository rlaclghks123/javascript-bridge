const OutputView = require('../src/view/OutputView');

describe('', () => {
  test('', () => {
    const targetMoving = 'U';
    const moveTrace = { direction: 'U', moveSuccess: true };
    expect(OutputView.convertToMap(targetMoving, moveTrace)).toBe('O');
  });

  test('', () => {
    const targetMoving = 'U';
    const moveTrace = { direction: 'D', moveSuccess: true };
    expect(OutputView.convertToMap(targetMoving, moveTrace)).toBe(' ');
  });

  test('', () => {
    const targetMoving = 'D';
    const moveTrace = { direction: 'D', moveSuccess: false };
    expect(OutputView.convertToMap(targetMoving, moveTrace)).toBe('X');
  });

  test('', () => {
    const targetMoving = 'D';
    const moveTrace = { direction: 'U', moveSuccess: true };
    expect(OutputView.convertToMap(targetMoving, moveTrace)).toBe(' ');
  });
});
