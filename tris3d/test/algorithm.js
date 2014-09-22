
var should = require('should')
  , tris3d = require('../index')

var algorithm = tris3d.algorithm

var coordOf = algorithm.coordinatesOfIndex
  , indexOf = algorithm.indexOfCoordinates
  , isTris  = algorithm.isTris
  , semiSum = algorithm.semiSumInZ3xZ3xZ3

// Sorted array of points from point[0] to point[26]
var point = [
  [0, 0, 0], [1, 0, 0], [2, 0, 0] // 0   1   2
, [0, 1, 0], [1, 1, 0], [2, 1, 0] // 3   4   5
, [0, 2, 0], [1, 2, 0], [2, 2, 0] // 6   7   8
, [0, 0, 1], [1, 0, 1], [2, 0, 1] // 9   10  11
, [0, 1, 1], [1, 1, 1], [2, 1, 1] // 12  13  14
, [0, 2, 1], [1, 2, 1], [2, 2, 1] // 15  16  17
, [0, 0, 2], [1, 0, 2], [2, 0, 2] // 18  19  20
, [0, 1, 2], [1, 1, 2], [2, 1, 2] // 21  22  23
, [0, 2, 2], [1, 2, 2], [2, 2, 2] // 24  25  26
]

describe('algorithm', function () {
  describe('indexOfCoordinates', function () {
    it('convert Z3xZ3xZ3 point to 0..26 integer', function () {
      for (i in point)
        indexOf(point[i]).should.eql(i)
    })
  })

  describe('coordinatesOfIndex', function () {
    it('convert 0..26 integer to Z3xZ3xZ3 point', function () {
      for (i in point)
        coordOf(i).should.eql(point[i])
    })
  })

  describe('semiSuminZ3xZ3xZ3', function () {
    it('return index of midpoint in Z3 x Z3 x Z3 space', function () {
      // TODO test all combinations: how much are they?
      semiSum( 0,  1).should.eql(2)
      semiSum( 0,  3).should.eql(6)
      semiSum( 1,  5).should.eql(6)
      semiSum( 1, 10).should.eql(19)
      semiSum( 2,  3).should.eql(7)
      semiSum( 3,  4).should.eql(5)
      semiSum( 6,  7).should.eql(8)
      semiSum( 6,  9).should.eql(21)
      semiSum( 9, 10).should.eql(11)
      semiSum(10, 13).should.eql(16)
      semiSum(11, 12).should.eql(16)
      semiSum(12, 13).should.eql(14)
      semiSum(15, 16).should.eql(17)
      semiSum(15, 18).should.eql(3)
      semiSum(17, 18).should.eql(4)
      semiSum(18, 19).should.eql(20)
      semiSum(20, 21).should.eql(25)
      semiSum(21, 22).should.eql(23)
      semiSum(24, 25).should.eql(26)
    })

    it('is simmetric', function () {
      for (var i = 0; i < 27; i++)
        for (var j = 0; j < 27; j++)
          semiSum(i, j).should.eql(semiSum(j, i))
    })

    it('is cyclic', function () {
      var k

      for (var i = 0; i < 27; i++)
        for (var j = 0; j < 27; j++) {
          k = semiSum(i, j)

          semiSum(j, k).should.eql(i)
          semiSum(k, i).should.eql(j)
        }
    })
  })

  describe('isTris', function () {
    it('is invariant under permutation or arguments', function () {
      for (var i = 0; i < 27; i++)
        for (var j = 0; j < i; j++)
          for (var k = 0; k < j; k++) {
            // cyclic
            isTris(i, j, k).should.eql(isTris(j, k, i))
            isTris(j, k, i).should.eql(isTris(k, i, j))

            // transposition
            isTris(i, j, k).should.eql(isTris(j, i, k))
            isTris(i, j, k).should.eql(isTris(i, k, j))
            isTris(i, j, k).should.eql(isTris(k, j, i))
          }
    })

    it('is false when c is not semiSum of a, b', function () {
      for (var i = 0; i < 27; i++)
        for (var j = 0; j < i; j++)
          for (var k = 0; k < j; k++)
            if (k !== semiSum(i, j))
              isTris(i, j, k).should.be.not.ok
    })

    it('is true when semiSum condition holds and some point is the center', function () {
      isTris(point[12], point[13], point[14]).should.be.ok
      isTris(point[10], point[13], point[16]).should.be.ok
    })

    it('works properly', function () {
      isTris(point[0], point[1], point[2]).should.be.ok
      isTris(point[0], point[1], point[3]).should.be.ko
      isTris(point[20], point[22], point[24]).should.be.ok
    })
  })
})

