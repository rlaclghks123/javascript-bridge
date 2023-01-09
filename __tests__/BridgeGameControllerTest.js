const BridgeController = require('../src/controller/BridgeController');

describe('', () => {
  test('', () => {
    const bridgeController = new BridgeController();

    const spyFn = jest.spyOn(bridgeController, 'requestGameCommand');
    bridgeController.handleMove('fail');
    expect(spyFn).toHaveBeenCalledTimes(1);
  });

  test('', () => {
    const bridgeController = new BridgeController();

    const spyFn = jest.spyOn(bridgeController, 'requestBridgeMovemoment');
    bridgeController.handleMove('playing');
    expect(spyFn).toHaveBeenCalledTimes(1);
  });

  test('', () => {
    const bridgeController = new BridgeController();

    const spyFn = jest.spyOn(bridgeController, 'requestGameCommand');
    bridgeController.checkGameCommand('U');
    handleGameCommand = jest.fn().mockImplementation(() => true);
    expect(spyFn).toHaveBeenCalledTimes(1);
  });
  test('', () => {
    const bridgeController = new BridgeController();
    jest.spyOn(bridgeController, 'handleQuit').mockReturnValue(true);
    jest.spyOn(bridgeController, 'handleRestart').mockReturnValue(true);
    const spyFn = jest.spyOn(bridgeController, 'handleGameCommand');
    bridgeController.checkGameCommand('R');
    handleGameCommand = jest.fn().mockImplementation(() => true);
    expect(spyFn).toHaveBeenCalledTimes(1);
  });

  test('', () => {
    const bridgeController = new BridgeController();
    jest.spyOn(bridgeController, 'handleQuit').mockReturnValue(true);
    jest.spyOn(bridgeController, 'handleRestart').mockReturnValue(true);
    bridgeController.handleGameCommand('R');
    const spyFn = jest.spyOn(bridgeController, 'handleRestart');

    expect(spyFn).toHaveBeenCalledTimes(1);
  });

  test('', () => {
    const bridgeController = new BridgeController();
    jest.spyOn(bridgeController, 'handleQuit').mockReturnValue(true);
    jest.spyOn(bridgeController, 'handleRestart').mockReturnValue(true);
    bridgeController.handleGameCommand('Q');
    const spyFn = jest.spyOn(bridgeController, 'handleQuit');

    expect(spyFn).toHaveBeenCalledTimes(1);
  });
});
