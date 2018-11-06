import Node from './Node'
import Entity from './Entity'

export default class SVG extends Node {
  constructor(options = {}) {
    super(options)
    const size = options.size
    if (size === undefined) {
      this.sw = 1
      this.sh = 1
    } else if (Array.isArray(size)) {
      this.sw = size[0]
      this.sh = size[1]
    } else {
      this.sw = size
      this.sh = size
    }
    this.source = options.source
    this.data = this.show.renderer.loadSVG(this.source, options)
	}

  update(time) {
    this.w = this.sw * this.scale
	  this.h = this.sh * this.scale
    super.update(time)
  }

	render(renderer) {
    renderer.svg(this, this.data, this.sw, this.sh)
	}
}

Entity.nodes.svg = SVG
