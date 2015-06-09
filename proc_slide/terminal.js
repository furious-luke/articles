(function( slide, undefined ) {

    var Terminal = slide.Rect.extend({

        create: function( opts ) {
    	    opts = opts || {};
	    this.max_chars = get_default( opts, 'columns', 80 );
	    this.max_lines = get_default( opts, 'rows', 25 );
    	    this.font = get_default( opts, 'font', 'monospace' );
    	    this.font_size = get_default( opts, 'font_size', 0.03 );
    	    this.line_sep = get_default( opts, 'line_sep', 80*this.font_size );
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
	    this.highlighter = opts.highlighter;

	    // If we were given a stream, add it as a child.
	    if( this.txt.stream !== undefined )
		this.add_child( this.txt );
    	},

    	render: function() {
	    slide.Rect.prototype.render.call( this );
	    var ppp = slide.camera.ppp;

	    if( this.font_fill )
		this.pjs.fill( this.font_fill );
	    this.pjs.textAlign( this.pjs.LEFT, this.pjs.CENTER );
	    this._char_width();

	    // Are we using a basic text block or a stream?
	    var txt;
	    if( this.txt.stream !== undefined )
		txt = this.txt.stream;
	    else
		txt = this.txt;

	    // Run the highlighter.
	    var colors = this.highlighter ? this.highlighter.apply( txt ) : [];

	    var y = this.y + 0.5*this.h - this.padding - 0.5*this.line_height, pos = txt.length;
	    var first = true;
	    y -= this.line_height*this._start_line();
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
		if( remainder )
		    x += (remainder - 1)*this.char_width;
		for( var ii = pos - 1; ii >= pos - remainder; --ii ) {
	    	    var ch = txt[ii];
		    this._set_text_color( ii, colors );
	    	    this.pjs.text( ch, x*ppp, y*ppp );
	    	    x -= this.char_width;
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
		    x += (this.max_chars - 1)*this.char_width;
		    var term = pos - remainder - ii*this.max_chars
		    for( var jj = term - 1; jj >= term - this.max_chars; --jj ) {
	    		var ch = txt[jj];
			this._set_text_color( jj, colors );
	    		this.pjs.text( ch, x*ppp, y*ppp );
	    		x -= this.char_width;
		    }
		    y -= this.line_height;
		}

		pos = start - 1;
	    }
    	},

	_set_text_color: function( pos, colors ) {
	    if( colors.length == 0 )
	    	return;
	    var ii = colors.length - 1;
	    if( colors[ii][1] - 1 == pos ) {
	    	this.pjs.fill( colors[ii][2] );
	    }
	    else if( colors[ii][0] - 1 == pos ) {
		if( this.font_fill )
		    this.pjs.fill( this.font_fill );
		else
	    	    this.pjs.fill( this.default_fill );
	    	colors.pop();
	    }
	},

	_start_line: function() {

	    // Are we using a basic text block or a stream?
	    var txt;
	    if( this.txt.stream !== undefined )
	    	txt = this.txt.stream;
	    else
	    	txt = this.txt;

	    var y = this.y + 0.5*this.h - this.padding - 0.5*this.line_height, pos = txt.length;
	    var first = true, n_lines = 0;
	    while( pos > 0 ) {
	    	if( y - 0.5*this.line_height < this.y - 0.5*this.h + 0.95*this.padding )
	    	    break;

	    	// Do we want the prompt?
	    	var x;
	    	if( first && this.use_prompt ) {
	    	    first = false;
	    	    ++n_lines;
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

	    	// Only add this extra line if we just printed some remainder,
	    	// or if there are also no full lines to print.
	    	if( remainder || !n_splits ) {
	    	    ++n_lines;
	    	    y -= this.line_height;
	    	}

	    	// Now render the split lines.
	    	for( var ii = 0; ii < n_splits; ++ii ) {
	    	    if( y - 0.5*this.line_height < this.y - 0.5*this.h + 0.95*this.padding )
	    		break;
	    	    ++n_lines;
	    	    y -= this.line_height;
	    	}

	    	pos = start - 1;
	    }

	    return this.max_lines - n_lines;
	},

	_char_width: function() {
            this.pjs.textFont( this.font, this.font_size*slide.camera.ppp );
	    this.char_width = this.pjs.textWidth( 'a' )*slide.camera.ppp_inv*this.scale;
            this.line_height = (this.pjs.textAscent() + this.pjs.textDescent() + this.line_sep)*slide.camera.ppp_inv*this.scale;
	}
    });

    var StreamEntry = slide.Entity.extend({

	create: function( strm, txt, tp, opts ) {
	    slide.Entity.prototype.create.call( this, [tp, 0] );
	    this.stream = strm;
	    this.text = txt;
	},

	update: function( tick ) {
	    if( this._push_tick != tick ) {
		this.stream.push( this.text );
		this._push_tick = tick;
	    }
	}
    });

    var Stream = slide.Node.extend({

	create: function( txt, opts ) {
	    opts = opts || {};
	    slide.Node.prototype.create.call( this, 0, 1, [opts.b, opts.c] );
	    if( txt === undefined )
		this.lines = [];
	    else if( txt.constructor === Array )
		this.lines = txt;
	    else
		this.lines = txt.split( '\n' );
	    this.prompt = get_default( opts, 'prompt', '$ ' );
	    this.caret = '_';
	    this.stream = '';
	},

	entry: function( txt, opts ) {
	    opts = opts || {};
	    var tp;
	    if( opts.b === undefined )
		tp = this.get_last_child().c;
	    else
		tp = opts.b;
	    var entry = this.add_child( new StreamEntry( this, txt, tp, opts ) );
	    if( !opts.no_pause )
		this.pause( get_default( opts, 'pause_delay', 10 ) );
	    return entry;
	},

	raw_entry: function( txt, opts ) {
	    opts = opts || {};
	    opts.pause_delay = 1;
	    return this.entry( slide.stream.raw( txt ), opts );
	},

	push: function( txt ) {
	    this._done = false;
	    this.lines.push( txt );
	},

	enter: function() {
	    this.line = 0;
	    this.col = 0;
	    this._history = '';
	    this._stream = this.prompt;
	    this._done = this.lines.length == 0;
	    this._delay = 0;
	    this._delay_tick = 0;

	    this._pause_help = '';
	},

	update: function( tick ) {
	    slide.Node.prototype.update.call( this, tick );

	    if( !this._delay ) {
		if( this.pjs.frameCount%2 == 0 && !this._done ) {
		    var line = this.lines[this.line];

		    // Check for a delay command.
		    if( typeof line === 'number' && (line%1) === 0 ) {
			this._delay = line;
			if( ++this.line >= this.lines.length )
			    this._done = true;
		    }

		    // Check for a raw block.
		    else if( typeof line === 'object' ) {
			this._stream = this._history + line.txt;
			this._history += line.txt;
			if( line.txt.length > 0 ) {
			    this._stream += '\n';
			    this._history += '\n';
			}
			this._stream += this.prompt;
			if( ++this.line >= this.lines.length )
			    this._done = true;
			this.col = 0;
		    }

		    // Else it's a command.
		    else {
			line = line.slice( 0, this.col + 1 );
			this._stream = this._history + this.prompt + line
			if( ++this.col >= this.lines[this.line].length ) {
			    this._history += this.prompt + line + '\n';
			    if( ++this.line >= this.lines.length )
				this._done = true;
			    this.col = 0;
			}
		    }
		}
	    }
	    else if( tick != this._delay_tick ) {
		--this._delay;
		this._delay_tick = tick;
	    }
	    this.stream = this._stream + ((this.pjs.frameCount%20 < 10) ? this.caret : ' ');
	}
    });

    var Highlighter = Class({

	create: function( syntax ) {
	    this.syntax = syntax;
	    this.update();
	},

	update: function() {
	    var kws = [];
	    for( var ii = 0; ii < this.syntax.length; ++ii ) {
		var kw = this.syntax[ii][0];
		kws.push( kw );
	    }
	    var expr = kws.join( '|' );
	    this.prog = new RegExp( expr, 'g' );
	},

	apply: function( txt ) {
	    var words = [];
	    this.prog.lastIndex = 0;
	    do {
		var match = this.prog.exec( txt );
		if( match ) {
		    var ii = 1;
		    for( ; ii < this.syntax.length; ++ii ) {
			if( match[ii] )
			    break;
		    }
		    var val = [this.prog.lastIndex - match[ii].length, this.prog.lastIndex, this.syntax[ii - 1][1]];
		    words.push( val );
		}
	    } while( match );
	    return words;
	}
    });

    var terminal = function( opts ) {
	return new Terminal( opts );
    }

    var stream = function( opts ) {
	return new Stream( opts.text, opts );
    }

    stream.raw = function( txt ) {
	return { txt: txt };
    }

    slide.Highlighter = Highlighter;

    slide.terminal = terminal;
    slide.stream = stream;

}( window.slide = window.slide || {} ));
