import {css} from '@emotion/react'

import {useGameDispatch} from './GameLogicProvider'
import Square from './Square'
import {BoardState, Coordinate} from './types'

const cssBoard = css`
  width: ${600 + 4 * 12}px;
  height: ${600 + 4 * 12}px;
  line-height: 0;
`

interface BoardProps {
  state: BoardState
  currentPath: Coordinate[]
}

export default function Board(props: BoardProps): JSX.Element {
  const {state, currentPath} = props
  const dispatch = useGameDispatch()

  function mouseHandler(event: React.MouseEvent): void {
    dispatch({type: 'handleMouseEvent', event})
  }

  return (
    <div
      css={cssBoard}
      onMouseDown={mouseHandler}
      onMouseUp={mouseHandler}
      onMouseMove={mouseHandler}
    >
      {state.map((square) => (
        <Square
          key={square.squareId}
          id={square.squareId}
          color={currentPath.includes(square.squareId) ? 'gray' : square.color}
        />
      ))}
    </div>
  )
}
