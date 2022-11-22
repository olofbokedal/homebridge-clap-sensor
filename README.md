# homebridge-clap-sensor

A plugin for [Homebridge](https://github.com/nfarina/homebridge/) which provides a sensor for detecting claps.

This is actually exposed as a motion sensor within HomeKit, but it doesn't really matter since its basically the same thing. Detection can be used for triggering scenarios of your liking, such as turning of the lights when clapping twice.


## Dependencies

Dependens on [clap-detector](https://github.com/tom-s/clap-detector), which is automatically installed via npm. Clap detector in turn requires sox, which should be installed for your system before proceeding with the installation of this plugin.

Please see the README for [clap-detector](https://github.com/tom-s/clap-detector#readme) for further details regarding its dependencies in general and sox in particular.


## Installation

Install this plugin globally:

```
npm install -g homebridge-clap-sensor
```


## Configuration

Add the following to the `accessories` part of your Homebridge `settings.json` file:

```
{
    "accessory": "ClapSensor",
    "name": "My clap sensor",
    "numberOfClaps": 2,
    "clapInterval": 2000,
    "resetAfter": 5000,
    "clapDetectorConfig": {
        "AUDIO_SOURCE": "alsa hw:1,0",
        "CLAP_AMPLITUDE_THRESHOLD": 0.7,
        "CLAP_ENERGY_THRESHOLD": 0.5
    }
}
```
### Options explained

- **accessory**: Has to be `ClapSensor`.
- **name**: Name of the sensor as it appears in HomeKit.
- **numberOfClaps** and **clapInterval**: How many claps that should be detected within the interval (milliseconds) in order for the sensor to trigger.
- **resetAfter**: The time (in milliseconds) it should take for the sensor to get back to its normal state, starting to listening for further claps.
- **clapDetectorConfig**: An object with options that are passed to the clap-detector plugin. Please refer to the [README for clap-detector](https://github.com/tom-s/clap-detector#configuration) for details.
