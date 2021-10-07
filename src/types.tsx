export interface GameState {
  boardState: BoardState
  usedPieces: string[]
  blockers: Coordinate[]
  isMouseDown: boolean
  currentPath: Coordinate[]
  playerHasWon: boolean
}

export interface Piece {
  pieceId: string
  color: string
  shape: boolean[][]
  used?: boolean
}

export type BoardState = SquareState[]

export type SquareState =
  | {
      type: 'piece'
      color: string
      pieceId: string
      squareId: Coordinate
    }
  | {
      type: 'blocker'
      color: 'black'
      squareId: Coordinate
    }
  | {
      type: 'empty'
      color: 'white'
      squareId: Coordinate
    }

export type Die = string[]

export type Coordinate = string
