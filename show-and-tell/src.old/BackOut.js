import Tween from './Tween'
import Entity from './Entity'

export default class BackOut extends Tween {
  calc_interp(t) {
    t = t - 1
    return (t * t * (2.70158 * t + 1.70158) + 1)
  }
}

Entity.tweens.backOut = BackOut
