(function( slide, undefined ) {

    var apply_relative = function( tp, abs ) {
        if( abs === undefined )
            abs = tp.abs;
        tp.value = abs;
        if( !isNaN( tp.rel ) )
            tp.value += tp.rel;
    }

    var resolve_timepoint = function( tp ) {
        tp.value = undefined;
        if( !isNaN( tp.abs ) )
            apply_relative( tp );
        else if( tp.abs !== undefined ) {
            if( !isNaN( tp.abs.value ) )
                apply_relative( tp, tp.abs.value );
        }
        return isNaN( tp.value );
    }

    var timepoint = function( value ) {
        var tp;
        if( value !== undefined && value.constructor === Array ) {
            tp = { abs: value[0], rel: value[1] };
        }
        else
            tp = { abs: value };
        resolve_timepoint( tp );
        return tp;
    }

    var _key_listeners = [];

    var add_key_listener = function( listener ) {
        _key_listeners.push( listener );
    }

    var key_typed = function() {
        var jj = 0;
        for( var ii = 0; ii < _key_listeners.length; ++ii ) {
            if( _key_listeners[ii].key_typed() != true ) {
                if( ii != jj )
                    _key_listeners[jj] = _key_listeners[ii];
                ++jj;
            }
        }
        _key_listeners.length = jj;
    }

    var Entity = Class({

        create: function( warp ) {

            // Nothing given.
            if( warp === undefined ) {
                this.b = timepoint();
                this.c = timepoint();
            }

            // Both start and duration.
            else if( warp.constructor === Array ) {
                this.b = timepoint( warp[0] );
                if( warp[1] !== undefined )
                    this.c = timepoint( [this.b, warp[1]] );
                else
                    this.c = timepoint();
            }

            // Just duration specified.
            else {
                this.b = timepoint();
                this.c = timepoint( [this.b, warp] );
            }

            // Store a reference to the sketch.
            this.pjs = Processing.getInstanceById( 'sketch' );
        },

        prepare: function() {
        },

        display: function() {
        },

        update: function( tick ) {
        },

        done: function( tick ) {
            return tick > this.c.value;
        },

        resolve_timepoint: function( tp ) {
            return resolve_timepoint( tp );
        }
    });

    var Ticker = Class({

        create: function() {
            this.i = 0;
            this.paused = false;
        },

        update: function() {
            if( !this.paused )
                ++this.i;
        }
    });

    var Camera = Class({

        create: function( width, height ) {
            if( width !== undefined && height !== undefined )
                this.initialise( width, height );
        },

        initialise: function( width, height ) {
            if( width === undefined )
                width = screen.width;
            if( height === undefined )
                height = screen.height;

	    var scaler = (width < height) ? width : height;

            this.ppp     = 0.5*scaler;
	    this.ppp_inv = 1.0/this.ppp;
            this.pwidth  = width*this.ppp_inv;
            this.pheight = height*this.ppp_inv;
            this.pxoffs  = 0.5*this.pwidth;
            this.pyoffs  = 0.5*this.pheight;
	    this.w = this.pwidth;
	    this.h = this.pheight;

            slide.scene.x = this.pxoffs;
            slide.scene.y = this.pyoffs;
        }
    });

    var Timeline = Entity.extend({

        create: function( warp ) {
            Entity.prototype.create.call( this, warp );
            this.entities = [];
            this.active = [];
        },

        add_entity: function( ent ) {
            this.entities.push( ent );
        },

        prepare: function() {
            if( this.entities.length > 0 ) {
                var invalid = false;

                // Prepare all entities contained in the timeline to ensure
                // we have all warps set.
                for( var ii = 0; ii < this.entities.length; ++ii )
                    invalid |= this.entities[ii].prepare();

                // If the entity set is not yet valid then wait.
                if( invalid )
                    return true;

                // Sort the entities based on the start time.
                this.entities.sort( function( a, b ){ return a.b.value - b.b.value; });

                // Resolve my duration.
		this.b = { value: this.entities[0].b.value };
		this.c = { value: this.entities[0].c.value };
                for( var ii = 1; ii < this.entities.length; ++ii ) {
                    if( this.entities[ii].c.value > this.c.value )
                        this.c.value = this.entities[ii].c.value;
                    if( this.entities[ii].b.value < this.b.value )
                        this.b.value = this.entities[ii].b.value;
                }

                // return isNaN( this.c.value );
            }
        },

        update: function( tick ) {

            // Add ready entities.
            while( this.entities.length > 0 && this.entities[0].b.value <= tick )
                this.active.push( this.entities.shift() );

            // Remove finished active entities and update.
            // TODO: Optimise array reduction.
            var new_act = [];
            for(var ii = 0; ii < this.active.length; ++ii ) {
                var ent = this.active[ii];
                if( !ent.done( tick ) ) {
                    ent.update( tick );
                    new_act.push( ent );
                }
            }
            this.active = new_act;
        }
    });

    var Transition = Class({

        create: function( x, y, obj, name ) {
            this.x = x;
            this.y = y;
            this.w = y - x;
            this.objs = [];
            if( obj != undefined && name != undefined )
                this.add_obj( obj, name );
        },

        add_obj: function( obj, name ) {
            this.objs.push( [obj, name] );
        },

        update: function( interp ) {
            var v = this.x + interp*this.w;
            for( var ii = 0; ii < this.objs.length; ++ii )
                this.objs[ii][0][this.objs[ii][1]] = v;
        }
    });

    var Node = Entity.extend({

        create: function( orig, scale, warp ) {
            Entity.prototype.create.call( this, warp );

            this.children = new Timeline();
            this.tweens = new Timeline();

            if( orig === undefined ) {
                this.x = 0;
                this.y = 0;
            }
            else if( orig.constructor === Array ) {
                this.x = orig[0];
                this.y = orig[1];
            }
            else {
                this.x = orig;
                this.y = orig;
            }
            if( scale === undefined )
                this.scale = 1;
            else
                this.scale = scale;
            this.w = undefined;
            this.h = undefined;
        },

        add_child: function( node ) {
            this.children.add_entity( node );
            node.parent = this;
	    return this;
        },

        add_tween: function( name, a, b, tween ) {
            var trans = new Transition( a, b, this, name );
            tween.add_transition( trans );
            this.tweens.add_entity( tween );
            tween.parent = this;
            if( this.tweens.entities.length > 0 )
                tween.sibling = this.tweens.entites[this.tweens.entites.length - 1];
            return tween;
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
                this.b.rel = 0;
            }
            invalid |= resolve_timepoint( this.b );

            // Process children regardless of resolving our warp.
            invalid |= this.children.prepare( this );
            invalid |= this.tweens.prepare( this );

            // Only finalise if we were able to complete the children
            // and tweens.
            if( invalid )
                return true;

            // If the end of our warp is undefined, try to use either the
            // children or tween.
            if( this.c.abs === undefined ) {
                if( this.children.c.value === undefined )
                    this.c.value = this.tweens.c.value;
                else if( this.tweens.c.value === undefined )
                    this.c.value = this.children.c.value;
                else
                    this.c.value = Math.max( this.children.c.value, this.tweens.c.value );

                // If we still couldn't get a finish time, try to adopt
                // any parent's value.
                if( this.c.value === undefined ) {
                    var par = this.parent;
                    while( par !== undefined && par.c.value === undefined )
                        par = par.parent;
                    if( par !== undefined )
                        this.c.value = par.c.value;
                }
            }
            else
                resolve_timepoint( this.c );

            return isNaN( this.c.value );
        },

        update: function( tick ) {
            this.children.update( tick );
            this.tweens.update( tick );

	    // Aggregate children sizes.
	    var w = 0, h = 0;
	    if( this.children.active.length ) {
		w = this.children.active[0].w;
		h = this.children.active[0].h;
		for( var ii = 0; ii < this.children.active.length; ++ii ) {
		    var cw = this.children.active[ii].w;
		    var ch = this.children.active[ii].h;
		    if( cw > w ) w = cw;
		    if( ch > h ) h = ch;
		}
	    }
	    this.children.w = w;
	    this.children.h = h;
        },

        display: function() {
            this.pjs.pushMatrix();
            this.pjs.translate( this.x*slide.camera.ppp, this.y*slide.camera.ppp );
            this.pjs.scale( this.scale );
            this.render();
            for( var ii = 0; ii < this.children.active.length; ++ii )
                this.children.active[ii].display();
            this.pjs.popMatrix();
        },

        render: function() {
        }
    });

    var Scene = Node.extend({

        create: function() {
            Node.prototype.create.call( this, [0, 0], 1, [0, undefined] );
        },

	update: function( tick ) {
	    this.w = slide.camera.w;
	    this.h = slide.camera.h;
	    Node.prototype.update.call( this, tick );
	},

        prepare: function() {

            // Repeat the prepare call until all succeed.
            var ii = 0;
            while( Node.prototype.prepare.call( this ) && ii < 100 )
                ++ii;
            if( ii == 100 )
                throw new Error( 'Failed to prepare slides.' );
        }
    });

    var Shape = Node.extend({

        create: function( sh, size, orig, scale, warp ) {
            Node.prototype.create.call( this, orig, scale, warp );
            this.sh = sh;
            if( size === undefined ) {
                this.w = 1;
                this.h = 1;
            }
            else if( size.constructor === Array ) {
                this.w = size[0];
                this.h = size[1];
            }
            else {
                this.w = size;
                this.h = size;
            }
        },

        render: function() {
            this.pjs.pushStyle(); // shapes can change styles
            this.pjs.shape( this.sh, 0, 0, this.w*slide.camera.ppp, this.h*slide.camera.ppp );
            this.pjs.popStyle();
            this.pjs.ellipseMode( this.pjs.CENTER ); // can also be changed
        }
    });

    var Text = Node.extend({

        create: function( txt, font, orig, scale, warp ) {
            Node.prototype.create.call( this, orig, scale, warp );
            this.txt = txt;
            this.font = font;
        },

	update: function( tick ) {
            this.pjs.textFont( this.font, 0.03*slide.camera.ppp );
            this.w = this.pjs.textWidth( this.txt )*slide.camera.ppp_inv*this.scale;
	    this.h = (this.pjs.textAscent() + this.pjs.textDescent())*slide.camera.ppp_inv*this.scale;
	},

        render: function() {
	    this.pjs.textAlign( this.pjs.CENTER, this.pjs.CENTER );
            this.pjs.textFont( this.font, 0.03*slide.camera.ppp );
            this.pjs.text( this.txt, 0, 0 );
        }
    });

    // TODO: This should be entity.
    var Pause = Node.extend({

        create: function( tp ) {
            Node.prototype.create.call( this, 0, 1, [tp, 0] );
            this.triggered = false;
        },

        update: function( tick ) {
            if( this.triggered == false ) {
                this.triggered = true;
                slide.ticker.paused = true;
                add_key_listener( this );
            }
        },

        key_typed: function() {
            slide.ticker.paused = false;
            return true;
        }
    });

    var Boxed = Node.extend({

        update: function( tick ) {
            if( this.parent !== undefined ) {
                this.w = this.parent.w;
                this.h = this.parent.h;
            }
            Node.prototype.update.call( this, tick );
        }
    });

    var HCentered = Boxed.extend({

        create: function() {
            Boxed.prototype.create.call( this, 0, 1 );
        },

        update: function( tick ) {
            Boxed.prototype.update.call( this, tick );

            // Set offset.
            // this.x = 0.5*(this.w - this.children.w);
        }
    });

    var HRight = Boxed.extend({

        create: function( margin ) {
            Boxed.prototype.create.call( this, 0, 1 );
	    this.margin = (margin !== undefined) ? margin : 0;
        },

        update: function( tick ) {
            Boxed.prototype.update.call( this, tick );

            // Set offset.
            this.x = 0.5*(this.w - this.children.w) - this.margin;
        }
    });

    var setup = function() {
        slide.ticker = new Ticker();
        slide.camera = new Camera();
        slide.scene = new Scene();
    }

    var ralign = function( margin ) {
	return new HRight( margin );
    }

    var text = function( txt, font, orig, scale, warp ) {
	return new Text( txt, font, orig, scale, warp );
    }

    slide.Entity = Entity;
    slide.Timeline = Timeline;
    slide.Transition = Transition;
    slide.Node = Node;
    slide.Shape = Shape;
    slide.Text = Text;
    slide.Pause = Pause;
    slide.Boxed = Boxed;
    slide.HCentered = HCentered;
    slide.HRight = HRight;

    slide.timepoint = timepoint;
    slide.resolve_timepoint = resolve_timepoint;
    slide.key_typed = key_typed;
    slide.setup = setup;

    slide.ralign = ralign;
    slide.text = text;

}( window.slide = window.slide || {} ));
