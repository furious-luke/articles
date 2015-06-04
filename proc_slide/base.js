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

            this.ppp     = 0.5*width;
            this.pwidth  = width/this.ppp;
            this.pheight = height/this.ppp;
            this.pxoffs  = 0.5*this.pwidth;
            this.pyoffs  = 0.5*this.pheight;

            slide.scene.x = this.pxoffs;
            slide.scene.y = this.pyoffs;
        }
    });

    var Timeline = Entity.extend({

        create: function( warp ) {
            Entity.prototype.create.call( this, warp );
            this.entities = [];
            this.active = [];
            this.w = undefined;
            this.h = undefined;
        },

        add_entity: function( ent ) {
            this.entities.push( ent );
            ent.parent = this;
        },

        prepare: function() {
            if( this.entities.length > 0 ) {
                var invalid = false;

                // First attempt to resolve the timeline commencement.
                if( this.b.abs === undefined && this.parent !== undefined ) {
                    this.b.abs = this.parent.b;
                    this.b.rel = 0;
                }
                invalid |= resolve_timepoint( this.b );

                // Prepare all entities contained in the timeline to ensure
                // we have all warps set.
                for( var ii = 0; ii < this.entities.length; ++ii )
                    invalid |= this.entities[ii].prepare();

                // If the entity set is not yet valid then wait.
                if( invalid )
                    return true;

                // Sort the entities based on the start time.
                this.entities.sort( function( a, b ){ return a.b.value - b.b.value; });

                // Try to resolve my duration.
                if( this.c.abs === undefined ) {
                    var max = 0;
                    for( var ii = 0; ii < this.entities.length; ++ii ) {
                        if( this.entities[ii].c.value > max )
                            max = this.entities[ii].c.value;
                    }
                    this.c.value = max;
                }
                else
                    resolve_timepoint( this.c );

                return isNaN( this.c.value );
            }
        },

        update: function( tick ) {

            // Add ready entities.
            while( this.entities.length > 0 && this.entities[0].b.value <= tick )
                this.active.push( this.entities.shift() );

            // Remove finished active entities and update.
            // TODO: Optimise array reduction.
            var new_act = [];
            var max_w, max_h
            for(var ii = 0; ii < this.active.length; ++ii ) {
                var ent = this.active[ii];
                if( !ent.done( tick ) ) {
                    ent.update( tick );

                    // Update width and height while I'm here.
                    if( max_w === undefined )
                        max_w = ent.w;
                    else if( ent.w !== undefined && ent.w > max_w )
                        max_w = ent.w;
                    if( max_h === undefined )
                        max_h = ent.h;
                    else if( ent.h !== undefined && ent.h > max_h )
                        max_h = ent.h;

                    new_act.push( ent );
                }
            }
            this.active = new_act;
            this.w = max_w;
            this.h = max_h;
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
            this.children.parent = this;
            this.tweens = new Timeline();
            this.tweens.parent = this;
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

        render: function() {
            this.pjs.textFont( this.font, 12 );
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

        update: function() {
            if( this.parent !== undefined ) {
                this.w = this.parent.w;
                this.h = this.parent.h;
            }
            Node.prototype.update.call( this );
        }
    });

    var HCentered = Boxed.extend({

        create: function() {
            Boxed.prototype.create.call( this, 0, 1 );
        },

        update: function() {
            Boxed.prototype.update.call( this );

            // Set offset.
            this.x = 0.5*(this. - this.children.w);
        }
    });

    var setup = function() {
        slide.ticker = new Ticker();
        slide.camera = new Camera();
        slide.scene = new Scene();
    }

    slide.Entity = Entity;
    slide.Timeline = Timeline;
    slide.Transition = Transition;
    slide.Node = Node;
    slide.Shape = Shape;
    slide.Text = Text;
    slide.Pause = Pause;

    slide.timepoint = timepoint;
    slide.resolve_timepoint = resolve_timepoint;
    slide.key_typed = key_typed;
    slide.setup = setup;

}( window.slide = window.slide || {} ));
