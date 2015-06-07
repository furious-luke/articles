(function( slide, undefined ) {

    slide.helpers = {};

    slide.helpers.left = function() {
	return [-0.21*slide.camera.w, 0.02*slide.camera.h];
    }

    slide.helpers.center = function() {
	return [0, 0.02*slide.camera.h];
    }

    slide.helpers.right = function() {
	return [0.21*slide.camera.w, 0.02*slide.camera.h];
    }

    slide.helpers.container = function( tp ) {
	var ctr = new slide.Boxed( 0, 1, [tp, undefined] );
	slide.scene.add_child( ctr );
	slide.helpers._ctr = ctr;
	return ctr;
    }

    slide.helpers.heading = function( txt, tp, opts ) {
	opts = opts || {};
	var hdr = slide.helpers._ctr.add_child(
	    slide.lalign( 0.05*slide.camera.w )
	).add_child(
	    slide.text(
		txt, get_default( opts, 'font', slide.default_font ), {
		    origin: [0, -0.42*slide.camera.h],
		    font_size: 0.15,
		    warp: [tp, undefined]
		}
	    )
	);
	return hdr;
    }

    slide.helpers.enter_left = function( node, tp, opts ) {
	node.add_tween(
    	    slide.tweens.back_out([ tp, 20 ]), 'x', function( obj ) {
    		return [-0.5*(slide.camera.w + obj.w), 0];
    	    }
	);
    }

    slide.helpers.exit_left = function( node, tp, opts ) {
	node.add_tween(
    	    slide.tweens.back_in([ tp, 20 ]), 'x', function( obj ) {
    		return [0, -0.5*(slide.camera.w + obj.w)];
    	    }
	);
    }

    slide.helpers.pop_in = function( node, tp, opts ) {
	opts = opts || {};
	node.add_tween(
	    slide.tweens.elastic_out([ tp, 20 ]),
	    'scale', get_default( opts, 'start_scale', 0.5 ), 1
	);
    }

    slide.helpers.move_left = function( node, tp, opts ) {
	opts = opts || {};
	node.add_tween(
	    slide.tweens.quartic([ tp, 20 ]),
	    'x', function( obj ) {
		return [obj.x, slide.helpers.left()[0]];
	    }
	);
    }

    slide.helpers.move_right = function( node, tp, opts ) {
	opts = opts || {};
	node.add_tween(
	    slide.tweens.quartic([ tp, 20 ]),
	    'x', function( obj ) {
		return [obj.x, slide.helpers.right()[0]];
	    }
	);
    }

    slide.helpers.list = function( items, tp, opts ) {
	opts = opts || {};
	var node = slide.helpers._ctr.add_child(
    	    slide.list(
    		items, get_default( opts, 'font', slide.default_list_font ), {
    		    warp: [tp, 30],
    		    font_size: 0.1,
    		    origin: [
			get_default( opts, 'x', slide.helpers.right()[0] ),
			get_default( opts, 'y', 0 )
		    ]
    		}
	    )
	);
	return node;
    }

    slide.helpers.fade_out = function( node, tp, opts ) {
	opts = opts || {};
	node.add_tween( slide.tweens.linear([ tp, 10 ]), 'alpha', 255, 0 );
    }

    slide.helpers.fade_in = function( node, tp, opts ) {
	opts = opts || {};
	node.add_tween( slide.tweens.linear([ tp, 10 ]), 'alpha', 0, 255 );
    }

    slide.helpers.terminal = function( txt, tp, opts ) {
	var term = slide.helpers._ctr.add_child(
    	    slide.terminal({
    		text: txt,
    		origin: [get_default( opts, 'x', 0 ), 0.035*slide.camera.h],
		warp: [tp, opts.duration],
    		radius: 0.02,
    		fill: slide.palette.base03,
    		font: get_default( opts, 'font', slide.default_mono_font ),
    		font_size: 0.07,
    		columns: get_default( opts, 'columns', 64 ),
    		rows: get_default( opts, 'rows', 20 ),
    		height: 0.03*slide.camera.h,
    		font_fill: slide.palette.base06,
		use_prompt: false
    	    })
	);
	term.add_tween(
    	    slide.tweens.back_out([ tp, 10 ]), 'w', 0, term.max_width
	).add_tween(
    	    slide.tweens.back_out([ [undefined, 5], 10 ]), 'h', 0.03*slide.camera.h, term.max_height
	);
	return term;
    }

    slide.helpers.tv_off = function( node, tp, opts ) {
	opts = opts || {};
	node.add_tween(
    	    slide.tweens.back_in([ [tp, -25], 10 ]), 'h', node.max_height, 0.03*slide.camera.h
	).add_tween(
    	    slide.tweens.back_in([ [undefined, 5], 10 ]), 'w', node.max_width, 0
	);
    }

    slide.helpers.left_terminal = function( txt, tp, opts ) {
	opts = opts || {};
	opts.columns = get_default( opts, 'columns', 40 );
	opts.x = get_default( opts, 'x', -0.1*slide.camera.w );
	return slide.helpers.terminal( txt, tp, opts );
    }

    slide.helpers.pause = function( tp ) {
	slide.helpers._ctr.add_child( slide.pause( tp ) );
    }

}( window.slide = window.slide || {} ));
