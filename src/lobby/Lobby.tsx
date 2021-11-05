import {useState, useEffect} from 'react'
import {Socket} from 'socket.io-client'
import {useParams} from 'react-router-dom'

import Page from '../Page'

import PreGameLobby from './PreGameLobby'
import {LobbyInfo} from './types'
import GameLobby from './GameLobby'
import PostGameLobby from './PostGameLobby'

interface LobbyParams {
  lobbyId: string
}

interface LobbyProps {
  socket: Socket
}

export default function Lobby(props: LobbyProps): JSX.Element {
  const {socket} = props
  const [lobby, setLobby] = useState<LobbyInfo | null>(null)
  const {lobbyId} = useParams<LobbyParams>()

  useEffect(() => {
    socket.emit('lobby:join', lobbyId)

    return () => {
      socket.emit('lobby:leave', lobbyId)
    }
  }, [lobbyId, socket])

  useEffect(() => {
    socket.on('lobby:update', (newLobby: LobbyInfo) => {
      setLobby(newLobby)
    })

    return () => {
      socket.off('lobby:update')
    }
  }, [socket])

  if (lobby === null) {
    return (
      <Page>
        <h1>Lobby Not Found!</h1>
      </Page>
    )
  }

  switch (lobby.status) {
    case 'pregame': {
      return <PreGameLobby lobby={lobby} socket={socket} />
    }
    case 'game': {
      return <GameLobby lobby={lobby} socket={socket} />
    }
    case 'postgame': {
      return <PostGameLobby lobby={lobby} socket={socket} />
    }
    default: {
      throw new Error(`Unknown lobby status: ${lobby}`)
    }
  }
}
