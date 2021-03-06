import Tween from './Tween'

class Quartic extends Tween {
  type = 'quartic'

  calcInterpolant(t) {
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

Tween.registry.quartic = Quartic

export default Quartic
