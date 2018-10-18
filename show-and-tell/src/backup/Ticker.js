export default class Ticker {
  constructor() {
    this.i = 0
    this.paused = false
  }

  update = () => {
    if (!this.paused) {
      ++this.i
    }
  }
}
