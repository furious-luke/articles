import Node from './Node'
import Entity from './Entity'

export default class Pause extends Node {
  constructor(options = {}) {
    super({...options, warp: [options.warp, 0.02], ephemeral: true})
    /* this.triggered = slide.disable_pause; */
	  this.angle = 0
	  this.alpha = 60
  }

  update(time) {
    if (!this.triggered) {
      this.triggered = true
      this.show.ticker.paused = true
      this.show.addKeyListener(this)
    }
    super.update(time)
  }

	render(renderer) {
	  /* renderer.pjs.resetMatrix();
	     this.show.currentScene.transform(renderer);
	     renderer.pjs.rectMode( renderer.pjs.CORNER ); */
	  const ppp = this.show.camera.ppp

    var w = 0.02, h = 0.1;
	  var x = 0.5 * this.show.camera.w - w - 0.1, y = 0.5 * this.show.camera.h - h - 0.04
	  renderer.pjs.noStroke();
    renderer.pjs.fill(this.show.palette.disabled, this.alpha)
	  renderer.pjs.rect( x*ppp, y*ppp, w*ppp, h*ppp, 2 );
	  renderer.pjs.rect( (x + w + 0.02)*ppp, y*ppp, w*ppp, h*ppp, 2 );
	  renderer.pjs.stroke( this.show.palette.disabled, this.alpha );
	  renderer.pjs.noFill();
	  renderer.pjs.strokeWeight( 4 );
	  for( var ii = 0; ii < 2*renderer.pjs.PI; ii += renderer.pjs.PI/4 )
		  renderer.pjs.arc( (x + 0.5*(2*w + 0.02))*ppp, (y + 0.5*h)*ppp, 1.5*h*ppp, 1.5*h*ppp, ii + this.angle, ii + renderer.pjs.PI/8 + this.angle );
	  renderer.pjs.strokeWeight( 1 );
	  renderer.pjs.fill( 88, 88, 88 );

	  this.angle += 0.03;
	  if( this.angle >= 2*renderer.pjs.PI )
		  this.angle = 0;
	}

  keyTyped() {
    this.show.ticker.paused = false
    this.show.removeKeyListener(this)
    return true
  }
}

Entity.nodes.pause = Pause
