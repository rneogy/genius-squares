import {css} from '@emotion/react'
import Confetti from 'react-confetti'

import Board from './Board'
import {useGameDispatch} from './GameLogicProvider'
import PieceBox from './PieceBox'
import {GameState} from './types'

const cssGameView = css`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const cssTitle = css`
  font-size: 60px;
  margin: 18px 0;
`

const cssDescription = css`
  font-size: 18px;
`

const cssGameContainer = css`
  display: flex;
  margin: 30px 0;
`

const cssWinBanner = css`
  width: 100%;
  font-size: 40px;
  text-align: center;
`

interface GameViewProps {
  state: GameState
  multiplayer?: boolean
}

export default function GameView(props: GameViewProps): JSX.Element {
  const {state, multiplayer} = props
  const dispatch = useGameDispatch()

  return (
    <div css={cssGameView}>
      <div css={cssTitle}>The Genius Square</div>
      <div css={cssDescription}>
        Fit all the pieces from the right in the grid on the left. Add pieces by drawing them on the
        grid.
      </div>
      <div css={cssGameContainer}>
        <Board state={state.boardState} currentPath={state.currentPath} />
        <PieceBox usedPieces={state.usedPieces} />
      </div>
      <div css={cssWinBanner}>
        {state.playerHasWon && (
          <>
            <div>You Won!</div>
            <Confetti initialVelocityY={-10} recycle={false} />
          </>
        )}
        {!multiplayer && (
          <button type="button" onClick={() => dispatch({type: 'reset'})}>
            {state.playerHasWon ? 'Play Again' : 'New Board'}
          </button>
        )}
      </div>
    </div>
  )
}
