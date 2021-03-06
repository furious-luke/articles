import Timepoint from './Timepoint'
import {isNil, isArray, repr} from './utils'

class Warp {
  static isWarp(value) {
    return value instanceof Warp
  }

  static get(value) {
    if (!Warp.isWarp(value)) {
      value = new Warp(value)
    }
    return value
  }

  constructor(start, finish) {
    if (isArray(start)) {
      this.start = start[0]
      this.finish = start[1]
    } else {
      this.start = start
      this.finish = finish
    }
    if (!Timepoint.isTimepoint(this.start)) {
      this.start = new Timepoint(this.start)
    }
    if (!Timepoint.isTimepoint(this.finish)) {
      if (isNil(this.finish)) {
        this.finish = new Timepoint()
      } else {
        this.finish = new Timepoint(this.start, this.finish)
      }
    }
    this.a = null
    this.b = null
  }

  resolve() {
    this.resolveStart()
    this.resolveFinish()
  }

  resolveStart() {
    this.a = this.start.resolve()
  }

  resolveFinish() {
    this.b = this.finish.resolve()
  }

  done(time) {
    return time > this.b + 0.05 // TODO: Yuck.
  }

  repr() {
    let r = '('
    if (isNil(this.a)) {
      r += repr(this.start)
    } else {
      r += `${this.a}`
    }
    r += ','
    if (isNil(this.b)) {
      r += repr(this.finish)
    } else {
      r += `${this.b}`
    }
    r += ')'
    return r
  }
}

export default Warp
