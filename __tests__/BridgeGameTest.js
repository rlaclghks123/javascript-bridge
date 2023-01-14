const BridgeGame = require('../src/model/BridgeGame');
const Bridge = require('../src/model/Bridge');

describe('getGameStatus Test', () => {
  let bridge;
  let bridgeGame;

  beforeEach(() => {
    bridge = new Bridge(3);
    bridgeGame = new BridgeGame(bridge);
  });

  test('gameStatus 기본값 Test', () => {
    expect(bridgeGame.getGameStatus()).toEqual('playing');
  });

  test('gameStatus Retry 했을때 다시 기본값이 되는지 Test', () => {
    bridgeGame.move('D');
    bridgeGame.retry();
    expect(bridgeGame.getGameStatus()).toEqual('playing');
  });
});
