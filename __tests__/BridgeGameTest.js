const BridgeGame = require('../src/model/BridgeGame');
const Bridge = require('../src/model/Bridge');

describe('getGameStatus Test', () => {
  test('gameStatus 기본값 Test', () => {
    const bridge = new Bridge(3);
    const bridgeGame = new BridgeGame(bridge);

    expect(bridgeGame.getGameStatus()).toEqual('playing');
  });

  test('gameStatus Retry 했을때 다시 기본값이 되는지 Test', () => {
    const bridge = new Bridge(3);
    const bridgeGame = new BridgeGame(bridge);
    bridgeGame.move('D');
    bridgeGame.retry();
    expect(bridgeGame.getGameStatus()).toEqual('playing');
  });
});
