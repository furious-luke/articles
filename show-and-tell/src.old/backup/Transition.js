class Transition {
  constructor(object, name, x, y) {
    this.x = x
    this.y = y
	  this.w = this.y - this.x
    this.objects = []
    if (object != undefined && name != undefined) {
      this.addObject(object, name)
    }
  }

  addObject = (object, name) => {
    this.objects.push([object, name])
  }

	enter = () => {
	}

  update = interp => {
    const v = this.x + interp * this.w
    for (let ii = 0; ii < this.objs.length; ++ii) {
      this.objects[ii][0][this.objects[ii][1]] = v
    }
  }
}
