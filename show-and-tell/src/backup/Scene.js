import Node from './Node'
import slide from './slide'

export default class Scene extends Node {
  constructor() {
    super([0, 0], 1, [0, undefined])
  }

  aggregate = () => {
    this.w = slide.camera.w;
    this.h = slide.camera.h;
    super.aggregate()
  }

  update = tick => {
    slide.update_cnt = 0;

    // Update for camera size.
    this.w = slide.camera.w;
    this.h = slide.camera.h;

    this.step(tick)
    super.update(tick)
    this.flatten(this)

    // console.log( slide.update_cnt );
  }

  flatten = () => {
    this.gx = 0;
    this.gy = 0;
    this.galpha = 255;
    for( var ii = 0; ii < this.children.active.length; ++ii )
      this.children.active[ii].flatten();
  }

  prepare = () => {

    // Repeat the prepare call until all succeed.
    var ii = 0;
    while( super.prepare() && ii < 100 )
    ++ii;
    if( ii == 100 )
      throw new Error( 'Failed to prepare slides.' );

    // Initialise before running any updates.
    this.step( 0 );
    this.aggregate();
    this.flatten();
  }
}
