class Text extends Node {
  constructor( txt, font, opts = {} ) {
    super(opts.origin, opts.scale, opts.warp, opts)
    this.txt = txt;
    this.font = font;
	  this.font_size = get_default( opts, 'font_size', 0.03 );
  }

	aggregate = () => {
	  this._calc_size();
    super.aggregate()
	}

	update = tick => {
	  this._calc_size();
    super.update(tick)
	}

  render = () => {
	  this.pjs.textAlign( this.pjs.CENTER, this.pjs.CENTER );
    this.pjs.textFont( this.font, this.font_size*slide.camera.ppp );
    this.pjs.text( this.txt, 0, 0 );
  }

	_calc_size = () => {
    this.pjs.textFont( this.font, this.font_size*slide.camera.ppp );
    this.w = this.pjs.textWidth( this.txt )*slide.camera.ppp_inv*this.scale;
	  this.h = (this.pjs.textAscent() + this.pjs.textDescent())*slide.camera.ppp_inv*this.scale;
	}
}
