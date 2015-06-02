(function( slide, undefined ) {

    var Tween = slide.Entity.extend({

        create: function( b, c ) {
            slide.Entity.prototype.create.call( this, [b, c] );
            this.w = this.c - this.b;
            this.interp = undefined;
            this.transitions = [];
        },

        add_transition: function( trans ) {
            this.transitions.push( trans );
        },

        update: function( t ) {
            this.calc_t( t );
            for( var ii = 0; ii < this.transitions.length; ++ii )
                this.transitions[ii].update( this.interp );
        },

        calc_t: function( t ) {
            if( t <= this.b ) {
                this.t = 0.0;
                this.interp = 0.0;
            }
            if( t >= this.c ) {
                this.t = 1.0;
                this.interp = 1.0;
            }
            else {
                this.t = (t - this.b)/this.w;
                this.interp = this.calc_interp( this.t );
            }
        }
    });

    var TweenLinear = Tween.extend({

        create: function( b, c ) {
            Tween.prototype.create.call( this, b, c );
        },

        calc_interp: function( t ) {
            return t;
        }
    });

    var TweenBackIn = Tween.extend({

        create: function( b, c ) {
            Tween.prototype.create.call( this, b, c );
        },

        calc_interp: function( t ) {
            return t*t*(2.70158*t - 1.70158);
        }
    });

    var TweenBackOut = Tween.extend({

        create: function( b, c ) {
            Tween.prototype.create.call( this, b, c );
        },

        calc_interp: function( t ) {
            t = t - 1;
            return (t*t*(2.70158*t + 1.70158) + 1);
        }
    });

    var TweenBack = Tween.extend({

        create: function( b, c ) {
            Tween.prototype.create.call( this, b, c );
        },

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

        create: function( b, c ) {
            Tween.prototype.create.call( this, b, c );
        },

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
