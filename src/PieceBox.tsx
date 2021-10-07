import {css} from '@emotion/react'

import {PIECES} from './constants'
import PieceView from './PieceView'

const cssPieceBox = css`
  width: 600px;
  border: 2px solid gray;
  box-sizing: border-box;
  height: ${600 + 4 * 10}px;
  margin: 4px 20px;
  column-count: 2;
  padding: 10px;
`

interface PieceBoxProps {
  usedPieces: string[]
}

export default function PieceBox(props: PieceBoxProps): JSX.Element {
  const {usedPieces} = props
  return (
    <div css={cssPieceBox}>
      {PIECES.map((piece) => (
        <PieceView key={piece.pieceId} piece={piece} used={usedPieces.includes(piece.pieceId)} />
      ))}
    </div>
  )
}
