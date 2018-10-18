import Scene from '../src/Scene'
import '../src/nodes'
import '../src/tweens'
import Warp from '../src/Warp'
import Node from '../src/Node'

export default class Splash extends Scene {
  setup() {
    const logo = this.node('svg', {
      source: './uptick/logo.svg',
      disableStyle: true,
      strokeWeight: 0.001,
      fill: this.show.palette.primary,
      scale: [1, 0.3],
      alpha: 0
    })
    .tween('linear', {warp: 2, transitions: ['alpha', 255]})
    .tween('linear', {warp: 2, transitions: ['alpha', 0]})

    const textNode = this.node('node', {warp: [4, 4], alpha: 0})
    textNode.tween('linear', {warp: 2, transitions: ['alpha', 255]})
    textNode.tween('linear', {warp: 2, transitions: ['alpha', 0]})

    textNode.node('text', {text: 'DRF', fontSize: .3, warp: textNode.warp, origin: [-1, .2]})
    textNode.node('text', {text: 'JSON-API', fontSize: .3, warp: textNode.warp, origin: [-1, -.2]})
    textNode.node('svg', {
      source: './uptick/detective.svg',
      warp: textNode.warp,
      origin: [1, 0],
      scale: [-1, 1.3],
      disableStyle: true,
      strokeWeight: 0.001,
      fill: this.show.palette.text
    })

    this.node('pause', {warp: 2})
    this.node('pause', {warp: 6})
  }
}
