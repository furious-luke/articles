(function( slide, undefined ) {

    var Tween = slide.Entity.extend({

        create: function( warp ) {
            slide.Entity.prototype.create.call( this, warp );
            this.interp = undefined;
            this.transitions = [];
        },

        add_transition: function( trans ) {
            this.transitions.push( trans );
        },

        prepare: function() {
            var invalid = false;

            // If our warp start is undefined, try to use the end of
            // any sibling, otherwise use the start of the parent.
            if( this.b.abs === undefined ) {
                if( this.sibling !== undefined )
                    this.b.abs = this.sibling.c;
                else
                    this.b.abs = this.parent.b;
            }

            invalid |= this.resolve_timepoint( this.b );
            invalid |= this.resolve_timepoint( this.c );
            if( invalid )
                return true;

            this.w = this.c.value - this.b.value;
            return false;
        },

	enter: function() {

	    // Tweens often need some setup to handle taking the
	    // starting point of transisions. Call all the transitions
	    // to set themselves up.
	    for( var ii = 0; ii < this.transitions.length; ++ii )
		this.transitions[ii].enter( this );
	},

        update: function( t ) {
            this.calc_t( t );
            for( var ii = 0; ii < this.transitions.length; ++ii )
                this.transitions[ii].update( this.interp );
        },

        calc_t: function( t ) {
            if( t <= this.b.value ) {
                this.t = 0.0;
                this.interp = 0.0;
            }
            if( t >= this.c.value ) {
                this.t = 1.0;
                this.interp = 1.0;
            }
            else {
                this.t = (t - this.b.value)/this.w;
                this.interp = this.calc_interp( this.t );
            }
        }
    });

    var TweenLinear = Tween.extend({

        calc_interp: function( t ) {
            return t;
        }
    });

    var TweenBackIn = Tween.extend({

        calc_interp: function( t ) {
            return t*t*(2.70158*t - 1.70158);
        }
    });

    var TweenBackOut = Tween.extend({

        calc_interp: function( t ) {
            t = t - 1;
            return (t*t*(2.70158*t + 1.70158) + 1);
        }
    });

    var TweenBack = Tween.extend({

        calc_interp: function( t ) {
            t *= 2;
            if( t < 1 )
                return 0.5*t*t*(3.59491*t - 2.59491);
            else {
                t -= 2;
                return 0.5*(t*t*(3.59491*t + 2.59491) + 2);
            }
        }
    });

    var Quartic = Tween.extend({

        calc_interp: function( t ) {
	    t *= 2;
	    if( t < 1 )
		return 0.5*t*t*t*t;
	    else {
		t -= 2;
		return -0.5*(t*t*t*t - 2);
	    }
        }
    });

    var QuarticIn = Tween.extend({

        calc_interp: function( t ) {
	    return t*t*t*t;
        }
    });

    var QuarticOut = Tween.extend({

        calc_interp: function( t ) {
	    --t;
	    return -(t*t*t*t - 1);
        }
    });

    var QuinticOut = Tween.extend({

        calc_interp: function( t ) {
	    --t;
	    return (t*t*t*t*t + 1);
        }
    });

    var ElasticEaseOut = Tween.extend({

        calc_interp: function( t ) {
            var p = 0.3;
            var a = 1.0;
            var s = p/4.0;
            return (a*this.pjs.pow(2.0, -10.0*t)*this.pjs.sin((t - s)*(2*this.pjs.PI)/p) + 1.0);
        }
    });

    var linear = function( warp ) {
	return new TweenLinear( warp );
    }

    var back = function( warp ) {
	return new TweenBack( warp );
    }

    var back_in = function( warp ) {
	return new TweenBackIn( warp );
    }

    var back_out = function( warp ) {
	return new TweenBackOut( warp );
    }

    var quartic = function( warp ) {
	return new Quartic( warp );
    }

    var quartic_in = function( warp ) {
	return new QuarticIn( warp );
    }

    var quartic_out = function( warp ) {
	return new QuarticOut( warp );
    }

    var quintic_out = function( warp ) {
	return new QuinticOut( warp );
    }

    var elastic_out = function( warp ) {
	return new ElasticEaseOut( warp );
    }

    slide.tweens = {};
    slide.tweens.Tween = Tween;
    slide.tweens.TweenLinear = TweenLinear;
    slide.tweens.TweenBackIn = TweenBackIn;
    slide.tweens.TweenBackOut = TweenBackOut;
    slide.tweens.TweenBack = TweenBack;
    slide.tweens.Quartic = Quartic;
    slide.tweens.QuarticOut = QuarticOut;
    slide.tweens.QuinticOut = QuinticOut;
    slide.tweens.ElasticEaseOut = ElasticEaseOut;

    slide.tweens.linear = linear;
    slide.tweens.back = back;
    slide.tweens.back_in = back_in;
    slide.tweens.back_out = back_out;
    slide.tweens.quartic = quartic;
    slide.tweens.quartic_in = quartic_in;
    slide.tweens.quintic_out = quintic_out;
    slide.tweens.elastic_out = elastic_out;

}( window.slide = window.slide || {} ));
