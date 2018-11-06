import Two from 'two.js'

import Renderer from './Renderer'

export default class TwoRenderer extends Renderer {
  constructor(show) {
    super()
    this.two = new Two({fullscreen: true}).appendTo(document.body)
    this.show = show
    this.two.scene.translation.set(this.show.camera.width / 2, this.show.camera.height / 2)
    /* this.two.renderer.setSize(this.show.camera.width, this.show.camera.height) */
    /* size(800, 600) */
    /* strokeWeight( 10 );
     * frameRate( 30 );
     * smooth();
     * shapeMode( CENTER );
     * stroke( slide.palette.base03 );
     * fill( slide.palette.base03 ); */
    this.two.bind('resize', (w, h) => {
      this.show.camera.initialise(w, h)
      this.two.scene.translation.set(w / 2, h / 2)
    })
    this.two.bind('update', this.update.bind(this))
  }

  play() {
    this.two.play()
  }

  update(frameCount) {
    this.show.update(this.show.ticker)
    /* background( slide.palette.base05 ); */
    this.show.display(this)
    this.show.ticker.update()
  }

  transform(node, translation, scale) {
    if (node._object === undefined) {
      node._object = this.two.makeGroup()
      if (node.parent) {
        node.parent._object.add(node._object)
      }
    }
    node._object.translation.set(translation[0], translation[1])
    node._object.scale = scale
  }

  setColors(stroke, fill) {
    this.stroke = stroke
    this.fill = fill
  }

  rectangle(node, x, y, w, h, r) {
    const ppp = this.show.camera.ppp
    if (node._object === undefined) {
      node._object = this.two.makeRoundedRectangle(
        x * ppp,
        y * ppp,
        w * ppp,
        h * ppp,
        r * ppp
      )
      if (node.parent && node.parent._object) {
        node.parent._object.add(node._object)
      }
    }
    node._object.translation.x = x * ppp
    node._object.translation.y = y * ppp
    node._object.width = w * ppp
    node._object.height = h * ppp
    node._object.radius = r * ppp
    node._object.fill = 'blue'
  }
}
