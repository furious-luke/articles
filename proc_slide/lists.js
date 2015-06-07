(function( slide, undefined ) {

    var ListEntry = slide.Text.extend({

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
	    this.font = font || slide.default_list_font;
	    this.font_size = get_default( opts, 'font_size', 0.03 );
	    this.line_sep = get_default( opts, 'line_sep', 0.05 );
	    this.create_entries();
	},

	create_entries: function() {
	    for( var ii = 0; ii < this.txt.length; ++ii ) {
		var entry = new ListEntry( this.txt[ii], this.font, {
		    font_size: this.font_size, warp: [[this.b, ii], this.c]
		} );
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

    var TextBoxEntry = slide.Text.extend({

        render: function() {
	    this.pjs.textAlign( this.pjs.LEFT, this.pjs.CENTER );
            this.pjs.textFont( this.font, this.font_size*slide.camera.ppp );
            this.pjs.text( this.txt, 0, 0 );
        }
    });

    var TextBox = slide.Node.extend({

        create: function( txt, font, opts ) {
    	    opts = opts || {};
            slide.Node.prototype.create.call( this, opts.origin, opts.scale, opts.warp );
	    this.w = get_default( opts, 'width', slide.camera.w );
	    this.h = get_default( opts, 'height', slide.camera.h );
            this.txt = txt;
    	    this.words = txt.split( ' ' );
    	    this.font = font;
    	    this.font_size = get_default( opts, 'font_size', 0.03 );
    	    this.line_sep = get_default( opts, 'line_sep', 1.5*this.font_size );
	    this.word_sep = get_default( opts, 'word_sep', 0.03 );
    	    this.create_entries( opts.use_tween );
    	},

    	create_entries: function( use_tween ) {
    	    for( var ii = 0; ii < this.words.length; ++ii ) {
    	    	var entry = new TextBoxEntry( this.words[ii], this.font, {
	    	    font_size: this.font_size, warp: [this.b, this.c]
	    	} );
    	    	this.add_child( entry );
		if( use_tween ) {
		    entry.alpha = 0;
		    entry.add_tween(
			slide.tweens.linear([ [this.b, ii], 5 ]), 'alpha', 0, 255
		    )
		}
    	    }
        },

	align_entries: function() {
	    var ii = 0, y = 0;
	    while( ii < this.words.length ) {
	    	var jj = ii, cur_size = 0;
	    	while( jj < this.words.length ) {
		    var ch = this.get_child( jj );
		    if( (cur_size + ch.w) > this.w )
			break;
	    	    cur_size += ch.w + this.word_sep;
	    	    ++jj;
	    	}
	    	if( jj == ii )
	    	    throw new Error( 'Word too big for text box.' );
	    	if( jj < this.words.length )
	    	    cur_size -= this.word_sep;

	    	var n_words = jj - ii;
	    	var extra_space = (this.w - cur_size)/(n_words - 1), x = 0;
	    	for( ; ii < jj; ++ii ) {
	    	    var ch = this.get_child( ii );
	    	    ch.x = x - 0.5*this.w;
	    	    ch.y = y - 0.5*this.h;
	    	    x += ch.w + this.word_sep + extra_space;
	    	}

	    	y += this.line_sep;
	    }
	},

    	update: function( tick ) {
    	    slide.Node.prototype.update.call( this, tick );
	    this.align_entries();
    	}
    });

    var list = function( txt, font, opts ) {
	return new List( txt, font, opts );
    }

    var text_box = function( txt, font, opts ) {
	return new TextBox( txt, font, opts );
    }

    slide.Node.prototype.list = function( items, opts ) {
	opts = opts || {};
	var lc = this.get_last_child();
	if( lc !== undefined )
	    lc = lc.c;
	opts.warp = [lc, get_default( opts, 'duration', 40 )];
	opts.font_size = opts.font_size || 0.1;
	var node = this.add_child( slide.list( items, opts.font, opts ) );
	node.pause([ node.b, 30 ]); // pause just before fade out
	slide.helpers.fade_out( node, [ node.c, -10 ]);
	return node;
    }

    slide.Node.prototype.list_right = function( items, opts ) {
	opts = opts || {};
	opts.origin = slide.helpers.right();
	if( opts.x !== undefined )
	    opts.origin[0] = opts.x*slide.camera.w;
	return this.list( items, opts );
    }

    slide.List = List;

    slide.list = list;
    slide.text_box = text_box;

}( window.slide = window.slide || {} ));
