(function( slide, undefined ) {

    var Entry = slide.Text.extend({

        render: function() {
	    this.pjs.textAlign( this.pjs.LEFT, this.pjs.CENTER );
            this.pjs.textFont( this.font, this.font_size*slide.camera.ppp );
            this.pjs.strokeWeight( 1 );
            var lh = this.pjs.textAscent() + this.pjs.textDescent();
            this.pjs.ellipse( 0, 0.1*lh, 8, 8 );
            this.pjs.text( this.txt, 1.5*8, 0 );
        }
    });

    var List = slide.Node.extend({

        create: function( txt, font, opts ) {
	    opts = opts || {};
            slide.Node.prototype.create.call( this, opts.origin, opts.scale, opts.warp );
            this.txt = txt;
	    this.font = font;
	    this.font_size = get_default( opts, 'font_size', 0.03 );
	    this.line_sep = get_default( opts, 'line_sep', 0.05 );

	    for( var ii = 0; ii < this.txt.length; ++ii ) {
		var entry = new Entry( txt[ii], font, { font_size: opts.font_size, warp: [[this.b, ii], this.c] } );
		entry.add_tween( slide.tweens.elastic_out([ [this.b, ii], 20 ]), 'scale', 0.8, 1 );
		this.add_child( entry );
	    }
        },

	update: function( tick ) {
            this.pjs.textFont( this.font, this.font_size*slide.camera.ppp );

            var lh = (this.pjs.textAscent() + this.pjs.textDescent())*slide.camera.ppp_inv*this.scale;
            this.w = this.pjs.textWidth( this.txt[0] );
	    for( var ii = 1; ii < this.txt.length; ++ii ) {
	    	var cw = this.pjs.textWidth( this.txt[ii] );
	    	if( cw > this.w ) this.w = cw
	    }
	    this.w *= slide.camera.ppp_inv*this.scale;
	    this.h = lh*this.txt.length + this.line_sep*(this.txt.length - 1);

	    slide.Node.prototype.update.call( this, tick );

	    for( var ii = 0; ii < this.children.active.length; ++ii ) {
	    	var entry = this.children.active[ii];
	    	entry.x = -0.5*this.w;
	    	entry.y = ii*lh - 0.5*this.h + ii*this.line_sep;
	    }
	}
    });

    var list = function( txt, font, opts ) {
	return new List( txt, font, opts );
    }

    slide.List = List;

    slide.list = list;

}( window.slide = window.slide || {} ));
