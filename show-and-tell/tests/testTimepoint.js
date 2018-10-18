import {expect} from 'code'

import Timepoint from '../src/Timepoint'

describe('Timepoint', function() {

  it('isTimepoint', function() {
    expect(Timepoint.isTimepoint('a')).to.not.be.true()
    expect(Timepoint.isTimepoint(new Timepoint())).to.be.true()
  })

  it('hasAnchor', function() {
    expect((new Timepoint()).hasAnchor()).to.be.false()
    expect((new Timepoint(new Timepoint())).hasAnchor()).to.be.true()
  })

  it('resolve', function() {
    const anchor = new Timepoint()
    const offset0 = new Timepoint(anchor, 10)
    expect(offset0.resolve()).to.equal(10)
    expect(anchor.tick).to.equal(0)
    expect(offset0.tick).to.equal(10)
    const absolute = new Timepoint(10)
    const offset1 = new Timepoint(absolute, 10)
    const offset2 = new Timepoint(offset1, 10)
    expect(offset2.resolve()).to.equal(30)
    expect(absolute.tick).to.equal(10)
    expect(offset1.tick).to.equal(20)
    expect(offset2.tick).to.equal(30)
  })

})
