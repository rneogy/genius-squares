import {css, Global} from '@emotion/react'
import {StrictMode} from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'

import GameLogicProvider from './GameLogicProvider'
import GameView from './GameView'

const cssGlobal = css`
  @import url('https://fonts.googleapis.com/css2?family=Questrial&display=swap');

  body {
    font-family: 'Questrial', sans-serif;
  }
`

export default function App(): JSX.Element {
  return (
    <StrictMode>
      <Global styles={cssGlobal} />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <GameLogicProvider>{(state) => <GameView state={state} />}</GameLogicProvider>
          </Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </StrictMode>
  )
}
