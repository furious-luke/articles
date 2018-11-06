class Timeline {
  constructor() {
    this.entities = []
    this.active = []
	  this.index = 0
  }

  resolve() {
    this.entities.forEach(e => e.resolve())
  }

  enter(ticker) {
    this.activate(ticker)
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

  update(ticker) {
    this.activate(ticker)
    this.active.forEach(e => e.update(ticker))
  }

  activate(ticker) {
    // Add ready entities.
    while(this.index < this.entities.length && this.entities[this.index].warp.a <= ticker.time) {
		  const ent = this.entities[this.index++]
      ent.enter(ticker)
      this.active.push(ent)
	  }
    // Remove finished active entities and update.
    // TODO: Optimise array reduction.
    var newAct = []
    for (let ii = 0; ii < this.active.length; ++ii) {
      const ent = this.active[ii]
      if (!ent.done(ticker.time)) {
        newAct.push(ent)
      } else {
        ent.exit()
      }
    }
    this.active = newAct
  }
}

export default Timeline
