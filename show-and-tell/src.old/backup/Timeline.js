import Entity from './Entity'
import {get_default} from './utils'

export default class Timeline extends Entity {
  constructor(warp) {
    super(warp)
    this.entities = []
    this.active = []
	  this.index = 0
  }

  add_entity = entity => {
    this.entities.push(entity)
  }

  prepare = () => {
    if (this.entities.length > 0) {
      let invalid = false
      // Prepare all entities contained in the timeline to ensure
      // we have all warps set.
      for (let ii = 0; ii < this.entities.length; ++ii) {
        invalid |= this.entities[ii].prepare()
      }
      // If the entity set is not yet valid then wait.
      if (invalid) {
        return true
      }
      // Sort the entities based on the start time.
      this.entities.sort((a, b) => a.b.value - b.b.value)
      // Resolve my duration.
		  this.b = {value: this.entities[0].b.value}
		  this.c = {value: this.entities[0].c.value}
      for (let ii = 1; ii < this.entities.length; ++ii) {
        if (this.entities[ii].c.value > this.c.value) {
          this.c.value = this.entities[ii].c.value
        }
        if (this.entities[ii].b.value < this.b.value) {
          this.b.value = this.entities[ii].b.value
        }
      }
    }
  }

	step = tick => {
    // Add ready entities.
    while(this.index < this.entities.length && this.entities[this.index].b.value <= tick ) {
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
		  }
    }
    this.active = newAct;
	}

  update = tick => {
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
