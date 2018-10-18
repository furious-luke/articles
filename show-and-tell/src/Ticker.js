export default class Ticker {
  constructor() {
    this.time = 0
    this.tick = 0
    this.paused = false
    this.framesPerSecond = 60
    this.secondsPerFrame = 1.0 / this.framesPerSecond
  }

  update() {
    if (!this.paused) {
      ++this.tick
      this.time += this.secondsPerFrame
    }
  }
}
