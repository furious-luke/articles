import Tween from './Tween'
import Entity from './Entity'

export default class Linear extends Tween {
  calc_interp(t) {
    return t
  }
}

Entity.tweens.linear = Linear
