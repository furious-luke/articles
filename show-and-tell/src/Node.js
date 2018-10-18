import Entity from './Entity'
import Timeline from './Timeline'
import Transition from './Transition'
import {isNil, isFunc} from './utils'
/* import slide from './slide'
 * import {get_default} from './utils' */

export default class Node extends Entity {
  static isNode(value) {
    return (value instanceof Node) || (value.prototype instanceof Node)
  }

  constructor(options = {}) {
    super(options.show, options.warp)
    this.children = new Timeline()
    this.tweens = new Timeline()
    const origin = options.origin
    if (origin === undefined) {
      this.x = 0
      this.y = 0
    } else if (Array.isArray(origin)) {
      this.x = origin[0]
      this.y = origin[1]
    } else {
      this.x = origin
      this.y = origin
    }
    this.scale = options.scale || 1
    this.w = null
    this.h = null
    this.stroke = options.stroke
    this.strokeWeight = options.strokeWeight
    this.fill = options.fill
    this.alpha = (options.alpha !== undefined) ? options.alpha : 255
    this.alphaBlend = (options.alphaBlend !== undefined) ? options.alphaBlend : true
    this.ephemeral = options.ephemeral || false
  }

  addChild(node) {
    if (!Array.isArray(node)) {
      node = [node]
    }
    for (const n of node) {
      this.children.addEntity(n)
      n.parent = this
    }
    return node[node.length - 1]
  }

  addSibling(node) {
    this.parent.addChild(node)
  }

  addTween(tween, name, span) {
    if (!isNil(name) && !isNil(span)) {
      const trans = new Transition(span, this, name)
      tween.addTransition(trans)
    }
    tween.parent = this
    this.tweens.addEntity(tween)
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

  findSibling(node) {
    if (node) {
      let sibling = this.children.findSibling(node)
      if (!sibling) {
        sibling = this.tweens.findSibling(node)
      }
      return sibling
    } else {
      return super.findSibling(node)
    }
  }

  resolveAnchors() {
    super.resolveAnchors()
    this.children.resolveAnchors()
    this.tweens.resolveAnchors()
  }

  resolveTimepoints() {
    this.warp.resolveStart()
    if (this.warp.finish.hasAnchor()) {
      this.warp.resolveFinish()
    }
    this.children.resolveTimepoints()
    this.tweens.resolveTimepoints()
    if (!this.warp.finish.hasAnchor()) {
      console.log("YO", this)
      if (this.children.warp.finish.tick >= this.tweens.warp.finish.tick) {
        this.warp.finish.setAnchor(this.children.warp.finish)
      } else {
        this.warp.finish.setAnchor(this.tweens.warp.finish)
      }
    }
    this.warp.resolveFinish()
  }

  /* prepare() {
   *   var invalid = false

   *   // If our warp start is undefined, try to use the end of
   *   // any sibling, otherwise use the start of the parent.
   *   if( this.b.abs === undefined ) {
   *     if( this.sibling !== undefined )
   *       this.b.abs = this.sibling.c;
   *     else
   *       this.b.abs = this.parent.b;
   *     this.b.rel = 0;
   *   }
   *   invalid |= resolve_timepoint( this.b );

   *   // Process children regardless of resolving our warp.
   *   invalid |= this.children.prepare( this );
   *   invalid |= this.tweens.prepare( this );

   *   // If the end of our warp is undefined, try to use either the
   *   // children or tween.
   *   if( this.c.abs === undefined ) {
   *     if( this.children.c.value === undefined )
   *       this.c.value = this.tweens.c.value;
   *     else if( this.tweens.c.value === undefined )
   *       this.c.value = this.children.c.value;
   *     else
   *       this.c.value = Math.max( this.children.c.value, this.tweens.c.value );

   *     // If we still couldn't get a finish time, try to adopt
   *     // any parent's value.
   *     if( this.c.value === undefined ) {
   *       var par = this.parent;
   *       while( par !== undefined && par.c.value === undefined )
   *         par = par.parent;
   *       if( par !== undefined )
   *         this.c.value = par.c.value;
   *     }
   *   }
   *   else
   *     resolve_timepoint( this.c );

   *   return isNaN( this.c.value );
   * } */

  step(tick) {
    this.children.step(tick)
    this.tweens.step(tick)
  }

  aggregate = () => {
    // Aggregate children sizes.
    this._calc_children_sizes();
    this.children.active.forEach(c => c.aggregate())
  }

  update(time) {
    this.children.update(time)
    this.tweens.update(time)
    this._calc_children_sizes()
  }

  flatten() {
    // Update my global position.
    this.gx = this.x
    this.gy = this.y
    if (!!this.parent) {
      this.gx += this.parent.gx
      this.gy += this.parent.gy
    }
    // Update my styles.
    this.gstrokeWeight = this.strokeWeight
    this.gstroke = this.stroke
    this.gfill = this.fill
    this.galpha = this.alpha
    if (!!this.parent) {
      if (this.gstroke === undefined) {
        this.gstroke = this.parent.gstroke
      }
      if (this.gstrokeWeight === undefined) {
        this.gstrokeWeight = this.parent.gstrokeWeight
      }
      if (this.gfill === undefined) {
        this.gfill = this.parent.gfill
      }
      // Update my global alpha.
      if (this.alphaBlend) {
        this.galpha = ((this.galpha / 255) * (this.parent.galpha / 255)) * 255
      }
    } else {
      if (this.gstroke === undefined) {
        this.gstroke = this.show.defaultStroke
      }
      if (this.gstrokeWeight === undefined) {
        this.gstrokeWeight = this.show.defaultStrokeWeight
      }
      if (this.gfill === undefined) {
        this.gfill = this.show.defaultFill
      }
    }
    // Update all active children.
    this.children.active.forEach(c => c.flatten())
  }

  enter() {
    this.show.renderer.enterNode(this)
	}

  exit() {
    this.show.renderer.exitNode(this)
	}

  display(renderer) {
    renderer.beginNode(this)
    this.transform(renderer)
    this.setStyle(renderer)
    this.render(renderer)
    this.children.active.forEach(c => c.display(renderer))
    renderer.endNode(this)
  }

  transform(renderer) {
    renderer.transform(this, [this.x, this.y], this.scale)
  }

  setStyle(renderer) {
    renderer.setStyle(this, this.gstroke, this.gstrokeWeight, this.gfill, this.galpha)
  }

  render(renderer) {
  }

  node(name, options = {}) {
    const Class = Node.isNode(name) ? name : Entity.nodes[name]
    if (isNil(Class)) {
      throw new Error(`Unknown node class: ${name}`)
    }
    const {sibling, ...otherOptions} = options
    const newNode = new Class({show: this.show, ...otherOptions})
    if (sibling) {
      this.addSibling(newNode)
      return this
    } else {
      this.addChild(newNode)
      return newNode
    }
  }

  tween(name, options) {
    const Class = Entity.tweens[name]
    if (isNil(Class)) {
      throw new Error(`Unknown tween class: ${name}`)
    }
    let warp = options.warp
    if (isFunc(warp)) {
      warp = warp(this)
    }
    let transitions = options.transitions
    if (!transitions) {
      transitions = this
    }
    if (!Node.isNode(transitions)) {
      if (transitions.length > 0 && !Array.isArray(transitions[0])) {
        transitions = [transitions]
      }
      transitions = transitions.map(t => new Transition(t[1], this, t[0]))
    }
    const newTween = new Class({
      ...options,
      show: this.show,
      warp,
      transitions
    })
    this.addTween(newTween)
    return this
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

  _calc_children_sizes() {
    let w = 0, h = 0
    if (this.children.active.length) {
      w = this.children.active[0].w
      h = this.children.active[0].h
      for (let ii = 0; ii < this.children.active.length; ++ii) {
        let cw = this.children.active[ii].w
        let ch = this.children.active[ii].h
        if (cw > w) w = cw
        if (ch > h) h = ch
      }
    }
    this.children.w = w
    this.children.h = h
  }
}

Entity.nodes.node = Node
