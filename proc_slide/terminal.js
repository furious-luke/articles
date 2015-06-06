(function( slide, undefined ) {

    var Terminal = slide.Rect.extend({

        create: function( opts ) {
    	    opts = opts || {};
	    this.max_chars = get_default( opts, 'columns', 80 );
	    this.max_lines = get_default( opts, 'rows', 25 );
    	    this.font = get_default( opts, 'font', 'monospace' );
    	    this.font_size = get_default( opts, 'font_size', 0.03 );
    	    this.line_sep = get_default( opts, 'line_sep', 1.5*this.font_size );
	    this.word_sep = get_default( opts, 'word_sep', 0.03 );
            slide.Rect.prototype.create.call( this, 0, 0, opts );
	    this._char_width();
	    this.padding = 0.02;
	    this.max_width = this.max_chars*this.char_width + 2*this.padding;
	    this.max_height = this.max_lines*this.line_height + 2*this.padding;
	    this.w = get_default( opts, 'width', this.max_width );
	    this.h = get_default( opts, 'height', this.max_height );
            this.txt = get_default( opts, 'text', '');
	    this.font_fill = opts.font_fill;
	    this.use_prompt = opts.use_prompt;

	    // If we were given a stream, add it as a child.
	    if( this.txt.stream !== undefined )
		this.add_child( this.txt );
    	},

    	render: function() {
	    slide.Rect.prototype.render.call( this );

	    if( this.font_fill )
		this.pjs.fill( this.font_fill );
	    this.pjs.textAlign( this.pjs.LEFT, this.pjs.CENTER );

	    // Are we using a basic text block or a stream?
	    var txt;
	    if( this.txt.stream !== undefined )
		txt = this.txt.stream;
	    else
		txt = this.txt;

	    var ppp = slide.camera.ppp;
	    this._char_width();
	    var y = this.y + 0.5*this.h - this.padding - 0.5*this.line_height, pos = txt.length;
	    var first = true;
	    while( pos > 0 ) {
		if( y - 0.5*this.line_height < this.y - 0.5*this.h + 0.95*this.padding )
		    break;

		// Do we want the prompt?
	    	var x;
		if( first && this.use_prompt ) {
		    first = false;
		    x = this.x - 0.5*this.w + this.padding;
		    var prompt = '$ ' + ((this.pjs.frameCount%20 < 10) ? '_' : '');
		    this.pjs.text( prompt, x*ppp, y*ppp );
		    y -= this.line_height;
		    if( y - 0.5*this.line_height < this.y - 0.5*this.h + 0.95*this.padding )
			break;
		}

		// Extract first (last) line.
		var start = txt.lastIndexOf( '\n', pos - 1 );
		if( start == -1 )
		    start = 0;
		else if( start > pos )
		    start = pos;
		else
		    ++start;

		// Split over multiple lines if too long.
		var n_splits = Math.floor( (pos - start)/this.max_chars );
		var remainder = (pos - start) - n_splits*this.max_chars;

		// Begin by rendering the remainder.
	    	x = this.x - 0.5*this.w + this.padding;
		for( var ii = pos - remainder; ii < pos; ++ii ) {
	    	    var ch = txt[ii];
	    	    this.pjs.text( ch, x*ppp, y*ppp );
	    	    x += this.char_width;
		}

		// Only add this extra line if we just printed some remainder,
		// or if there are also no full lines to print.
		if( remainder || !n_splits )
		    y -= this.line_height;

		// Now render the split lines.
		for( var ii = 0; ii < n_splits; ++ii ) {
		    if( y - 0.5*this.line_height < this.y - 0.5*this.h + 0.95*this.padding )
			break;
	    	    x = this.x - 0.5*this.w + this.padding;
		    var term = pos - remainder - ii*this.max_chars
		    for( var jj = term - this.max_chars; jj < term; ++jj ) {
	    		var ch = txt[jj];
	    		this.pjs.text( ch, x*ppp, y*ppp );
	    		x += this.char_width;
		    }
		    y -= this.line_height;
		}

		pos = start - 1;
	    }
    	},

	_char_width: function() {
            this.pjs.textFont( this.font, this.font_size*slide.camera.ppp );
	    this.char_width = this.pjs.textWidth( 'a' )*slide.camera.ppp_inv*this.scale;
            this.line_height = (this.pjs.textAscent() + this.pjs.textDescent())*slide.camera.ppp_inv*this.scale;
	}
    });

    var Stream = slide.Entity.extend({

	create: function( txt ) {
	    slide.Entity.prototype.create.call( this );
	    this.lines = txt.split( '\n' );
	    this.prompt = '$ ';
	    this.caret = '_';
	    this.stream = '';
	},

	enter: function() {
	    this.line = 0;
	    this.col = 0;
	    this._history = '';
	    this._done = false;
	},

	update: function( tick ) {
	    if( this.pjs.frameCount%2 == 0 && !this._done ) {
		var line = this.lines[this.line].slice( 0, this.col + 1 );
		this._stream = this._history + this.prompt + line
		if( ++this.col >= this.lines[this.line].length ) {
		    this._history += line + '\n';
		    if( ++this.line >= this.lines.length ) {
			this.line = 0;
			this._done = true;
		    }
		    this.col = 0;
		}
	    }
	    this.stream = this._stream + ((this.pjs.frameCount%20 < 10) ? this.caret : '');
	}
    });

    var terminal = function( opts ) {
	return new Terminal( opts );
    }

    var stream = function( opts ) {
	return new Stream( opts );
    }

    slide.terminal = terminal;
    slide.stream = stream;

}( window.slide = window.slide || {} ));
