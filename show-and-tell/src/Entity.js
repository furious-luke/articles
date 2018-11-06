import Warp from './Warp'
import {repr} from './utils'

class Entity {
  constructor(options) {
    this.warp = Warp.get(options.warp)
    this.type = options.type
  }

  resolve() {
    this.warp.resolve()
  }

  enter() {
    console.log('Enter: ', repr(this))
  }

  exit(ticker) {
    console.log('Exit: ', repr(this))
  }

  done(time) {
    return this.warp.done(time)
  }

  getActive() {
    return []
  }

  repr() {
    return `<${this.type} ${repr(this.warp)}>`
  }
}

export default Entity
