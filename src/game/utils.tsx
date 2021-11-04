import {LETTERS, PIECES} from './constants'
import {BoardState, Coordinate, Piece} from './types'

export function coordinateToIndex(coordinate: Coordinate): number {
  const letter = coordinate[0].toLowerCase()
  const row = LETTERS.indexOf(letter)
  const column = Number(coordinate[1]) - 1
  return row * 6 + column
}

export function indexToCoordinate(index: number): Coordinate {
  const row = Math.floor(index / 6)
  const column = index % 6
  return `${LETTERS[row]}${column + 1}`
}

export function clearPiece(pieceId: string, board: BoardState): BoardState {
  return board.map((boardSquare) => {
    if (boardSquare.type === 'piece' && boardSquare.pieceId === pieceId) {
      return {type: 'empty', color: 'white', squareId: boardSquare.squareId}
    }
    return boardSquare
  })
}

export function getMatchingPiece(currentPath: Coordinate[]): Piece | null {
  if (currentPath.length === 1) {
    return PIECES[0]
  }
  if (currentPath.length === 2) {
    return PIECES[1]
  }

  const letters = currentPath.map((coordinate) => coordinate[0])
  const numbers = currentPath.map((coordinate) => Number(coordinate[1]))
  const minLetter = letters.reduce((min, current) => (min < current ? min : current))
  const maxLetter = letters.reduce((max, current) => (max > current ? max : current))
  const minNumber = Math.min(...numbers)
  const maxNumber = Math.max(...numbers)

  if (currentPath.length === 3) {
    if (minLetter === maxLetter || minNumber === maxNumber) {
      // it's a straight line
      return PIECES[2]
    }
    // it's a corner piece
    return PIECES[5]
  }
  // it's 4 long
  if (minLetter === maxLetter || minNumber === maxNumber) {
    // it's a straight line
    return PIECES[3]
  }
  if (
    maxNumber - minNumber === 1 &&
    LETTERS.indexOf(maxLetter) - LETTERS.indexOf(minLetter) === 1
  ) {
    // it's a square
    return PIECES[4]
  }
  const letterCount = letters.reduce((accumulator, current) => {
    if (!accumulator[current]) {
      return {...accumulator, [current]: 1}
    }
    return {...accumulator, [current]: accumulator[current] + 1}
  }, {} as Record<string, number>)

  const numberCount = numbers.map(String).reduce((accumulator, current) => {
    if (!accumulator[current]) {
      return {...accumulator, [current]: 1}
    }
    return {...accumulator, [current]: accumulator[current] + 1}
  }, {} as Record<string, number>)

  if (
    Object.values(letterCount).some((count) => count >= 3) ||
    Object.values(numberCount).some((count) => count >= 3)
  ) {
    // has at least 3 in a row
    const topLeft = minLetter + minNumber
    const topRight = minLetter + maxNumber
    const bottomLeft = maxLetter + minNumber
    const bottomRight = maxLetter + maxNumber
    if (
      (currentPath.includes(topLeft) && currentPath.includes(bottomRight)) ||
      (currentPath.includes(topRight) && currentPath.includes(bottomLeft))
    ) {
      // must be L
      return PIECES[7]
    }
    // otherwise must be T
    return PIECES[6]
  }
  // must be zig since no 3 in a row
  return PIECES[8]
}

export function areAdjacent(c0: Coordinate, c1: Coordinate): boolean {
  const c0Letter = LETTERS.indexOf(c0[0])
  const c0Number = Number(c0[1])
  const c1Letter = LETTERS.indexOf(c1[0])
  const c1Number = Number(c1[1])

  return Math.abs(c0Letter - c1Letter) + Math.abs(c0Number - c1Number) === 1
}

export function hasPlayerWon(board: BoardState): boolean {
  return board.every((square) => square.type !== 'empty')
}
