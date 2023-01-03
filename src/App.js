const BridgeController = require('./controller/BridgeController');

class App {
  play() {
    const bridgeController = new BridgeController();
    bridgeController.start();
  }
}
const app = new App();
app.play();
module.exports = App;
