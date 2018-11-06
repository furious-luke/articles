import {isNil, isInt} from './utils'

class Timepoint {
  static isTimepoint(value) {
    return value instanceof Timepoint
  }

  static globalIndex = 0

  constructor(anchor = null, offset = 0) {
    this.index = Timepoint.globalIndex++;
    if (isInt(anchor)) {
      offset += anchor
      anchor = null
    }
    this.anchor = anchor
    this.offset = offset
    this.time = null
  }

  hasAnchor() {
    return !isNil(this.anchor)
  }

  setAnchor(anchor) {
    this.anchor = anchor
  }

  resolve() {
    if (this.time !== null) {
      return this.time
    }
    if (this._resolving) {
      throw new Error('Cyclic timepoints.')
    }
    this._resolving = true
    if (Timepoint.isTimepoint(this.anchor)) {
      this.time = this.anchor.resolve()
    } else if (this.anchor === null) {
      this.time = 0
    } else {
      this.time = this.anchor
    }
    this.time += this.offset
    delete this._resolving
    return this.time
  }

  copy() {
    return new Timepoint(this)
  }

  add(duration) {
    return new Timepoint(this, duration)
  }

  repr() {
    let r = `T${this.index}:`
    if (Timepoint.isTimepoint(this.anchor)) {
      r += `T${this.anchor.index}`
    } else if (this.anchor === null) {
      r += '?'
    } else {
      r += `T${this.anchor}`
    }
    if (this.offset >= 0) {
      r += `+${this.offset}`
    } else {
      r += `${this.offset}`
    }
    return r
  }
}

export default Timepoint
