import BackOut from './BackOut'
import Entity from './Entity'
import Transition from './Transition'
import {isFunc} from './utils'

export default class EnterLeft extends BackOut {
  constructor(options) {
    super({
      ...options,
      warp: [options.warp, 0.5],
      transitions: [new Transition(
        o => [-0.5 * (this.show.camera.w + o.w), this.x(o)],
        options.transitions,
        'x'
      )]
    })
    // TODO: Wat.
    const x = options.x || 0
    if (!isFunc(x)) {
      this.x = () => x
    } else {
      this.x = x
    }
  }
}

Entity.tweens.enterLeft = EnterLeft
