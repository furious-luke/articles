import Tween from './Tween'
import Entity from './Entity'

export default class ElasticEaseOut extends Tween {
  calc_interp(t) {
    const p = 0.3
    const a = 1.0
    const s = p / 4.0
    return (a * Math.pow(2.0, -10.0 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1.0)
  }
}

Entity.tweens.elasticEaseOut = ElasticEaseOut
