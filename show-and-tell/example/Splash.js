import Scene from '../src/Scene'
import '../src/nodes'
import '../src/tweens'

export default class Splash extends Scene {
  setup() {
    this.node('pause')

    const rect = this.node('rectangle', {fill: this.show.palette.base08, strokeWeight: 3})
                     .tween('quartic', 1, [['w', 2], ['h', 1]])
                     .tween('linear', 1, ['radius', 0.1])
                     .tween('elasticEaseOut', 1, ['x', 1])

    this.node('text', {text: 'hello world', warp: [this.warp.start.copy()], origin: [-1, -.8]})
        .tween('linear', 4, ['scale', 6])

    this.node('svg', {source: './example/nautilus.svg', size: 0.2, warp: [rect.tweens.get(1).warp.finish.copy()], disableStyle: true, strokeWeight: 0.1})
                     .tween('linear', 4, ['scale', 4])

    this.node('line', {warp: [this.warp.start.copy()], origin: [-1, .8], offset: [-1, .8]})
                     .tween('linear', 5, ['ox', 1])

    this.node('pause')
  }
}
