import paper from 'paper'

import Node from './Node'

class Text extends Node {
  type = 'text'

  constructor(options = {}) {
    super(options)
    this.text = options.text || 'empty'
    this.size = options.size || 25
    this.fill = options.fill || this.show.theme.text
    this.font = options.font || this.show.font
    if (options.enter) {
      this.enter()
    }
  }

  enter(ticker) {
    const ppp = this.show.camera.ppp
    // TODO: Calculates the wrong width on the first pass. Have included
    // a magic number down below to compensate.
    this.ref = new paper.PointText({
      point: [999999, 999999],
      content: this.text,
      fontFamily: this.font,
      fontSize: this.size,
      fillColor: this.fill
    })
    this.w = 1.17 * this.ref.bounds.width / ppp
    this.h = this.ref.bounds.height / ppp
    // TODO: Why 0.25 for height? 0.5 is too far for some reason...
    this.x -= 0.5 * this.w
    this.y += 0.25 * this.h
    this.ref.point = [0, 0]
    super.enter(ticker)
  }
}

export default Text
