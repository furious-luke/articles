import Entity from './Entity'

export default class Tween extends Entity {
  constructor(options) {
    super(options.show, options.warp)
    this.t = null
    this.interp = null
    this.transitions = options.transitions || []
  }

  addTransition(transition) {
    this.transitions.push(transition)
  }

  resolveTimepoints() {
    super.resolveTimepoints()
    this.w = this.warp.b - this.warp.a
  }

	enter() {
	  // Tweens often need some setup to handle taking the
	  // starting point of transisions. Call all the transitions
	  // to set themselves up.
    this.transitions.forEach(t => t.enter(this))
	}

  update(tick) {
    this.calc_t(tick)
    this.transitions.forEach(t => t.update(this.interp))
  }

  calc_t(tick) {
    if (tick <= this.warp.a) {
      this.t = 0.0
      this.interp = 0.0
    } else if (tick >= this.warp.b) {
      this.t = 1.0
      this.interp = 1.0
    } else {
      this.t = (tick - this.warp.a) / this.w
      this.interp = this.calc_interp(this.t)
    }
  }
}
