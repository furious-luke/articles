// TODO: Add horizontal option
class Justify extends Boxed {
  constructor() {
    super(0, 1)
  }

  update = tick => {
    super.update(tick)
    // TODO: Call appropriate justify function.
  }

  aggregate = () => {
    super.aggregate()
    // Need to do this here too to handle cases where the 'gx' and 'gy'
	  // values are needed right at the beginning.
    // TODO: Call appropriate justify function.
    //this.x = -0.5*(this.w - this.children.w) + this.margin;
  }

  verticalCenter = () => {
    // TODO: Should be children.h?
    this.y = 0.5 * (this.h - this.children.w)
  }

  horizontalLeft = () => {
    this.x = -0.5*(this.w - this.children.w) + this.margin;
  }

  horizontalRight = () => {
    this.x = 0.5*(this.w - this.children.w) - this.margin;
  }
}
