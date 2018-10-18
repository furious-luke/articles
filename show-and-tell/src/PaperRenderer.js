import paper from 'paper'

import Renderer from './Renderer'
import {isNil} from './utils'

export default class ProcessingRenderer extends Renderer {
  constructor(show, callback) {
    super()
    this.show = show
    this.callback = callback
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)
    /* paper.install(window) */ // TODO: Ruins everything!
    paper.setup(this.canvas)
    this.setup()
  }

  toColor(value) {
    const r = this.pjs.unhex(value.slice(1, 3))
    const g = this.pjs.unhex(value.slice(3, 5))
    const b = this.pjs.unhex(value.slice(5, 7))
    return this.pjs.color(r, g, b)
  }

  setup() {
    paper.view.setViewSize(new paper.Size(this.show.camera.width, this.show.camera.height))
    if (this.callback) {
      this.callback(this)
    }
    paper.view.onFrame = () => {
      this.draw()
    }
  }

  applyDefaults(node) {
    node.strokeWeight = this.show.defaultStrokeWeight
    node.stroke = this.show.defaultStroke
    node.fill = this.show.palette.base03
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
    this.show.display(this)
    const bg = new paper.Path.Rectangle({
      point: [0, 0],
      size: [this.show.camera.width, this.show.camera.height]
    })
    bg.sendToBack()
    bg.strokeColor = this.show.palette.background
    bg.fillColor = this.show.palette.background
    this.show.ticker.update()
  }

  enterNode(node) {
    const parent = this.findGroup(node)
    node._group = new paper.Group()
    node._group.applyMatrix = false
    if (parent) {
      parent.addChild(node._group)
    }
  }

  exitNode(node) {
    if (node._group) {
      node._group.remove()
    }
  }

  beginNode(node) {
  }

  endNode(node) {
  }

  transform(node, translation, scale) {
    const ppp = this.show.camera.ppp
    node._group.position = new paper.Point(translation.map(p => p * ppp))
    if (!isNil(scale)) {
      node._group.scaling = scale
    } else {
      node._group.scaling = 1
    }
  }

  setStyle(node, stroke, strokeWeight, fill, alpha) {
    if (!isNil(stroke)) {
      node._group.style.strokeColor = stroke
    }
    /* if (!isNil(strokeWeight)) {
     *   node._group.style.strokeWidth = strokeWeight
     * } */
    if (!isNil(fill)) {
      node._group.style.fillColor = fill
    }
    // TODO: Alpha
  }

  findGroup(node) {
    let group
    while (group === undefined && node !== undefined) {
      group = node._group
      node = node.parent
    }
    return group
  }

  rectangle(node, x, y, w, h, r) {
    const ppp = this.show.camera.ppp
    if (node._object === undefined) {
      node._object = new paper.Shape.Rectangle({
        point: [0, 0],
        size: [w * ppp, h * ppp],
        radius: (r || 0) * ppp
      })
      const group = this.findGroup(node)
      if (group) {
        group.addChild(node._object)
      }
    }
    node._object.set({
      point: [0, 0],
      size: [w * ppp, h * ppp],
      radius: (r || 0) * ppp
    })
  }

  line(node, x, y, ox, oy) {
    const ppp = this.show.camera.ppp
    this.pjs.strokeWeight(this.show.defaultStrokeWeight)
    this.pjs.stroke(this.show.palette.base03)
    this.pjs.line(0, 0, (ox - x) * ppp, (oy - y) * ppp)
  }

  text(node, text, font, fontSize) {
    const ppp = this.show.camera.ppp
    if (node._object === undefined) {
      node._object = new paper.PointText({
        point: [0, 0],
        content: text,
        fontSize: fontSize * ppp
      })
      const group = this.findGroup(node)
      if (group) {
        group.addChild(node._object)
      }
    }
//    node._object.fontSize = fontSize * ppp
  }

  getTextGeometry(node, text, font, fontSize, scale) {
    // TODO: Inefficient.
    const ppp = this.show.camera.ppp
    const pppInv = this.show.camera.pppInv
    const item = new paper.PointText({
      content: text,
      fontSize: fontSize * ppp
    })
    const bounds = [item.bounds.width * pppInv, item.bounds.height * pppInv] // TODO: Maybe use strokeBounds?
    item.remove()
    return bounds
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
