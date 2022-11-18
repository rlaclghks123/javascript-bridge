const { Console } = require('@woowacourse/mission-utils');
/**
 * 사용자에게 게임 진행 상황과 결과를 출력하는 역할을 한다.
 */
let upBridge = '';
let downBridge = '';

const OutputView = {
  /**
   * 현재까지 이동한 다리의 상태를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printMap(moveBridge, bridgePositon) {
    if (bridgePositon === 0) {
      upBridge += moveBridge[0];
      downBridge += moveBridge[1];
    } else if (bridgePositon !== 0) {
      upBridge += ` | ${moveBridge[0]}`;
      downBridge += ` | ${moveBridge[1]}`;
    }

    Console.print(`[ ${upBridge} ]`);
    Console.print(`[ ${downBridge} ]`);
  },

  /**
   * 게임의 최종 결과를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printResult() {},

  printStartAnnouncement() {
    Console.print('다리 건너기 게임을 시작합니다.');
  },

  printErrorMessage(error) {
    Console.print(error);
  },
};

module.exports = OutputView;
