import {expect} from 'code'

import Node from '../src/Node'
import Tween from '../src/Tween'

describe('Node', function() {

  describe('prepare', function() {

    it('children warps', function() {
      const root = new Node()
      const nodes = [
        new Node({warp: 10}),
        new Node({warp: 20}),
        new Node({warp: 30})
      ]
      root.addChild(nodes)
      root.prepare()
      expect(root.warp.start.tick).to.equal(0)
      expect(root.warp.finish.tick).to.equal(60)
      expect(nodes[0].warp.start.tick).to.equal(0)
      expect(nodes[0].warp.finish.tick).to.equal(10)
      expect(nodes[1].warp.start.tick).to.equal(10)
      expect(nodes[1].warp.finish.tick).to.equal(30)
      expect(nodes[2].warp.start.tick).to.equal(30)
      expect(nodes[2].warp.finish.tick).to.equal(60)
      // Step to each node.
      root.step(0)
      expect(root.children.active).to.equal([nodes[0]])
      root.step(11)
      expect(root.children.active).to.equal([nodes[1]])
      root.step(31)
      expect(root.children.active).to.equal([nodes[2]])
      root.step(61)
      expect(root.children.active).to.equal([])
    })

    it('tween warps', function() {
      const root = new Node()
      const nodes = [
        new Node({warp: 10}),
        new Node({warp: 20}),
        new Node({warp: 30})
      ]
      const tween = new Tween({warp: 70})
      root.addChild(nodes)
      root.addTween(tween, 'x', 100)
      root.prepare()
      expect(root.warp.start.tick).to.equal(0)
      expect(root.warp.finish.tick).to.equal(70)
      expect(nodes[0].warp.start.tick).to.equal(0)
      expect(nodes[0].warp.finish.tick).to.equal(10)
      expect(nodes[1].warp.start.tick).to.equal(10)
      expect(nodes[1].warp.finish.tick).to.equal(30)
      expect(nodes[2].warp.start.tick).to.equal(30)
      expect(nodes[2].warp.finish.tick).to.equal(60)
      // Step to each node.
      root.step(0)
      expect(root.children.active).to.equal([nodes[0]])
      expect(root.tweens.active).to.equal([tween])
      root.step(11)
      expect(root.children.active).to.equal([nodes[1]])
      expect(root.tweens.active).to.equal([tween])
      root.step(31)
      expect(root.children.active).to.equal([nodes[2]])
      expect(root.tweens.active).to.equal([tween])
      root.step(61)
      expect(root.children.active).to.equal([])
      expect(root.tweens.active).to.equal([tween])
      root.step(71)
      expect(root.children.active).to.equal([])
      expect(root.tweens.active).to.equal([])
    })

  })

})
