import Node from './Node'
import Entity from './Entity'

class Text extends Node {
  constructor(options = {}) {
    super(options)
    this.text = options.text || ''
    this.font = options.font || this.show.defaultFont
	  this.fontSize = options.fontSize || this.show.defaultFontSize
    // this.stroke = this.stroke || this.show.palette.text
  }

	aggregate() {
	  this._calcSize()
    super.aggregate()
	}

	update(tick) {
	  this._calcSize()
    super.update(tick)
	}

  render(renderer) {
    renderer.text(this, this.text, this.font, this.fontSize)
  }

	_calcSize() {
    const geometry = this.show.renderer.getTextGeometry(this, this.text, this.font, this.fontSize, this.scale)
    this.w = geometry[0]
    this.h = geometry[1]
	}
}

Entity.nodes.text = Text
