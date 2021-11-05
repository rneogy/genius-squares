import Confetti from 'react-confetti'
import {Link} from 'react-router-dom'
import {Socket} from 'socket.io-client'

import Page from '../Page'
import {cssButton} from '../styles'

import {PostGameLobbyInfo} from './types'

interface PostGameLobbyProps {
  lobby: PostGameLobbyInfo
  socket: Socket
}

export default function PostGameLobby(props: PostGameLobbyProps): JSX.Element {
  const {lobby, socket} = props
  const youWon = socket.id === lobby.winner.id
  return (
    <Page>
      {youWon && <Confetti initialVelocityY={-10} recycle={false} />}
      <h1>{youWon ? 'You' : lobby.winner.name} Won!</h1>
      <button
        type="button"
        css={cssButton}
        onClick={() => socket.emit('lobby:start')}
        style={{backgroundColor: '#90BE6D'}}
        disabled={lobby.users.length < 2}
      >
        Play Again
      </button>
      <Link to="/">
        <button type="button" css={cssButton}>
          Leave Lobby
        </button>
      </Link>
    </Page>
  )
}
