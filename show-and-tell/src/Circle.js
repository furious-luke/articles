import paper from 'paper'

import Node from './Node'

class Circle extends Node {
  constructor(options = {}) {
    super(options)
    this.x = options.x || 0
    this.y = options.y || 0
    this.radius = options.radius || 1
    if (options.enter) {
      this.enter()
    }
  }

  enter(ticker) {
    const ppp = this.show.camera.ppp
    this.ref = new paper.Path.Circle({
      center: [0, 0],
      radius: this.radius * ppp,
      strokeColor: this.stroke,
      strokeWidth: this.strokeWidth * ppp,
      dashArray: this.strokeDash.map(d => d * ppp),
      strokeCap: this.strokeCap,
      fillColor: this.fill
    })
    super.enter(ticker)
  }
}

export default Circle
