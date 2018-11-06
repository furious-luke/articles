import Two from 'two.js'

import Renderer from './Renderer'


export default class TwoRenderer extends Renderer {
  constructor(slide) {
    super()
    this.two = new Two().appendTo(document.body)
    this.slide = slide
    /* size(800, 600) */
    /* strokeWeight( 10 );
     * frameRate( 30 );
     * smooth();
     * shapeMode( CENTER );
     * stroke( slide.palette.base03 );
     * fill( slide.palette.base03 ); */
    this.two.bind('update', this.update)
  }

  play = () => {
    this.two.play()
  }

  update = frameCount => {
    this.slide.scene.update(this.slide.ticker.tick)
    /* background( slide.palette.base05 ); */
    this.slide.scene.display(this)
    this.slide.ticker.update()
  }

  transform = (node, translation, scale) => {
    if (node._object === undefined) {
      node._object = this.two.makeGroup()
      if (node.parent) {
        node.parent._object.add(node._object)
      }
    }
    node._object.translation.set(translation[0], translation[1])
    node._object.scale = scale
  }

  setColors = (stroke, fill) => {
    this.stroke = stroke
    this.fill = fill
  }

  rectangle = (node, x, y, w, h, r) => {
    if (node._object === undefined) {
      node._object = this.two.makeRoundedRectangle()
      if (node.parent) {
        node.parent._object.add(node._object)
      }
    }
    const ppp = this.slide.camera.ppp
    node._object.x = x * ppp
    node._object.y = y * ppp
    node._object.width = w * ppp
    node._object.height = height * ppp
    node._object.radius = r * ppp
  }
}
