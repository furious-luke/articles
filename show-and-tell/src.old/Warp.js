import Timepoint from './Timepoint'
import {isNil, isArray} from './utils'

export default class Warp {
  static isWarp(value) {
    return value instanceof Warp
  }

  constructor(start, finish) {
    if (isArray(start)) {
      this.start = start[0]
      this.finish = start[1]
    } else if (finish === undefined) {
      this.start = null
      this.finish = start
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

  done(tick) {
    return tick > this.b + 0.05 // TODO: Yuck.
  }

  repr() {
    if (isNil(this.a) && isNil(this.b)) {
      return `(${this.start.repr()}, ${this.finish.repr()})`
    } else {
      return `(${this.a}, ${this.b})`
    }
  }
}
