import Node from './Node'

class Slide extends Node {
  makePosition() {
    const ppp = this.show.camera.ppp
    return [
      (this.x + 0.5 * this.parent.w) * ppp,
      (this.y + 0.5 * this.parent.h) * ppp
    ]
  }
}

export default Slide
