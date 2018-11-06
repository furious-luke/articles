import {isNil} from './utils'

export default class Timepoint {
  static isTimepoint(value) {
    return value instanceof Timepoint
  }

  constructor(anchor = null, offset = 0) {
    this.anchor = anchor
    this.offset = offset
    this.tick = null
  }

  hasAnchor() {
    return !isNil(this.anchor)
  }

  setAnchor(anchor) {
    this.anchor = anchor
  }

  resolve() {
    if (this.tick !== null) {
      return this.tick
    }
    if (this._resolving) {
      throw new Error('Cyclic timepoints.')
    }
    this._resolving = true
    if (Timepoint.isTimepoint(this.anchor)) {
      this.tick = this.anchor.resolve()
    } else if (this.anchor === null) {
      this.tick = 0
    } else {
      this.tick = this.anchor
    }
    this.tick += this.offset
    delete this._resolving
    return this.tick
  }

  add(duration) {
    return new Timepoint(this, duration)
  }

  copy() {
    return new Timepoint(this)
  }

  repr() {
    let r = ''
    if (this.hasAnchor()) {
      r = 'T'
    }
    if (!!this.offset) {
      r += ` ${this.offset}`
    }
    return r
  }
}
