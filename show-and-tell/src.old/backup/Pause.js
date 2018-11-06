class Pause extends Node {
  constructor(tp) {
    super(0, 1, [tp, 1])
    this.triggered = slide.disable_pause;
	  this._angle = 0;
	  this.alpha = 150;
  }

  update = tick => {
    if( this.triggered == false ) {
      this.triggered = true;
      slide.ticker.paused = true;
      add_key_listener( this );
    }
    super.update(tick)
  }

	render = () => {
	  this.pjs.resetMatrix();
	  slide.scene.transform();
	  this.pjs.rectMode( this.pjs.CORNER );
	  var ppp = slide.camera.ppp;

	  var x = 0.87*0.5*slide.camera.w, y = 0.82*0.5*slide.camera.h
	  var w = 0.02, h = 0.1;
	  this.pjs.noStroke();
	  this.pjs.rect( x*ppp, y*ppp, w*ppp, h*ppp, 2 );
	  this.pjs.rect( (x + w + 0.02)*ppp, y*ppp, w*ppp, h*ppp, 2 );
	  this.pjs.stroke( slide.default_stroke, this.alpha );
	  this.pjs.noFill();
	  this.pjs.strokeWeight( 4 );
	  for( var ii = 0; ii < 2*this.pjs.PI; ii += this.pjs.PI/4 )
		  this.pjs.arc( (x + 0.5*(2*w + 0.02))*ppp, (y + 0.5*h)*ppp, 1.5*h*ppp, 1.5*h*ppp, ii + this._angle, ii + this.pjs.PI/8 + this._angle );
	  this.pjs.strokeWeight( 1 );
	  this.pjs.fill( 88, 88, 88 );

	  this._angle += 0.03;
	  if( this._angle >= 2*this.pjs.PI )
		  this._angle = 0;
	}

  key_typed = () => {
    slide.ticker.paused = false;
    return true;
  }
}
