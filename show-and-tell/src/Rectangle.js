import Node from './Node'
import Entity from './Entity'

export default class Rectangle extends Node {
  constructor(options = {}) {
    super(options)
	  this.w = options.w || 0
	  this.h = options.h || 0
	  this.radius = options.radius || 0
	}

	render(renderer) {
    renderer.rectangle(this, this.x, this.y, this.w, this.h, this.radius)
	}
}

Entity.nodes.rectangle = Rectangle
