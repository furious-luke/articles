class Shape extends Node {
  constructor(shape, size, orig, scale, warp) {
    super(orig, scale, warp)
    this.shape = shape;
    if( size === undefined ) {
      this.sw = 1;
      this.sh = 1;
    }
    else if( size.constructor === Array ) {
      this.sw = size[0];
      this.sh = size[1];
    }
    else {
      this.sw = size;
      this.sh = size;
    }
  }

	update = tick => {
	  this.w = this.sw*this.scale;
	  this.h = this.sh*this.scale;
    super.update(tick)
	}

  render = () => {
    this.pjs.pushStyle(); // shapes can change styles
    this.pjs.shape( this.shape, 0, 0, this.sw*slide.camera.ppp, this.sh*slide.camera.ppp );
    this.pjs.popStyle();
    this.pjs.ellipseMode( this.pjs.CENTER ); // can also be changed
  }
}
