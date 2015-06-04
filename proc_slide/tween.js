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

        prepare: function( parent, sibling ) {
            if( parent !== undefined )
                parent._sibling = this;
            var invalid = false;

            // If our warp start is undefined, try to use the end of
            // any sibling, otherwise use the start of the parent.
            if( this.b.abs === undefined ) {
                if( sibling !== undefined )
                    this.b.abs = sibling.c;
                else
                    this.b.abs = parent.b;
                this.b.rel = 0;
            }

            invalid |= this.resolve_timepoint( this.b );
            invalid |= this.resolve_timepoint( this.c );
            if( invalid )
                return true;
            this.w = this.c.value - this.b.value;
            return false;
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

    var ElasticEaseOut = Tween.extend({

        calc_interp: function( t ) {
            var p = 0.3;
            var a = 1.0;
            var s = p/4.0;
            return (a*this.pjs.pow(2.0, -10.0*t)*this.pjs.sin((t - s)*(2*this.pjs.PI)/p) + 1.0);
        }
    });

    slide.Tween = Tween;
    slide.TweenLinear = TweenLinear;
    slide.TweenBackIn = TweenBackIn;
    slide.TweenBackOut = TweenBackOut;
    slide.TweenBack = TweenBack;
    slide.ElasticEaseOut = ElasticEaseOut;

}( window.slide = window.slide || {} ));
