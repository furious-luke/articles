import paper from 'paper'

import Node from './Node'
import Rectangle from './Rectangle'
import Pause from './Pause'
import Text from './Text'
import Svg from './Svg'
import Show from './Show'
import Slide from './Slide'
import Linear from './Linear'
import Quartic from './Quartic'
import {repr} from './utils'

import './fonts.css'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
paper.setup(canvas)
paper.view.setViewSize(new paper.Size(window.innerWidth, window.innerHeight))

const show = new Show({warp: [0, 10]})
const group = new Node({show, warp: [0, 10]})
const svg = new Svg({show, warp: [0, 10], source: 'logo.svg'})

const pause = new Pause({show, warp: [0, 10]})

group.addChild(svg)
group.addChild(pause)
group.addTween(new Linear({warp: [0, 2]}), 'opacity', [0, 1])
group.addTween(new Quartic({warp: [2, 1]}), [
  ['x', [0, -0.8]],
  ['y', [0, -0.5]],
  ['scale', [1, 0.5]]
])

const title = new Text({show, warp: [0, 10], opacity: 0, text: 'An API Performance Mystery', halign: 'left'})
title.addTween(new Linear({warp: [3, 2]}), 'opacity', [0, 1])

show.currentSlide = new Slide({show})
show.addChild(show.currentSlide)
show.currentSlide.addChild([title, group])

show.resolve()
show.enter()

paper.view.onFrame = () => {
  show.update()
  show.render()
  /* rect.group.rotate(1)
   * text.group.rotate(1) */
}

paper.view.onResize = () => {
  // TODO
  // show.resize()
}

window.onresize = () => {
  // TODO
  // paper.view.setViewSize([window.innerWidth, window.innerHeight])
}
