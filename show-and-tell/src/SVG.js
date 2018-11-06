import paper from 'paper'

import Node from './Node'

class Svg extends Node {
  constructor(options = {}) {
    super(options)
    // TODO: Use a SVG library.
    this.svg = require(`./${options.source}`)
    this.svg = paper.project.importSVG(this.svg)
    this.symbol = new paper.SymbolDefinition(this.svg)
    if (options.enter) {
      this.enter()
    }
  }

  enter(ticker) {
    this.ref = this.symbol.place([this.x, this.y])
    super.enter(ticker)
  }
}

export default Svg
