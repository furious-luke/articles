import {isFunc} from './utils'

export default class Transition {
  constructor(span, object, name) {
    this.span = span
    this.objects = []
    if (object !== undefined && name !== undefined) {
      this.addObject(object, name)
    }
  }

  addObject(object, name) {
    this.objects.push([object, name])
  }

  enter(tween) {
    this.x = []
	  this.y = []
    this.w = []
    this.objects.forEach(o => {
      let span = isFunc(this.span) ? this.span(o[0], o[1], tween) : this.span
      if (!Array.isArray(span)) {
        span = [o[0][o[1]], span]
      }
		  this.x.push(span[0])
		  this.y.push(span[1])
		  this.w.push(span[1] - span[0])
    })
  }

  update(interp) {
    this.objects.forEach((o, i) => {
      const v = this.x[i] + interp * this.w[i]
      o[0][o[1]] = v
    })
  }
}
