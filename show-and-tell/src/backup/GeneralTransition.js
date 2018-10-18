class GeneralTransition extends Transition {
  constructor(object, name, func) {
    super(object, name, 0, 0)
    this.func = func
  }

  enter = tween => {
    this.x = []
    this.y = []
    this.w = []
    for (let ii = 0; ii < this.objects.length; ++ii) {
      const span = this.func(this.objects[ii][0], this.objects[ii][1], this, tween)
      this.x.push(span[0])
      this.y.push(span[1])
      this.w.push(span[1] - span[0])
    }
  }

  update = interp => {
    for (let ii = 0; ii < this.objects.length; ++ii) {
      const v = this.x[ii] + interp * this.w[ii]
      this.objects[ii][0][this.objects[ii][1]] = v
    }
  }
}
