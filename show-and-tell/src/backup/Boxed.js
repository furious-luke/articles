class Boxed extends Node {
	aggregate = () => {
    if( this.parent !== undefined ) {
      this.w = this.parent.w;
      this.h = this.parent.h;
    }
    super.aggregate()
	}

  update = tick => {
    if( this.parent !== undefined ) {
      this.w = this.parent.w;
      this.h = this.parent.h;
    }
    super.update(tick)
  }
}
