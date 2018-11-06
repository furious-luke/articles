import Tween from './Tween'

class Linear extends Tween {
  type = 'linear'

  calcInterpolant(t) {
    return t
  }
}

Tween.registry.linear = Linear

export default Linear
