import paper from 'paper'

import Entity from './Entity'
import Timeline from './Timeline'
import Transition from './Transition'
import {isNil, isFunc, isArray, getDefault, repr} from './utils'

class Node extends Entity {
  static isNode(value) {
    return (value instanceof Node) || (value.prototype instanceof Node)
  }

  type = 'node'

  constructor(options = {}) {
    super(options)
    this.show = options.show
    this.x = options.x || 0
    this.y = options.y || 0
    this.w = options.w || 0
    this.h = options.h || 0
    this.halign = options.halign || null
    this.valign = options.valign || null
    this.scale = options.scale || 1
    this.angle = options.angle || 0
    this.stroke = options.stroke || 'black'
    this.strokeWidth = getDefault(options, 'strokeWidth', 0.01)
    this.strokeDash = options.strokeDash || []
    this.strokeCap = options.strokeCap || 'round'
    this.fill = getDefault(options, 'fill', 'red')
    this.last = {
      x: this.x,
      y: this.y,
      scale: this.scale,
      angle: this.angle
    }
    this.opacity = getDefault(options, 'opacity', 1)
    this.children = new Timeline()
    this.tweens = new Timeline()
  }

  resolve() {
    super.resolve()
    this.children.resolve()
    this.tweens.resolve()
  }

  enter(ticker) {
    super.enter(ticker)
    // TODO: Setting the dimensions like this could be a bit bogus.
    if (this.parent) {
      if (!this.w) {
        this.w = this.parent.w
      }
      if (!this.h) {
        this.h = this.parent.h
      }
    }
    this.group = new paper.Group({
      position: this.makePosition(),
      applyMatrix: false
    })
    this.last.x = this.x
    this.last.y = this.y
    this.children.enter(ticker)
    this.tweens.enter(ticker)
    this.children.entities.forEach(
      c => this.group.addChild(c.group)
    )
    if (this.ref) {
      this.group.insertChild(0, this.ref)
    }
  }

  exit(ticker) {
    super.exit(ticker)
    this.children.entities.forEach(c => c.exit())
    if (this.ref) {
      this.ref.remove()
      delete this.ref
    }
    this.group.remove()
    delete this.group
  }

  addChild(node) {
    if (!Array.isArray(node)) {
      node = [node]
    }
    for (const n of node) {
      this.children.addEntity(n)
      n.parent = this
    }
    return node[node.length - 1]
  }

  addSibling(node) {
    this.parent.addChild(node)
  }

  addTween(tween, name, span) {
    let spans = []
    if (!isNil(name) && !isNil(span)) {
      spans = [[name, span]]
    } else if (isArray(name)) {
      spans = name
    }
    spans.forEach(s => {
      const trans = new Transition(s[1], this, s[0])
      tween.addTransition(trans)
    })
    tween.parent = this
    this.tweens.addEntity(tween)
    return this
  }

  getChild(index) {
    return this.children.entities[index]
  }

  getLastChild() {
    return this.children.entities[this.children.entities.length - 1]
  }

  getTween(index) {
    return this.tweens.entities[index]
  }

  getLastTween() {
    return this.tweens.entities[this.tweens.entities.length - 1]
  }

  findSibling(node) {
    if (node) {
      let sibling = this.children.findSibling(node)
      if (!sibling) {
        sibling = this.tweens.findSibling(node)
      }
      return sibling
    } else {
      return super.findSibling(node)
    }
  }

  update(ticker) {
    this.children.update(ticker)
    this.tweens.update(ticker)
  }

  render() {
    if (this.group) {
      this.movePosition()
      this.group.opacity = this.opacity
      const scaleDelta = this.scale - this.last.scale
      if (scaleDelta > 0.001 || scaleDelta < -0.001) {
        this.group.scale(1.0 + scaleDelta)
        this.last.scale = this.scale
      }
      const angleDelta = this.angle - this.last.angle
      if (angleDelta > 0.001 || angleDelta < -0.001) {
        this.group.rotate(angleDelta)
        this.last.angle = this.angle
      }
      this.children.entities.forEach(c => c.render())
    }
  }

  resize() {
    this.children.entities.forEach(c => c.resize())
  }

  makePosition(position) {
    if (isNil(position)) {
      position = [this.x, this.y]
    }
    if (this.parent) {
      if (this.halign == 'right') {
        position[0] += 0.5 * (this.parent.w - this.w)
      } else if (this.halign == 'left') {
        position[0] -= 0.5 * (this.parent.w - this.w)
      }
      if (this.valign == 'bottom') {
        position[1] += 0.5 * (this.parent.h - this.h)
      }
    }
    const ppp = this.show.camera.ppp
    return [
      position[0] * ppp,
      position[1] * ppp
    ]
  }

  movePosition() {
    let delta = [
      this.x - this.last.x,
      this.y - this.last.y
    ]
    this.last.x = this.x
    this.last.y = this.y
    const ppp = this.show.camera.ppp
    this.group.position.x += delta[0] * ppp
    this.group.position.y += delta[1] * ppp
  }

  makeSize() {
    const ppp = this.show.camera.ppp
    return [this.w * ppp, this.h * ppp]
  }

  getActive() {
    return [
      ...this.children.active,
      ...this.children.active.reduce(
        (a, b) => [...a, ...b.getActive()],
        []
      )
    ]
  }
}

export default Node
