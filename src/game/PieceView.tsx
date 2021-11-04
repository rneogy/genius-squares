/* eslint-disable react/no-array-index-key */
import {css} from '@emotion/react'

import Square from './Square'
import {Piece} from './types'

interface PieceViewProps {
  piece: Piece
  used?: boolean
}

export default function PieceView(props: PieceViewProps): JSX.Element {
  const {piece, used} = props
  const {shape, color, pieceId} = piece

  const cssContainer = css`
    width: ${shape[0].length * 108}px;
    line-height: 0;
    margin-bottom: 50px;
    opacity: ${used ? 0.2 : 1};
  `

  return (
    <div css={cssContainer}>
      {shape.map((row, i) => (
        <div key={`row-${i}`}>
          {row.map((square, j) => (
            <Square key={`${pieceId}_${i}_${j}`} color={square ? color : 'white'} small />
          ))}
        </div>
      ))}
    </div>
  )
}
