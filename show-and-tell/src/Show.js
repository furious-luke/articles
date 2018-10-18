import Ticker from './Ticker'
import Camera from './Camera'
// import TwoRenderer from './TwoRenderer'
import ProcessingRenderer from './ProcessingRenderer'
// import PaperRenderer from './PaperRenderer'

class Show {
  constructor() {
    this.scenes = []
    this.index = 0
    this.currentScene = null
    this.keyListeners = []
    this.palette = {
	    base00: '#181818',
	    base01: '#282828',
	    base02: '#383838',
	    base03: '#585858',
	    base04: '#B8B8B8',
	    base05: '#D8D8D8',
	    base06: '#E8E8E8',
	    base07: '#F8F8F8',
	    base08: '#AB4642',
	    base09: '#DC9656',
	    base0A: '#F7CA88',
	    base0B: '#A1B56C',
	    base0D: '#7CAFC2',
	    base0E: '#BA8BAF'
    }
    this.disable_pause = false
    this.defaultFont = 'FuturaKoyu.ttf'
    this.defaultFontSize = 0.1
    this.defaultStrokeWeight = 10
    this.defaultStroke = this.palette.base03
    this.defaultFill = this.palette.base03
  }

  setup(createScenes) {
    this.ticker = new Ticker()
    this.camera = new Camera()
    this.renderer = new ProcessingRenderer(this, renderer => {
      this.renderer = renderer
      createScenes()
      if (this.scenes.length) {
        this.currentScene = this.scenes[0]
        this.renderer.applyDefaults(this.currentScene)
        this.currentScene.setup()
        this.currentScene.enter()
      }
      this.prepare()
    })
  }

  addScene(scene) {
    this.scenes.push(scene)
  }

  prepare() {
    this.currentScene.prepare()
  }

  update(time) {
    this.currentScene.update(time)
  }

  display(renderer) {
    this.currentScene.display(renderer)
  }

  play() {
    this.renderer.play()
  }

  addKeyListener(listener) {
    this.keyListeners.push(listener)
  }

  removeKeyListener(listener) {
    this.keyListeners = this.keyListeners.filter(l => l !== listener)
  }

  keyTyped(key, keyCode) {
    this.keyListeners.forEach(l => l.keyTyped(key, keyCode))
  }
}

const show = new Show()

export default show
