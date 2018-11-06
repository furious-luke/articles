import Tween from './Tween'
import Entity from './Entity'

export default class Back extends Tween {
  calc_interp(t) {
    t *= 2
    if (t < 1) {
      return 0.5 * t * t * (3.59491 * t - 2.59491)
    }
    else {
      t -= 2
      return 0.5 * ( t * t * (3.59491 * t + 2.59491) + 2)
    }
  }
}

Entity.tweens.back = Back
