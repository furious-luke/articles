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

    slide.helpers.heading_open = function( ctr, txt, tp, opts ) {
	opts = opts || {};
	var hdr = ctr.add_child(
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

    slide.helpers.heading_close = function( hdr, tp, opts ) {
	hdr.add_tween(
    	    slide.tweens.back_in([ tp, 20 ]), 'x', function( obj ) {
    		return [0, -0.05*slide.camera.w - obj.w];
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

    slide.helpers.list = function( ctr, items, tp, opts ) {
	opts = opts || {};
	var node = ctr.add_child(
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

}( window.slide = window.slide || {} ));
