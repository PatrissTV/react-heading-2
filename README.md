# react-heading-2
This class calculates the magnetic north and inclination of your device in React Native, only using Magnetometer and Acceleration data.

## Installation

```
npm i react-heading-2
```

## Usage
Import the following packages.

```
import React from 'react';
import { Magnetometer, DeviceMotion } from 'expo-sensors';
let ReactHeading = require('react-heading-2');
```

Fetch the data from the Magnetometer and Devicemotion libraries using listeners.

```
let magnet = Magnetometer //data from listener
let gyroscope = DeviceMotion.accelerationIncludingGravity; 

```

In order to calculate the heading and inclination, call the following functions with the magnet and gyroscope data like shown below.

```
let heading = ReactHeading._getHeading(magnet,gyroscope);
let inclination = ReactHeading._getInclination(gyroscope);

```

## Example

Here is an example which shows a Text component containing the device heading each 50ms.

```
import React from 'react';
import { Magnetometer, DeviceMotion } from 'expo-sensors';
let ReactHeading = require('react-heading-2');

export default class TextWithHeading extends React.Component {

  state = {
    MagnetometerData: {},
    GyroscopeData:{
      accelerationIncludingGravity:{}
    },
  };

  componentDidMount() {
    this._subscribe();
    Magnetometer.setUpdateInterval(50);
  }

  _subscribe = () => {
    this._subscription = Magnetometer.addListener(result => {
      this.setState({ MagnetometerData: result });
    });

    this._subscription2 = DeviceMotion.addListener(result => {
      this.setState({ GyroscopeData: result });
    });
  };

  render() {
    let gyroscope = this.state.GyroscopeData.accelerationIncludingGravity;
    let magnet = this.state.MagnetometerData;
    let heading = ReactHeading._getHeading(magnet,gyroscope);
    let inclination = ReactHeading._getInclination(gyroscope);
    return(<Text>{heading}</Text>); // or inclination
  }

}

```
