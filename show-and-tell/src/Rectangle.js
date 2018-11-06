import paper from 'paper'

import Node from './Node'

class Rectangle extends Node {
  constructor(options = {}) {
    super(options)
    this.x = options.x || 0
    this.y = options.y || 0
    this.w = options.w || 1
    this.h = options.h || 1
    this.fill = options.fill || 'red'
    if (options.enter) {
      this.enter()
    }
  }

  enter(ticker) {
    const ppp = this.show.camera.ppp
    this.ref = new paper.Path.Rectangle({
      point: [-0.5 * this.w * ppp, -0.5 * this.h * ppp],
      size: this.makeSize(),
      fillColor: this.fill
    })
    super.enter(ticker)
  }
}

export default Rectangle
