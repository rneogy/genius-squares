import {Socket} from 'socket.io-client'

import Page from '../Page'
import {cssButton} from '../styles'

import {PreGameLobbyInfo} from './types'

interface PreGameLobbyProps {
  lobby: PreGameLobbyInfo
  socket: Socket
}

export default function PreGameLobby(props: PreGameLobbyProps): JSX.Element {
  const {lobby, socket} = props
  const {id, users} = lobby

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
