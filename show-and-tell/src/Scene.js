import Node from './Node'
import show from './Show'

export default class Scene extends Node {
  constructor() {
    super({show})
    this.show.addScene(this)
  }

  aggregate() {
    this.w = this.show.camera.w
    this.h = this.show.camera.h
    super.aggregate()
  }

  update(tick) {
    this.show.update_cnt = 0
    // Update for camera size.
    this.w = this.show.camera.w
    this.h = this.show.camera.h
    // Step forward all children.
    this.step(tick)
    super.update(tick)
    this.flatten(this)
  }

  prepare() {
    super.prepare()
    this.step(0)
    this.aggregate()
    this.flatten()
  }

  render(renderer) {
    renderer.transform(this, [this.w / 2, this.h / 2])
  }
}
