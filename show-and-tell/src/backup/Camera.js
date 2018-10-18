import slide from './slide'
import {isNil} from './utils'

export default class Camera {
  constructor(width, height) {
    if (!isNil(width) && !isNil(height)) {
      this.initialise(width, height)
    }
  }

  initialise = (width, height) => {
    if (width === undefined) {
      width = screen.width
    }
    if (height === undefined) {
      height = screen.height
    }
	  const scaler = (width < height) ? width : height
    this.ppp     = 0.5 * scaler
	  this.pppInv  = 1.0 / this.ppp
    this.pwidth  = width * this.pppInv
    this.pheight = height * this.pppInv
    this.pxoffs  = 0.5 * this.pwidth
    this.pyoffs  = 0.5 * this.pheight
	  this.w = this.pwidth
	  this.h = this.pheight
    slide.scene.x = this.pxoffs
    slide.scene.y = this.pyoffs
  }
}
