import paper from 'paper'

import Node from './Node'
import Ticker from './Ticker'
import Camera from './Camera'

class Show extends Node {
  constructor(options = {}) {
    super({
      ...options,
      centerOrigin: true
    })
    this.show = this
    this.ticker = new Ticker()
    this.camera = new Camera()
    this.w = this.camera.w
    this.h = this.camera.h
    this.slides = []
    this.currentSlide = null
    this.theme = {
      background: '#f7f7f7',
      primary: '#00a19c',
      disabled: '#9b9b9b',
      active: '#056dff',
      text: '#4b4b4b'
    }
    this.theme.fill = this.theme.background
    this.font = 'Hero'
  }

  enter() {
    this.ref = new paper.Shape.Rectangle({
      point: [0, 0],
      size: paper.view.size,
      fillColor: this.theme.fill
    })
    super.enter(this.ticker)
  }

  update() {
    this.ticker.update()
    if (this.currentSlide) {
      this.currentSlide.update(this.ticker)
    }
  }

  render() {
    this.children.entities.forEach(c => c.render())
  }

  resize() {
    // TODO
    super.resize()
  }
}

export default Show
