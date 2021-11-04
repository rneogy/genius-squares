import {css} from '@emotion/react'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Socket} from 'socket.io-client'

import Page from './Page'

const cssBody = css`
  flex: 1;
  display: flex;
  flex-direction: row;
  width: 100%;

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

const cssInput = css`
  padding: 10px;
  border-radius: 5px;
  flex: 0.5;
  margin: 10px 0;
  margin-right: 5px;
`

const cssRoomContainer = css`
  flex: 1;
  display: flex;
  flex-direction: row;
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
            style={{backgroundColor: '#90BE6D'}}
            onClick={handleCreateLobby}
          >
            New Game
          </button>
          <div style={{textAlign: 'center'}}>or</div>
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
            />
            <button
              type="button"
              css={cssButton}
              style={{backgroundColor: '#EA9010'}}
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
