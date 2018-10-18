import show from '../src/Show'

import Splash from './Splash'

show.palette.background = '#f7f7f7'
show.palette.primary = '#00a19c'
show.palette.disabled = '#9b9b9b'
show.palette.active = '#056dff'
show.palette.text = '#4b4b4b'

show.setup(() => {
  new Splash()
})
// show.play()
