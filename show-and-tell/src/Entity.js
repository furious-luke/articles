import Timepoint from './Timepoint'
import Warp from './Warp'
import {isNil, isArray, isFunc} from './utils'

export default class Entity {
  static nodes = {}
  static tweens = {}

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
  constructor(show, warp) {
    this.show = show
    if (Warp.isWarp(warp)) {
      this.warp = warp
    } else if (Number.isInteger(warp)) {
      this.warp = new Warp(null, warp)
    } else {
      this.warp = new Warp(warp)
    }
  }

  findSibling(node) {
    if (!node && !!this.parent) {
      return this.parent.findSibling(this)
    }
  }

  prepare() {
    this.resolveAnchors()
    this.resolveTimepoints()
  }

  resolveAnchors() {
    // If our warp start is undefined, first check for the previous sibling and
    // use the finish time. If there are no siblings, use the parent's start.
    if (!this.warp.start.hasAnchor()) {
      const sibling = this.findSibling()
      if (!!sibling) {
        this.warp.start.setAnchor(sibling.warp.finish)
      } else if (!!this.parent) {
        this.warp.start.setAnchor(this.parent.warp.start)
      }
    }
  }

  resolveTimepoints() {
    this.warp.resolve()
  }

  display() {
  }

	step(tick) {
	}

	aggregate() {
	}

  update(tick) {
  }

	enter() {
	}

  exit() {
  }

	flatten() {
	}

  done(tick) {
    return this.warp.done(tick)
  }

	dump(indent) {
	  const spaces = Array(indent + 1).join(' ')
	}
}
