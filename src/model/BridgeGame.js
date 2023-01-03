const { GAME_STATUS } = require('../utils/message');

/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #bridge;
  #position;
  #gameStatus;

  constructor(bridge) {
    this.#bridge = bridge;
    this.#position = 0;
    this.#gameStatus = GAME_STATUS.playing;
  }

  getGameStatus() {
    return this.#gameStatus;
  }

  move(direction) {
    const isMove = this.#isMove(direction);

    if (isMove) {
      this.#position += 1;
      this.#gameStatus = this.#bridge.isEndOfBridge(this.#position)
        ? GAME_STATUS.win
        : GAME_STATUS.playing;
    } else {
      this.#gameStatus = GAME_STATUS.fail;
    }
    return { moveSuccess: isMove, gameStatus: this.#gameStatus };
  }

  #isMove(direction) {
    return this.#bridge.isAccessiblePosition(this.#position, direction);
  }

  retry() {
    this.#position = 0;
    this.#gameStatus = GAME_STATUS.playing;
  }
}

module.exports = BridgeGame;
