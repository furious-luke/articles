(function( slide, undefined ) {

    var Entity = Class({

        create: function( warp ) {
            if( warp === undefined ) {
                this.b = undefined;
                this.c = undefined;
            }
            else if( warp.constructor === Array ) {
                this.b = warp[0];
                this.c = warp[1];
            }
            else {
                this.b = -warp;
                this.c = undefined;
            }

            // Store a reference to the sketch.
            this.pjs = Processing.getInstanceById('sketch');
        },

        prepare: function() {
        },

        display: function() {
        },

        update: function( tick ) {
        },

        done: function( tick ) {
            return tick > this.c;
        }
    });

    var Ticker = Class({

        create: function() {
            this.i = 0;
        },

        update: function() {
            ++this.i;
        }
    });

    var Camera = Class({

        create: function( width, height ) {
            if( width !== undefined && height !== undefined )
                this.initialise( width, height );
        },

        initialise: function( width, height ) {
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
        },

        add_entity: function( ent ) {
            this.entities.push( ent );
        },

        prepare: function() {
            if( this.entities.length > 0 ) {
                for( var ii = 0; ii < this.entities.length; ++ii )
                    this.entities[ii].prepare();
                this.entities.sort( function( a, b ){ return a.b - b.b; });
                if( this.b === undefined ) {
                    this.b = this.entities[0].b;
                    this.c = this.entities[this.entities.length - 1].c;
                }
            }
        },

        update: function( tick ) {

            // Add ready entities.
            while( this.entities.length > 0 && this.entities[0].b <= tick )
                this.active.push( this.entities.shift() );

            // Remove finished active entities and update.
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
        },

        add_child: function( node ) {
            this.children.add_entity( node );
        },

        add_tween: function( name, a, b, tween ) {
            var trans = new Transition( a, b, this, name );
            tween.add_transition( trans );
            this.tweens.add_entity( tween );
        },

        prepare: function() {
            this.children.prepare();
            this.tweens.prepare();
            if( this.b === undefined ) {
                if( this.children.b === undefined )
                    this.b = this.tweens.b;
                else if( this.tweens.b === undefined )
                    this.b = this.children.b;
                else
                    this.b = Math.min( this.children.b, this.tweens.b );
            }
            if( this.c === undefined ) {
                if( this.children.c === undefined )
                    this.c = this.tweens.c;
                else if( this.tweens.c === undefined )
                    this.c = this.children.c;
                else
                    this.c = Math.max( this.children.c, this.tweens.c );
            }
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
            this.pjs.shape( this.sh, 0, 0, this.w*slide.camera.ppp, this.h*slide.camera.ppp );
        }
    });

    var Text = Node.extend({

        create: function( txt, font, orig, scale, warp ) {
            Node.prototype.create.call( this, orig, scale, warp );
            this.txt = txt;
            this.font = font;
        },

        render: function() {
            this.pjs.textFont( this.font );
            this.pjs.text( this.txt, 0, 0 );
        }
    });

    var setup = function() {
        slide.ticker = new Ticker();
        slide.camera = new Camera();
        slide.scene = new Node();
    }

    slide.Entity = Entity;
    slide.Timeline = Timeline;
    slide.Transition = Transition;
    slide.Node = Node;
    slide.Shape = Shape;
    slide.Text = Text;

    slide.setup = setup;

}( window.slide = window.slide || {} ));
