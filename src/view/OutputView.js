const { Console } = require('@woowacourse/mission-utils');
const { DIRECTION, CROSSING_RESULT } = require('../utils/constants');
const { START_MESSAGE, RESULT_MESSAGE } = require('../utils/message');

/**
 * 사용자에게 게임 진행 상황과 결과를 출력하는 역할을 한다.
 */

const OutputView = {
  printStart() {
    Console.print(START_MESSAGE);
  },

  printNewLine() {
    Console.print('');
  },

  printErrorMessage(error) {
    Console.print(error);
  },

  printLineBreak() {
    Console.print('');
  },

  printMap(moveTrace) {
    Console.print(`[ ${this.getUpperMap(moveTrace).join(' | ')} ]`);
    Console.print(`[ ${this.getLowerMap(moveTrace).join(' | ')} ]`);
    this.printNewLine();
  },

  getUpperMap(moveTrace) {
    return moveTrace.map((trace) => this.convertToMap(DIRECTION.up, trace));
  },

  getLowerMap(moveTrace) {
    return moveTrace.map((trace) => this.convertToMap(DIRECTION.down, trace));
  },

  convertToMap(targetMoving, { direction, moveSuccess }) {
    if (targetMoving !== direction) {
      return DIRECTION.nothing;
    }
    return moveSuccess ? CROSSING_RESULT.success : CROSSING_RESULT.fail;
  },

  printResult({ tryCount, moveTrace }, gameStatus) {
    Console.print(RESULT_MESSAGE.finalGameResult);
    this.printMap(moveTrace);
    Console.print(RESULT_MESSAGE[gameStatus]);
    Console.print(RESULT_MESSAGE.try + tryCount);
  },
};

module.exports = OutputView;
