
var algebra = require('../index')
  , should  = require('should')

var AlgebraMatrix      = algebra.AlgebraMatrix
  , AlgebraMatrixSpace = algebra.AlgebraMatrixSpace
  , AlgebraVectorSpace = algebra.AlgebraVectorSpace

var C = algebra.C
  , R = algebra.R

var field           = R
  , numberOfRows    = 2
  , numberOfColumns = 3
  , space           = new AlgebraMatrixSpace(R, numberOfRows, numberOfColumns)

describe('AlgebraMatrixSpace', function() {
  describe('Inheritance', function() {
    it('is an AlgebraVectorSpace', function() {
      space.should.be.instanceOf(AlgebraVectorSpace)
    })
  })

  describe('Constructor', function() {
    it('has signature (field, numberOfRows, numberOfColumns)', function () {
      field           = C
      numberOfRows    = 2
      numberOfColumns = 2
      space           = new AlgebraMatrixSpace(field, numberOfRows, numberOfColumns)
     
      space.should.be.instanceOf(AlgebraMatrixSpace)
    })
  })

  describe('dimension', function() {
    it('is numberOfRows by numberOfColumns', function () {
      space.dimension.should.be.eql(numberOfRows * numberOfColumns)
    })
  })
})

