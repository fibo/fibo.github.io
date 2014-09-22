
/**
 * Check if three points form a tris
 *
 * This is the core algorithm of tris3d
 *
 * @param {Array} a
 * @param {Array} b
 * @param {Array} c
 *
 * @return {Boolean} response
 */

function isTris (a, b, c) {
  var indexOfCenter = indexOfCoordinates([1, 1, 1])
    , indexOfA = indexOfCoordinates(a)
    , indexOfB = indexOfCoordinates(b)
    , indexOfC = indexOfCoordinates(c)
    , indexOfP

  // Sia T = {a, b, c} una terna di punti.

  // Condizione necessaria affinchè sia un tris è
  //
  // c = Z3-semisomma di a e b.
  //
  // Per le proprietà della Z3-semisomma, posso scegliere a e b a piacere.

  // A necessary condition to be a tris is
  //
  //     semiSum(a, b) = c
  //
  // Since semiSum is cyclic, I can choose a, b, c in any order
  //

  if (semiSumInZ3xZ3xZ3(indexOfA, indexOfB) !== indexOfC)
    return false


  // Se uno dei tre punti e' il centro, implica che T e' un tris.
  // If some point is the center, then it is a tris
  if ((indexOfCenter === indexOfA) || (indexOfCenter === indexOfB) || (indexOfCenter === indexOfC))
    return true

  // A questo punto, esiste un indice k t.c. A_k = B_k
  // sia P t.c. P_h = 1 per ogni k diverso da h,
  // cioe P è il centro di una faccia.

  if (a[0] === b[0])
    indexOfP = indexOfCoordinates([a[0], 1, 1])
  if (a[1] === b[1])
    indexOfP = indexOfCoordinates([1, a[1], 1])
  if (a[2] === b[2])
    indexOfP = indexOfCoordinates([1, 1, a[2]])

  // Se esistono indici k,h tali che
  // A_k = B_k, A_h = B_h
  // allora implica tris.
  if ((a[0] === b[0]) && (a[1] === b[1]))
    return true
  if ((a[0] === b[0]) && (a[2] === b[2]))
    return true
  if ((a[1] === b[1]) && (a[2] === b[2]))
    return true

  // Se T contiene p, implica tris.
  if ((indexOfP === indexOfA) || (indexOfP === indexOfB) || (indexOfP === indexOfC))
    return true

  // In tutti gli altri casi non si tratta di un tris. In particolare ci sono
  // terne T che soddisfanno la condizione c = Z3-semisomma di a e b, ma, non
  // sono dei tris (ad esempio 0, 5, 7).

  // Otherwise it is not a tris, in particular exists some a, b, c for which the semiSUm condition holds
  // but they are not a tris.
  return false
}

exports.isTris = isTris

/**
 * Semisum operator in Z3 x Z3 x Z3 space
 *
 * Z3 is the group of arithmetic modulo 3.
 * Note that in Z3, mutliply and divide by 2 has the same result: in deed
 *
 * ```
 * 0 -> 0
 * 1 -> 2
 * 2 -> 1
 * ```
 *
 * So, in Z3
 *
 * ```
 * (a + b) * 2 = (a + b) / 2
 * ```
 *
 * Since I'm wirking with integers I prefer to multiply by 2 to avoid floats.

 * Z3xZ3xZ3 is the cartesian product of Z3, seen as a 3 dimensional space immersed in R3.
 *
 *
 * @param {Number} index1
 * @param {Number} index2
 *
 * @return {Number} index
 */

function semiSumInZ3xZ3xZ3 (index1, index2) {
  var point1 = coordinatesOfIndex(index1)
    , point2 = coordinatesOfIndex(index2)
    , x, y, z
    , index

  x = ((point1[0] + point2[0]) * 2) % 3
  y = ((point1[1] + point2[1]) * 2) % 3
  z = ((point1[2] + point2[2]) * 2) % 3

  index = indexOfCoordinates([x, y, z])

  return index
}

exports.semiSumInZ3xZ3xZ3 = semiSumInZ3xZ3xZ3

/**
 * Convert point in Z3xZ3xZ3 to index
 *
 * @param {Array} coordinates
 *
 * @return {Number} index
 */

function indexOfCoordinates (point) {
  return point[0] + 3 * point[1] + 9 * point[2]
}

exports.indexOfCoordinates = indexOfCoordinates

/**
 * Convert index to point in Z3xZ3xZ3
 *
 * @param {Number} index
 *
 * @return {Array} coordinates
 */

function coordinatesOfIndex (index) {
  var x, y, z

  x = index % 3
  y = ((index - x) % 9) / 3
  z = (index - x - (3 * y)) / 9

  return [x, y, z]
}

exports.coordinatesOfIndex = coordinatesOfIndex
