import Entity from './Entity'
import {repr} from './utils'

class Tween extends Entity {
  static registry = {
  }

  static get(value) {
    if (!Tween.isTween(value)) {
      value = new Tween.registry[value]()
    }
    return value
  }

  constructor(options) {
    super(options)
    this.t = null
    this.interp = null
    this.transitions = options.transitions || []
  }

  addTransition(transition) {
    this.transitions.push(transition)
  }

  resolve() {
    super.resolve()
    this.w = this.warp.b - this.warp.a
  }

	enter() {
    console.log('Enter: ', repr(this))
	  // Tweens often need some setup to handle taking the
	  // starting point of transisions. Call all the transitions
	  // to set themselves up.
    this.transitions.forEach(t => t.enter(this))
	}

  update(ticker) {
    this.calculate(ticker.time)
    this.transitions.forEach(t => t.update(this.interp))
  }

  calculate(time) {
    if (time <= this.warp.a) {
      this.t = 0.0
      this.interp = 0.0
    } else if (time >= this.warp.b) {
      this.t = 1.0
      this.interp = 1.0
    } else {
      this.t = (time - this.warp.a) / this.w
      this.interp = this.calcInterpolant(this.t)
    }
  }
}

export default Tween
