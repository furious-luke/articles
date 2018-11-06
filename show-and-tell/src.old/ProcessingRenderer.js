// import 'processing-js'
// TODO: Old version of processing doesn't work from NPM.

import Renderer from './Renderer'
import {isNil} from './utils'

export default class ProcessingRenderer extends Renderer {
  constructor(show, callback) {
    super()
    this.show = show
    this.callback = callback
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)
    this.processing = new Processing(this.canvas, this.sketch.bind(this))
  }

  sketch(pjs) {
    this.pjs = pjs
    this.pjs.setup = this.setup.bind(this)
    this.pjs.draw = this.draw.bind(this)
    this.pjs.keyTyped = this.keyTyped.bind(this)
  }

  toColor(value) {
    const r = this.pjs.unhex(value.slice(1, 3))
    const g = this.pjs.unhex(value.slice(3, 5))
    const b = this.pjs.unhex(value.slice(5, 7))
    return this.pjs.color(r, g, b)
  }

  setup() {
    this.pjs.size(this.show.camera.width, this.show.camera.height)
    this.pjs.strokeWeight(this.show.defaultStrokeWeight)
    this.pjs.frameRate(this.show.ticker.framesPerSecond)
    this.pjs.smooth()
    this.pjs.shapeMode(this.pjs.CENTER)
    for (let [name, value] of Object.entries(this.show.palette)) {
      this.show.palette[name] = this.toColor(value)
    }
    this.show.defaultStroke = this.toColor(this.show.defaultStroke)
    this.show.defaultFill = this.toColor(this.show.defaultFill)
    this.show.defaultFont = this.pjs.loadFont(this.show.defaultFont)
    this.pjs.stroke(this.show.palette.base03)
    this.pjs.fill(this.show.palette.base03)
    if (this.callback) {
      this.callback(this)
    }
  }

  draw() {
    this.update()
  }

  keyTyped() {
    if (this.pjs.key == this.pjs.CODED) {
      this.show.keyTyped(null, this.pjs.keyCode)
    } else {
      this.show.keyTyped(this.pjs.key, null)
    }
  }

  play() {
  }

  update(frameCount) {
    this.show.update(this.show.ticker.time)
    this.pjs.background(this.show.palette.background)
    this.show.display(this)
    this.show.ticker.update()
  }

  beginNode(node) {
    this.pjs.pushMatrix()
    this.pjs.pushStyle()  // TODO: Doesn't save stroke weight.
  }

  endNode(node) {
    this.pjs.popStyle()
    this.pjs.popMatrix()
  }

  transform(node, translation, scale) {
    const ppp = this.show.camera.ppp
    this.pjs.translate(translation[0] * ppp, translation[1] * ppp)
    if (!isNil(scale)) {
      if (Array.isArray(scale)) {
        this.pjs.scale(scale[0], scale[1])
      } else {
        this.pjs.scale(scale)
      }
    }
  }

  setStyle(node, stroke, strokeWeight, fill, alpha) {
    if (!isNil(stroke) || !isNil(alpha)) {
      this.pjs.stroke(stroke, alpha)
    }
    if (!isNil(strokeWeight)) {
      this.pjs.strokeWeight(strokeWeight)
    }
    if (!isNil(fill) || !isNil(alpha)) {
      this.pjs.fill(fill, alpha)
    }
  }

  rectangle(node, x, y, w, h, r) {
    const ppp = this.show.camera.ppp
    this.pjs.rectMode(this.pjs.CENTER)
    if (r) {
      this.pjs.rect(x * ppp, y * ppp, w * ppp, h * ppp, r * ppp, r * ppp, r * ppp, r * ppp)
    } else {
      this.pjs.rect(x * ppp, y * ppp, w * ppp, h * ppp)
    }
  }

  line(node, x, y, ox, oy) {
    const ppp = this.show.camera.ppp
    this.pjs.strokeWeight(this.show.defaultStrokeWeight)
    this.pjs.stroke(this.show.palette.base03)
    this.pjs.line(0, 0, (ox - x) * ppp, (oy - y) * ppp)
  }

  text(node, text, font, fontSize) {
    const ppp = this.show.camera.ppp
    this.pjs.textAlign(this.pjs.CENTER, this.pjs.CENTER)
    this.pjs.textFont(font, fontSize * ppp)
    this.pjs.text(text, 0, 0)
  }

  getTextGeometry(node, text, font, fontSize, scale) {
    const ppp = this.show.camera.ppp
    const pppInv = this.show.camera.pppInv
    this.pjs.textFont(font, fontSize * ppp)
    const w = this.pjs.textWidth(text) * pppInv * scale
    const h = (this.pjs.textAscent() + this.pjs.textDescent()) * pppInv * scale
    return [w, h]
  }

  loadSVG(source, options = {}) {
    const data = this.pjs.loadShape(source)
    if (options.disableStyle) {
      data.disableStyle()
    }
    return data
  }

  svg(node, data, w, h) {
    const ppp = this.show.camera.ppp
    this.pjs.pushStyle() // shapes can change styles
    this.pjs.shape(data, 0, 0, w * ppp, h * ppp)
    this.pjs.popStyle()
    this.pjs.ellipseMode(this.pjs.CENTER) // can also be changed
  }
}
