//this.state.GyroscopeData.accelerationIncludingGravity
//

class ReactHeading{
  static _SphericalCoordinates = (obj) => {
    let {x, y, z} = obj;
    let xpi = 180/Math.PI;
    let psi = Math.atan(y/x)*xpi;
    let teta = Math.atan(z/Math.sqrt(Math.pow(x,2)+Math.pow(y,2)))*xpi;
    return {psi, teta};
  }

  static _getInclination = (accelerationIncludingGravity) => { //Get Altitude with acceleration of Gravity
    let {x,y,z} = accelerationIncludingGravity;
    let angle = 90-Math.acos((z)/(Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2))))*180/Math.PI;
    return angle;
  }

  static _azMagnet2 = (magnetometerData,accelerationIncludingGravity) => {
    let m = this._vectorOnPlane(magnetometerData,accelerationIncludingGravity);
    let y = this._vectorOnPlane({x:0,y:1,z:0},accelerationIncludingGravity);

    let scprdct = (m.x*y.x + m.y*y.y + m.z*y.z);
    let mod1 = Math.sqrt(Math.pow(m.x,2)+Math.pow(m.y,2)+Math.pow(m.z,2));
    let mod2 = Math.sqrt(Math.pow(y.x,2)+Math.pow(y.y,2)+Math.pow(y.z,2));
    let angle = Math.acos(scprdct/(mod1*mod2))*180/Math.PI;


    var angle2 = angle;
    if(m.x>0){
      angle = 360 - angle;
    }
    return angle;
  }

  static _vectorOnPlane = (obj,a) => {
    let n = a;
    let v = obj;

    let mod = Math.sqrt(Math.pow(n.x,2)+Math.pow(n.y,2)+Math.pow(n.z,2));
    let scprdct = (n.x*v.x + n.y *v.y + n.z*v.z)/mod;

    let x = v.x - scprdct*(n.x/mod);
    let y = v.y - scprdct*(n.y/mod);
    let z = v.z - scprdct*(n.z/mod);

    return {x,y,z};
  }

  static _getHeading = (magnetometerData,accelerationIncludingGravity) => {
    return this._azMagnet2(magnetometerData,accelerationIncludingGravity);
  }
}

module.exports = ReactHeading;
