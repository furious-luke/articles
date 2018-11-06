import slide from './slide'
import Rect from './Rect'

/* class Splash extends Slide {
 *   constructor() {
 *     this.heading('Title').enter_left()
 *     this.shape('conch')
 *         .tweenX('quartic', '25%')
 *         .tweenX('quartic', 0),
 *         .tweenX('backIn', o => -0.5*(this.camera.w + o.w))
 *   }
 * } */

slide.setup(() => {
  const rect = new Rect(100, 100)
  slide.scene.add_child(rect)
})

slide.play()
