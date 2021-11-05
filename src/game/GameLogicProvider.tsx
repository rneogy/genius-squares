/* eslint-disable no-param-reassign */
import produce from 'immer'
import {createContext, useContext, Dispatch, ReactNode, useReducer, useEffect} from 'react'

import {DICE} from './constants'
import {GameState, SquareState} from './types'
import {
  areAdjacent,
  clearPiece,
  coordinateToIndex,
  getMatchingPiece,
  hasPlayerWon,
  indexToCoordinate,
} from './utils'

export const GameDispatchContext = createContext<Dispatch<GameStateAction> | null>(null)

function generateInitialState(presetBlockers?: string[]): GameState {
  // Roll the dice
  const blockers = presetBlockers || DICE.map((die) => die[Math.floor(Math.random() * 6)]).sort()
  const blockerIndices = blockers.map(coordinateToIndex)
  const board = [...Array(36)].map<SquareState>((_, i) => ({
    type: 'empty',
    color: 'white',
    squareId: indexToCoordinate(i),
  }))
  blockerIndices.forEach((index) => {
    board[index] = {type: 'blocker', color: 'black', squareId: indexToCoordinate(index)}
  })
  return {
    usedPieces: [],
    boardState: board,
    blockers,
    isMouseDown: false,
    currentPath: [],
    playerHasWon: false,
  }
}

export type GameStateAction =
  | {
      type: 'reset'
    }
  | {
      type: 'handleMouseEvent'
      event: React.MouseEvent
    }

const reducer = produce((draft: GameState, action: GameStateAction) => {
  switch (action.type) {
    case 'reset': {
      return generateInitialState()
    }
    case 'handleMouseEvent': {
      const {event} = action
      if (draft.playerHasWon) break
      switch (event.type) {
        case 'mousedown': {
          draft.isMouseDown = true
          const square = event.target as Element
          const id = square.getAttribute('data-square-id')
          if (id) {
            const current = draft.boardState[coordinateToIndex(id)]
            if (current.type === 'piece') {
              draft.boardState = clearPiece(current.pieceId, draft.boardState)
              draft.usedPieces = draft.usedPieces.filter((pieceId) => pieceId !== current.pieceId)
            }
            if (current.type === 'empty') {
              draft.currentPath.push(id)
            }
          }
          break
        }
        case 'mousemove': {
          if (!draft.isMouseDown) break
          const square = event.target as Element
          const id = square.getAttribute('data-square-id')
          if (id) {
            const current = draft.boardState[coordinateToIndex(id)]
            if (current.type !== 'empty') {
              break
            }
            const index = draft.currentPath.indexOf(id)
            if (index >= 0) {
              // Target already in path, do nothing.
              break
            }
            if (!draft.currentPath.some((currentSquare) => areAdjacent(currentSquare, id))) {
              // If the target square isn't adjacent to the path, do nothing.
              break
            }
            // Target isn't in path and is valid, add it to the path.
            draft.currentPath.push(id)
            if (draft.currentPath.length > 4) {
              // Stop if too long
              draft.isMouseDown = false
              draft.currentPath = []
            }
          }
          break
        }
        case 'mouseup':
          // Finish/evaluate
          if (draft.currentPath.length) {
            const piece = getMatchingPiece(draft.currentPath)
            if (piece !== null) {
              draft.boardState = clearPiece(piece.pieceId, draft.boardState)
              draft.usedPieces = draft.usedPieces.filter((pieceId) => pieceId !== piece.pieceId)
              draft.currentPath.map(coordinateToIndex).forEach((index) => {
                draft.boardState[index] = {
                  type: 'piece',
                  color: piece.color,
                  pieceId: piece.pieceId,
                  squareId: indexToCoordinate(index),
                }
              })
              draft.usedPieces.push(piece.pieceId)
              draft.playerHasWon = hasPlayerWon(draft.boardState)
            }
          }
          draft.isMouseDown = false
          draft.currentPath = []
          break
        default:
          break
      }
      break
    }
    default:
      throw new Error('Unexpected game state action type')
  }
  return draft
})

interface GameLogicProviderProps {
  children: (state: GameState) => ReactNode
  blockers?: string[]
  onWin?: () => void
}

export default function GameLogicProvider(props: GameLogicProviderProps): JSX.Element {
  const {children, blockers, onWin} = props
  const [state, dispatch] = useReducer(reducer, generateInitialState(blockers))

  useEffect(() => {
    if (state.playerHasWon && onWin) {
      onWin()
    }
  }, [state.playerHasWon, onWin])

  return (
    <GameDispatchContext.Provider value={dispatch}>{children(state)}</GameDispatchContext.Provider>
  )
}

export function useGameDispatch(): Dispatch<GameStateAction> {
  const dispatch = useContext(GameDispatchContext)
  if (dispatch === null) {
    throw new Error('Cannot use useGameDispatch outside of GameDispatchContext!')
  }
  return dispatch
}
