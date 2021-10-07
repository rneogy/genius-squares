import {Die, Piece} from './types'

export const DICE: Die[] = [
  ['a1', 'c1', 'd1', 'd2', 'e2', 'f3'],
  ['b4', 'd4', 'c4', 'e3', 'c3', 'd3'],
  ['f2', 'f2', 'b6', 'e1', 'a5', 'a5'],
  ['e4', 'e5', 'e6', 'd5', 'f4', 'f5'],
  ['d6', 'b5', 'f6', 'c6', 'c5', 'a4'],
  ['a6', 'a6', 'a6', 'f1', 'f1', 'f1'],
  ['a3', 'c2', 'b2', 'b3', 'b1', 'a2'],
]

export const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f']

export const PIECES: Piece[] = [
  {pieceId: '1', color: 'steelblue', shape: [[true]]},
  {pieceId: '2', color: 'tan', shape: [[true, true]]},
  {pieceId: '3', color: 'orange', shape: [[true, true, true]]},
  {pieceId: '4', color: 'brown', shape: [[true, true, true, true]]},
  {
    pieceId: 'square',

    color: 'green',
    shape: [
      [true, true],
      [true, true],
    ],
  },
  {
    pieceId: 'corner',

    color: 'hotpink',
    shape: [
      [true, true],
      [true, false],
    ],
  },
  {
    pieceId: 'T',

    color: 'gold',
    shape: [
      [true, true, true],
      [false, true, false],
    ],
  },
  {
    pieceId: 'L',

    color: 'darkturquoise',
    shape: [
      [true, true, true],
      [true, false, false],
    ],
  },
  {
    pieceId: 'zig',

    color: 'red',
    shape: [
      [true, true, false],
      [false, true, true],
    ],
  },
]
