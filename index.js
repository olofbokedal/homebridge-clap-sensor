const clapDetector = require('clap-detector');
let Service, Characteristic;

module.exports = function (homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory('homebridge-clap-sensor', 'ClapSensor', clapSensor);
};

function clapSensor(log, config) {
  this.log = log;
  this.name = config.name;
  this.numberOfClaps = config.numberOfClaps;
  this.clapInterval = config.clapInterval;
  this.resetAfter = config.resetAfter;
  this.clapDetectorConfig = config.clapDetectorConfig;
  this.clapDetected = false;
}

clapSensor.prototype = {

  getServices: function () {
    const informationService = new Service.AccessoryInformation();
    informationService
      .setCharacteristic(Characteristic.Manufacturer, 'Olof Bokedal')
      .setCharacteristic(Characteristic.Model, 'Homebridge Clap Sensor');

    this.service = new Service.MotionSensor(this.name);

    clapDetector.start(this.clapDetectorConfig);
    clapDetector.onClaps(this.numberOfClaps, this.clapInterval, () => {
      if (!this.clapDetected) {
        this.clapDetected = true;
        this.service.setCharacteristic(Characteristic.MotionDetected, this.clapDetected);

        setTimeout(() => {
          this.clapDetected = false;
          this.service.setCharacteristic(Characteristic.MotionDetected, this.clapDetected);
        }, this.resetAfter);
      }
    });

    return [informationService, this.service];
  }
  
};
