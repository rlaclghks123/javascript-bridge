const { Console } = require('@woowacourse/mission-utils');

const BridgeGame = require('../model/BridgeGame');
const Bridge = require('../model/Bridge');
const History = require('../model/History');

const InputView = require('../view/InputView');
const OutputView = require('../view/OutputView');

const Validate = require('../utils/Validate');
const HandleValidate = require('../utils/handleValidate');
const { COMMAND } = require('../utils/constants');
const { GAME_STATUS } = require('../utils/message');

class BridgeController {
  #bridgeGame;
  #history;

  start() {
    OutputView.printStart();
    this.requestBridgeSize();
  }

  requestBridgeSize() {
    InputView.readBridgeSize(this.checkBridgeSize.bind(this));
  }

  checkBridgeSize(size) {
    if (!HandleValidate.checkValidate(Validate.validateSizeRange, Number(size))) {
      return this.requestBridgeSize();
    }

    this.setGame(size);
  }

  setGame(size) {
    const bridge = new Bridge(size);
    bridge.makeBridge();
    this.#bridgeGame = new BridgeGame(bridge);
    this.#history = new History();

    OutputView.printLineBreak();
    this.requestBridgeMovemoment();
  }

  requestBridgeMovemoment() {
    InputView.readMoving(this.checkMoving.bind(this));
  }

  checkMoving(direction) {
    if (!HandleValidate.checkValidate(Validate.validateCrossDirection, direction)) {
      return this.requestBridgeMovemoment();
    }
    this.playGame(direction);
  }

  playGame(direction) {
    const { moveSuccess, gameStatus } = this.#bridgeGame.move(direction);
    OutputView.printMap(this.#history.updateMoveTrace(direction, moveSuccess));

    this.handleMove(gameStatus);
  }

  handleMove(gameStatus) {
    if (gameStatus === GAME_STATUS.win) {
      OutputView.printResult(this.#history.getHistory(), gameStatus);
      Console.close();
    } else if (gameStatus === GAME_STATUS.fail) {
      this.requestGameCommand();
    } else if (gameStatus === GAME_STATUS.playing) {
      this.requestBridgeMovemoment();
    }
  }

  requestGameCommand() {
    InputView.readGameCommand(this.checkGameCommand.bind(this));
  }

  checkGameCommand(command) {
    if (!HandleValidate.checkValidate(Validate.validateRetryOfQuit, command)) {
      return this.requestGameCommand();
    }

    this.handleGameCommand(command);
  }

  handleGameCommand(command) {
    if (command === COMMAND.retry) {
      this.handleRestart();
    } else if (command === COMMAND.quit) {
      this.handleQuit();
    }
  }

  handleRestart() {
    this.#bridgeGame.retry();
    this.#history.resetHistory();

    this.requestBridgeMovemoment();
  }

  handleQuit() {
    OutputView.printResult(this.#history.getHistory(), this.#bridgeGame.getGameStatus());
    Console.close();
  }
}
module.exports = BridgeController;
