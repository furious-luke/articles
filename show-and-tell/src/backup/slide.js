import Ticker from './Ticker'
import Camera from './Camera'
import Scene from './Scene'
import TwoRenderer from './TwoRenderer'

class Slide {
  constructor() {
  }

  setup = callback => {
    this.ticker = new Ticker()
    this.camera = new Camera()
    this.scene = new Scene()
    this.camera.initialise(800, 600)
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
    /* this.default_stroke = this.palette.base03;
     * this.default_fill = this.palette.base03;
     * this.default_font = koyu;
     * this.default_list_font = extend;
     * this.default_mono_font = term_fnt; */
    this.renderer = new TwoRenderer(this)
    callback()
  }

  play = () => {
    this.renderer.play()
  }
}

const slide = new Slide()

export default slide
