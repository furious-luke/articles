import Tween from './Tween'
import Entity from './Entity'

export default class Quartic extends Tween {
  calc_interp(t) {
    t *= 2
    if (t < 1) {
      return 0.5 * t * t * t * t
    }
    else {
      t -= 2
      return -0.5 * (t * t * t * t - 2)
    }
  }
}

Entity.tweens.quartic = Quartic
