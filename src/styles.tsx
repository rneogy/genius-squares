import {css} from '@emotion/react'

export const cssButton = css`
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.2s;
  font-size: 18px;

  :hover {
    opacity: 0.9;
  }

  :disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const cssInput = css`
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  margin-right: 5px;
`
