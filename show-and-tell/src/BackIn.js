import Tween from './Tween'
import Entity from './Entity'

export default class BackIn extends Tween {
  calc_interp(t) {
    return t * t * (2.70158 * t - 1.70158)
  }
}

Entity.tweens.backIn = BackIn
