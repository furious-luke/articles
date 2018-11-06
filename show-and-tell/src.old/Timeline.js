import Entity from './Entity'
import {get_default} from './utils'

export default class Timeline extends Entity {
  constructor(warp) {
    super(warp)
    this.entities = []
    this.active = []
	  this.index = 0
  }

  addEntity(entity) {
    this.entities.push(entity)
  }

  get(index) {
    return this.entities[index]
  }

  findSibling(entity) {
    if (!this.entities.length) {
      return
    }
    let ii = 0
    let prev
    for (; ii < this.entities.length; ++ii) {
      if (!this.entities[ii].ephemeral) {
        prev = this.entities[ii++]
        break
      }
    }
    if (prev !== undefined) {
      for (; ii < this.entities.length; ++ii) {
        if (this.entities[ii] === entity) {
          return prev
        }
        if (!this.entities[ii].ephemeral) {
          prev = this.entities[ii]
        }
      }
    }
    return
  }

  resolveAnchors() {
    // If our warp start is undefined, use the parent's warp start. Timelines
    // are used to represent children, and so there's no need to check for
    // siblings.
    if (!this.warp.start.hasAnchor() && this.parent) {
      this.warp.start.setAnchor(this.parent.start)
    }
    // Prepare all entities contained in the timeline to ensure we have all
    // warps set.
    this.entities.forEach(e => e.resolveAnchors())
  }

  resolveTimepoints() {
    // Resolve start time first. This is likely needed for the children.
    this.warp.resolveStart()
    // If my finish timepoint has been set, resolve it now.
    if (this.warp.finish.hasAnchor()) {
      this.warp.resolveFinish()
    }
    // Now resolve child timepoints.
    this.entities.forEach(e => e.resolveTimepoints())
    // Sort the entities based on the start time.
    this.entities.sort((a, b) => a.warp.a - b.warp.a)
    // If my finish timepoint has no anchor use the duration of the children
    // as the final timepoint.
    if (!this.warp.finish.hasAnchor()) {
      if (this.entities.length) {
        let finish = this.entities[0].warp.finish
        for (let ii = 1; ii < this.entities.length; ++ii) {
          if (this.entities[ii].warp.b > finish.tick) {
            finish = this.entities[ii].warp.finish
          }
        }
        this.warp.finish.setAnchor(finish)
      } else {
        this.warp.finish.setAnchor(this.warp.start)
      }
    }
    // We can now finalise the end warp.
    this.warp.resolveFinish()
  }

	step(tick) {
    // Add ready entities.
    while(this.index < this.entities.length && this.entities[this.index].warp.a <= tick) {
		  const ent = this.entities[this.index++]
		  ent._entered = true
      this.active.push(ent)
	  }
    // Remove finished active entities and update.
    // TODO: Optimise array reduction.
    var newAct = []
    for (let ii = 0; ii < this.active.length; ++ii) {
      const ent = this.active[ii]
      if (!ent.done(tick)) {
		    ent.step(tick)
        newAct.push(ent)
      } else {
        ent.exit()
      }
    }
    this.active = newAct
	}

  update(tick) {
    // Finish entering new entities?
    // TODO: Figure out how this relates to above.
    for (let ii = 0; ii < this.active.length; ++ii) {
      const ent = this.active[ii]
		  if (ent._entered) {
		    ent._entered = false
		    ent.enter()
		  }
      ent.update(tick)
    }
  }
}
