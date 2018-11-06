import Node from './Node'
import Entity from './Entity'

export default class Line extends Node {
  constructor(options = {}) {
    super(options)
    this.ox = (options.offset || [])[0] || 0
    this.oy = (options.offset || [])[1] || 0
  }

  render(renderer) {
    renderer.line(this, this.x, this.y, this.ox, this.oy)
  }
}

Entity.nodes.line = Line
