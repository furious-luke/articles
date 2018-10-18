import {isNil} from './utils'

export default class Camera {
  constructor(width, height) {
    this.initialise(width, height)
  }

  initialise(width, height) {
    if (isNil(width)) {
      width = window.innerWidth
    }
    if (isNil(height)) {
      height = window.innerHeight
    }
	  const scaler = (width < height) ? width : height
    this.width   = width
    this.height  = height
    this.ppp     = 0.5 * scaler
	  this.pppInv  = 1.0 / this.ppp
    this.pwidth  = width * this.pppInv
    this.pheight = height * this.pppInv
    this.pxoffs  = 0.5 * this.pwidth
    this.pyoffs  = 0.5 * this.pheight
	  this.w = this.pwidth
	  this.h = this.pheight
    this.x = this.pxoffs
    this.y = this.pyoffs
  }
}
