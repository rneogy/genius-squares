import {css} from '@emotion/react'
import {useEffect, useState} from 'react'
import {Redirect, useParams} from 'react-router-dom'
import {Socket} from 'socket.io-client'

import Page from './Page'

const cssButton = css`
  padding: 10px;
  border-radius: 5px;
  border: none;
  flex: 1;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    opacity: 0.9;
  }

  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

interface User {
  id: string
  name: string
  lobbyId: string | null
}

interface Lobby {
  id: string
  users: User[]
  status: 'lobby' | 'game'
}

interface GameLobbyParams {
  lobbyId: string
}

interface GameLobbyProps {
  socket: Socket
}

export default function GameLobby(props: GameLobbyProps): JSX.Element {
  const {socket} = props
  const {lobbyId} = useParams<GameLobbyParams>()
  const [lobby, setLobby] = useState<Lobby | null>(null)

  useEffect(() => {
    socket.on('lobby:update', (newLobby: Lobby) => {
      setLobby(newLobby)
    })

    return () => {
      socket.off('lobby:update')
    }
  }, [socket])

  useEffect(() => {
    socket.emit('lobby:join', lobbyId, (ret: Lobby | null) => {
      setLobby(ret)
    })

    return () => {
      socket.emit('lobby:leave', lobbyId)
    }
  }, [lobbyId, socket])

  if (lobby === null) {
    return <h1>Lobby Not Found!</h1>
  }

  const {id, users, status} = lobby
  const inLobby = users.some((user) => user.id === socket.id)
  if (status === 'game') {
    if (inLobby) {
      return <Redirect to={`/game/${id}`} />
    }
    return (
      <Page>
        <h1>Game in progress!</h1>
      </Page>
    )
  }

  return (
    <Page>
      <h1>Game Lobby</h1>
      <h3>{id}</h3>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            {user.id === socket.id && ' (You)'}
          </li>
        ))}
      </ul>
      <button
        type="button"
        css={cssButton}
        disabled={lobby.users.length < 2}
        onClick={() => {
          socket.emit('lobby:start')
        }}
      >
        Start Game
      </button>
    </Page>
  )
}
