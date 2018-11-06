import paper from 'paper'

import Node from './Node'

class Path extends Node {
  constructor(options = {}) {
    super(options)
    this.x = options.x || 0
    this.y = options.y || 0
    this.segments = options.segments || [[1, 1]]
    if (options.enter) {
      this.enter()
    }
  }

  enter(ticker) {
    const ppp = this.show.camera.ppp
    const segments = [[0, 0], ...this.segments]
    console.log(segments)
    this.ref = new paper.Path({
      segments: segments.map(s => [s[0] * ppp, s[1] * ppp]),
      strokeColor: this.stroke,
      strokeWidth: this.strokeWidth * ppp,
      dashArray: this.strokeDash.map(d => d * ppp),
      strokeCap: this.strokeCap
    })
    super.enter(ticker)
  }
}

export default Path
