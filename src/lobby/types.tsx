export interface User {
  id: string
  name: string
  lobbyId: string | null
}

interface BaseLobbyInfo {
  id: string
  users: User[]
}

export interface PreGameLobbyInfo extends BaseLobbyInfo {
  status: 'pregame'
}

export interface GameLobbyInfo extends BaseLobbyInfo {
  status: 'game'
  blockers: string[]
}

export interface PostGameLobbyInfo extends BaseLobbyInfo {
  status: 'postgame'
  winner: User
  blockers: string[]
}

export type LobbyInfo = PreGameLobbyInfo | GameLobbyInfo | PostGameLobbyInfo
