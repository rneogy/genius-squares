import {css} from '@emotion/react'

interface SquareProps {
  color?: string
  id?: string
  small?: boolean
}

export default function Square(props: SquareProps): JSX.Element {
  const {color = 'white', id, small} = props
  const size = small ? 50 : 100
  const cssSquare = css`
    background: ${color};
    border: 1px solid ${small ? 'transparent' : 'gray'};
    box-sizing: border-box;
    width: ${size}px;
    height: ${size}px;
    display: inline-block;
    margin: 4px;
  `

  return <div css={cssSquare} data-square-id={id} />
}
