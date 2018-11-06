import paper from 'paper'

import Node from './Node'
import Circle from './Circle'
import Path from './Path'
import Linear from './Linear'

class Pause extends Node {
  constructor(options = {}) {
    super(options)
    if (options.enter) {
      this.enter()
    }
    const r = 0.1
    this.addChild([
      new Circle({
        show: this.show,
        warp: this.warp,
        radius: r,
        strokeDash: [0.02, 0.025],
        fill: null
      }),
      new Path({
        show: this.show,
        warp: this.warp,
        x: -0.3 * r,
        y: -0.5 * r,
        segments: [[0, r]],
        strokeWidth: 0.02
      }),
      new Path({
        show: this.show,
        warp: this.warp,
        x: 0.3 * r,
        y: -0.5 * r,
        segments: [[0, r]],
        strokeWidth: 0.02
      })
    ])
    this.getChild(0).addTween(
      new Linear({warp: [0, 10]}),
      'angle',
      [0, 1000]
    )
  }
}

export default Pause
