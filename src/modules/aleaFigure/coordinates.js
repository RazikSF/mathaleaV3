import { texNombre2 } from '../../modules/outils.js'
import { round } from 'mathjs'
/**
  * @class for coordinates
  */
export class GVCoordinates {
  r = 0
  x = 0
  y = 0
  theta = 0
  getCartesianCoordinates () {
    if (this instanceof GVPolar) {
      return new GVCartesian(this.r * Math.cos(this.theta), this.r * Math.sin(this.theta))
    } else {
      return this
    }
  }

  getPolarCoordinates () {
    if (this instanceof GVCartesian) {
      return new GVPolar(Math.sqrt(this.x ** 2 + this.y ** 2), Math.atan(this.y / this.x))
    } else {
      return this
    }
  }

  format () {
    return `(${texNombre2(round(this.x, 3))}{;}${texNombre2(round(this.y, 3))})`.replaceAll(',', '{,}').replaceAll('{{,}}', '{,}')
  }
}
/**
      * @class for cartesian coordinates
      */
export class GVCartesian extends GVCoordinates {
  constructor (x, y) {
    super()
    this.x = x
    this.y = y
  }

  format () {
    return `(${texNombre2(round(this.x, 3))}{;}${texNombre2(round(this.y, 3))})`.replaceAll(',', '{,}').replaceAll('{{,}}', '{,}')
  }
}
/**
      * @class for polar coordinates
      */
export class GVPolar extends GVCoordinates {
  constructor (r, theta) {
    super()
    this.r = r
    this.theta = theta
  }

  format () {
    return `(${texNombre2(round(this.r, 3))}{;}${texNombre2(round(this.theta, 3))})`.replaceAll(',', '{,}').replaceAll('{{,}}', '{,}')
  }
}
// # sourceMappingURL=coordinates.js.map
