const BridgeMaker = require('../BridgeMaker');
const { generate } = require('../BridgeRandomNumberGenerator');

class Bridge {
  #size;
  #bridgeStructure;

  constructor(size) {
    this.#size = size;
    this.#bridgeStructure = [];
  }

  makeBridge() {
    this.#bridgeStructure = BridgeMaker.makeBridge(this.#size, generate);
  }

  isAccessiblePosition(positionNumber, direction) {
    return this.#bridgeStructure[positionNumber] === direction;
  }

  isEndOfBridge(positionNumber) {
    return Number(this.#size) === positionNumber;
  }
}

module.exports = Bridge;
