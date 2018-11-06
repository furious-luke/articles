import Node from './Node'
import {get_default} from './utils'

export default class Rect extends Node {
  constructor(w, h, opts = {}) {
    super(opts.origin, opts.scale, opts.warp, opts)
	  this.w = w;
	  this.h = h;
	  this.radius = get_default( opts, 'radius', 0 );
	}

	render = renderer => {
    renderer.rectangle(this.x, this.y, this.w, this.h)
	  /* var ppp = slide.camera.ppp;
	     this.pjs.rectMode( this.pjs.CENTER );
	     this.pjs.noStroke();
	     if( this.radius )
		   this.pjs.rect( this.x*ppp, this.y*ppp, this.w*ppp, this.h*ppp, this.radius*ppp, this.radius*ppp, this.radius*ppp, this.radius*ppp );
	     else
		   this.pjs.rect( this.x*ppp, this.y*ppp, this.w*ppp, this.h*ppp );
	     this.pjs.stroke( slide.default_stroke ); */
	}
}
