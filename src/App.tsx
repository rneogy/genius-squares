import {css, Global} from '@emotion/react'
import {StrictMode, useEffect, useState} from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {io, Socket} from 'socket.io-client'

import Home from './Home'
import Lobby from './lobby/Lobby'

const cssGlobal = css`
  @import url('https://fonts.googleapis.com/css2?family=Questrial&display=swap');

  body {
    * {
      font-family: 'Questrial', sans-serif;
    }
  }
`

export default function App(): JSX.Element {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`)
    setSocket(newSocket)
    return () => {
      newSocket.close()
    }
  }, [])

  if (socket === null) {
    return <div>Loading...</div>
  }
  return (
    <StrictMode>
      <Global styles={cssGlobal} />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home socket={socket} />
          </Route>
          <Route path="/lobby/:lobbyId">
            <Lobby socket={socket} />
          </Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </StrictMode>
  )
}
