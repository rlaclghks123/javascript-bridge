const BridgeGame = require('../model/BridgeGame');
const OutputView = require('../OutputView');
const BridgeMaker = require('../BridgeMaker.js');
const BridgeRandomNumberGenerator = require('../BridgeRandomNumberGenerator.js');
const InputView = require('../InputView');
const Validate = require('../utils/Validate');
const { Console } = require('@woowacourse/mission-utils');

class BridgeController {
  #bridgeGame;

  constructor() {
    this.#bridgeGame = new BridgeGame();
  }

  start() {
    OutputView.printStartAnnouncement();
    this.requestBridgeSize();
  }

  requestBridgeSize() {
    InputView.readBridgeSize(this.createBridge.bind(this));
  }

  createBridge(size) {
    if (!this.controlValidate(Validate.validateSizeRange, Number(size))) {
      return this.requestBridgeSize();
    }
    const bridge = BridgeMaker.makeBridge(Number(size), BridgeRandomNumberGenerator.generate);
    this.#bridgeGame.updateBridge(bridge);

    OutputView.printLineBreak();
    this.requestBridgeMovemoment();
  }

  requestBridgeMovemoment() {
    InputView.readMoving(this.controlMovemoment.bind(this));
  }

  controlMovemoment(movePosition) {
    if (!this.controlValidate(Validate.validateMovePosition, movePosition)) {
      return this.requestBridgeMovemoment();
    }

    this.#bridgeGame.selectMovemomentPosition(movePosition);
    const drawBridge = this.getDrawBridge();
    OutputView.printMap(drawBridge);

    this.controlNextStep(drawBridge);
  }

  getDrawBridge() {
    const moveBridge = this.#bridgeGame.move();
    return this.drawBridge(moveBridge);
  }

  drawBridge(moveBridge) {
    const bridge = { upBridge: '', downBridge: '' };
    moveBridge.forEach((position) => {
      bridge.upBridge += ` | ${position[0]}`;
      bridge.downBridge += ` | ${position[1]}`;
    });
    bridge.upBridge = `[ ${[...bridge.upBridge].splice(3).join('')} ]`;
    bridge.downBridge = `[ ${[...bridge.downBridge].splice(3).join('')} ]`;
    return bridge;
  }

  controlNextStep(drawBridge) {
    if (drawBridge.upBridge.includes('X') || drawBridge.downBridge.includes('X')) {
      return this.requestGameCommand();
    }

    if (this.#bridgeGame.isSuccess()) return this.controlFinish('성공');

    return this.requestBridgeMovemoment();
  }

  requestGameCommand() {
    InputView.readGameCommand(this.controlGameCommand.bind(this));
  }

  controlGameCommand(input) {
    if (!this.controlValidate(Validate.validateRetryOfQuit, input)) {
      return this.requestGameCommand();
    }

    if (input === 'R') return this.#bridgeGame.retry() || this.requestBridgeMovemoment();
    return this.controlFinish('실패');
  }

  controlFinish(result) {
    const attemps = this.#bridgeGame.getNumberOfAttempts();
    const drawBridge = this.getDrawBridge();
    return OutputView.printResult(drawBridge, result, attemps) || Console.close();
  }

  controlValidate(validate, input) {
    try {
      validate(input);
      return true;
    } catch (error) {
      OutputView.printErrorMessage(error);
      return false;
    }
  }
}
module.exports = BridgeController;
