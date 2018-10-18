import {isNil, isArray, timepoint} from './utils'

export default class Entity {
  /**
   * Construct an Entity.
   *
   * Entites are provided a `warp` as:
   *
   *   * nil, initialize to default timepoints.
   *   * an array, providing both start and duration.
   *   * a value, specifying a duration.
   *
   * In the case of both start and duration, the duration may be given as a
   * timepoint instead.
   */
  constructor(warp) {
    if (isNil(warp)) {
      this.b = timepoint()
      this.c = timepoint()
    } else if (isArray(warp)) {
      // Both start and duration (possibly timepoint).
      this.b = timepoint(warp[0])
      if (!isNil(warp[1])) {
		    if (typeof warp[1] === 'object' && warp[1] !== null) {
			    this.c = timepoint(warp[1])
		    } else {
			    this.c = timepoint([this.b, warp[1]])
        }
		  }
      else {
        this.c = timepoint()
      }
    } else {
      // Just duration specified.
      this.b = timepoint()
      this.c = timepoint([this.b, warp])
    }
    // Store a reference to the sketch.
    /* this.pjs = Processing.getInstanceById( 'sketch' ); */
  }

  prepare = () => {
    // If our warp start is undefined, try to use the end of
    // any sibling, otherwise use the start of the parent.
    if (isNil(this.b.abs)) {
      if (!isNil(this.sibling)) {
        this.b.abs = this.sibling.c
      } else {
        this.b.abs = this.parent.b
      }
      this.b.rel = 0
    }
    resolveTimepoint(this.b)
	  // If we have no end to the warp, then try to use the first parent we
	  // can find.
    if (isNil(this.c.abs)) {
      let par = this.parent
      while (!isNil(par) && isNil(par.c.value)) {
        par = par.parent
      }
      if (!isNil(par)) {
        this.c.value = par.c.value
      }
    } else {
      resolveTimepoint(this.c)
    }
    return isNaN(this.c.value)
  }

  display = () => {
  }

	step = tick => {
	}

	aggregate = () => {
	}

  update = tick => {
  }

	enter = () => {
	}

	flatten = () => {
	}

  done = tick => {
    return tick > this.c.value
  }

  resolveTimepoint = tp => {
    return resolveTimepoint(tp)
  }

	dump = indent => {
	  const spaces = Array(indent + 1).join(' ')
	}
}
