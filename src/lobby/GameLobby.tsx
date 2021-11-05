import {Socket} from 'socket.io-client'

import GameLogicProvider from '../game/GameLogicProvider'
import GameView from '../game/GameView'
import Page from '../Page'

import {GameLobbyInfo} from './types'

interface GameLobbyProps {
  lobby: GameLobbyInfo
  socket: Socket
}

export default function GameLobby(props: GameLobbyProps): JSX.Element {
  const {lobby, socket} = props

  const {users} = lobby
  const inLobby = users.some((user) => user.id === socket.id)

  function handleWin(): void {
    socket.emit('lobby:win')
  }

  if (inLobby) {
    const {blockers} = lobby
    return (
      <GameLogicProvider blockers={blockers} onWin={handleWin}>
        {(state) => <GameView state={state} multiplayer />}
      </GameLogicProvider>
    )
  }

  return (
    <Page>
      <h1>Game in progress!</h1>
    </Page>
  )
}
