import Entity from './Entity'
import Timeline from './Timeline'
import slide from './slide'
import {get_default} from './utils'

export default class Node extends Entity {
  constructor(origin, scale, warp, options = {}) {
    super(warp)
    this.children = new Timeline()
    this.tweens = new Timeline()
    if (origin === undefined) {
      this.x = 0
      this.y = 0
    } else if (origin.constructor === Array) {
      this.x = origin[0]
      this.y = origin[1]
    } else {
      this.x = origin
      this.y = origin
    }
    if (scale === undefined) {
      this.scale = 1
    } else {
      this.scale = scale
    }
    this.w = undefined
    this.h = undefined
    this.stroke = get_default(options, 'stroke', slide.default_stroke)
    this.fill = get_default(options, 'fill', slide.default_fill)
    this.alpha = get_default(options, 'alpha', 255)
    this.alpha_blend = get_default(options, 'alpha_blend', true)
  }

  add_child = node => {
    this.children.add_entity(node)
    node.parent = this
    return node
  }

  addTween = (tween, name, a, b) => {
    let trans
    if (a instanceof Function) {
      trans = new GeneralTransition(this, name, a)
    } else {
      trans = new Transition(this, name, a, b)
    }
    tween.add_transition(trans)
    tween.parent = this
    if (this.tweens.entities.length > 0) {
      tween.sibling = this.tweens.entities[this.tweens.entities.length - 1]
    }
    this.tweens.add_entity(tween)
    return this
  }

  get_child = index => {
    return this.children.entities[index]
  }

  get_last_child = () => {
    return this.children.entities[this.children.entities.length - 1]
  }

  get_tween = index => {
    return this.tweens.entities[index]
  }

  get_last_tween = () => {
    return this.tweens.entities[this.tweens.entities.length - 1]
  }

  prepare = () => {
    var invalid = false

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
  }

  step = tick => {
    this.children.step( tick );
    this.tweens.step( tick );
  }

  aggregate = () => {

    // Aggregate children sizes.
    this._calc_children_sizes();

    for( var ii = 0; ii < this.children.active.length; ++ii )
      this.children.active[ii].aggregate();
  }

  _calc_children_sizes = () => {
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
  }

  update(tick) {
    this.children.update( tick );
    this.tweens.update( tick );
    this._calc_children_sizes();
      ++slide.update_cnt;
  }

  flatten = () => {

    // Update my global position.
    this.gx = this.x;
    this.gy = this.y;
    if( this.parent !== undefined ) {
      this.gx += this.parent.gx;
      this.gy += this.parent.gy;
    }

    // Update my global alpha.
    this.galpha = this.alpha;
    if( this.alpha_blend && this.parent !== undefined )
      this.galpha = ((this.galpha/255)*(this.parent.galpha/255))*255;

    for( var ii = 0; ii < this.children.active.length; ++ii )
      this.children.active[ii].flatten();
  }

  display = renderer => {
    /* this.pjs.pushMatrix(); */
    this.transform(renderer)
    this.set_colors(renderer)
    this.render(renderer)
    this.children.active.forEach(c => c.display())
    /* this.pjs.popMatrix(); */
  }

  transform = renderer => {
    renderer.transform(
      this,
      [this.x * slide.camera.ppp, this.y * slide.camera.ppp],
      this.scale
    )
  }

  set_colors = renderer => {
    renderer.setColors(
      [this.stroke, this.galpha],
      [this.fill, this.galpha]
    )
  }

  render = renderer => {
  }

  dump = indent => {
    var spaces = Array( indent + 1 ).join( ' ' );
    Entity.prototype.dump.call( this, indent );
    console.log( spaces + '  x:  ' + this.x );
    console.log( spaces + '  y:  ' + this.y );
    console.log( spaces + '  gx: ' + this.gx );
    console.log( spaces + '  gy: ' + this.gy );
    console.log( spaces + '  w:  ' + this.w );
    console.log( spaces + '  h:  ' + this.h );
    console.log( spaces + '  cw: ' + this.children.w );
    console.log( spaces + '  ch: ' + this.children.h );
    console.log( spaces + '  children' );
    for( var ii = 0; ii < this.children.active.length; ++ii )
      this.children.active[ii].dump( indent + 4 );
  }
}
