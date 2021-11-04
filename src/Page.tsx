import {css} from '@emotion/react'

const cssPage = css`
  margin: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
`

interface PageProps {
  children: React.ReactNode
}

export default function Page(props: PageProps): JSX.Element {
  const {children} = props
  return <div css={cssPage}>{children}</div>
}
