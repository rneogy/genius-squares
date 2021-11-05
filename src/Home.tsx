import {css} from '@emotion/react'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Socket} from 'socket.io-client'

import Page from './Page'
import {cssButton, cssInput} from './styles'

const cssBody = css`
  flex: 1;
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 80px;

  p {
    font-size: 24px;
  }

  > div {
    flex: 1;
    margin: 0 20px;
    display: flex;
    flex-direction: column;

    > h2 {
      width: 100%;
      text-align: center;
    }
  }
`

const cssRoomContainer = css`
  flex: 1;
  display: flex;
  flex-direction: row;

  > input {
    font-size: 24px;
  }
`

interface HomeProps {
  socket: Socket
}

interface Lobby {
  id: string
  users: string[]
}

export default function Home(props: HomeProps): JSX.Element {
  const {socket} = props
  const history = useHistory()

  const [lobbyCode, setLobbyCode] = useState('')

  const handleJoinLobby = (): void => {
    if (lobbyCode.length === 4) {
      history.push(`/lobby/${lobbyCode}`)
    }
  }

  const handleCreateLobby = (): void => {
    socket.emit('lobby:create', (lobby: Lobby) => {
      history.push(`/lobby/${lobby.id}`)
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleJoinLobby()
    }
  }

  return (
    <Page>
      <h1>The Genius Square</h1>
      <div css={cssBody}>
        <div>
          <h2>About</h2>
          <p>
            The Genius Square is an online, competitive, container-packing game. Draw pieces on a
            randomly-generated 6x6 grid with certain squares being blocked off. There&apos;s always
            a way to make the pieces fit!
          </p>
          <p>
            Compete with your friends to see who can finish the puzzle in the shortest amount of
            time.
          </p>
        </div>
        <div>
          <h2>Play the Game!</h2>
          <button
            type="button"
            css={cssButton}
            style={{backgroundColor: '#90BE6D', flex: 1}}
            onClick={handleCreateLobby}
          >
            New Game
          </button>
          <div style={{textAlign: 'center', flex: 0}}>or</div>
          <div css={cssRoomContainer}>
            <input
              type="text"
              placeholder="Lobby Code"
              value={lobbyCode}
              onChange={(e) =>
                e.target.value.length <= 4 && setLobbyCode(e.target.value.toUpperCase())
              }
              onKeyDown={handleKeyDown}
              css={cssInput}
              style={{flex: 0.5}}
            />
            <button
              type="button"
              css={cssButton}
              style={{backgroundColor: '#EA9010', flex: 1}}
              onClick={handleJoinLobby}
              disabled={lobbyCode.length !== 4}
            >
              Join Game
            </button>
          </div>
        </div>
      </div>
    </Page>
  )
}
