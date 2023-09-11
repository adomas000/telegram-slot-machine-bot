import log from './logger'
import Player from './player'
import datastore from './database'


export default class PlayerManager {

  

  static async getPlayer(playerInfo: IPlayerInfo): Promise<Player> {
   let player = await datastore.findOne<IPlayerDoc>({'player.id': playerInfo.id, 'player.username': playerInfo.username})
   
   if (!player) {
    player = await PlayerManager.createNewPlayer(playerInfo.id, playerInfo.username, playerInfo.firstName, playerInfo.lastName)
   }

   return new Player(player)
  }

  static async updatePlayer(updatedPlayer: IPlayer) {
    const numReplaced = await datastore.update(
      {'player.id': updatedPlayer.player.id, 'player.username': updatedPlayer.player.username},
      updatedPlayer
    )
    
    if (!numReplaced) {
      throw new Error(`Failed to update document for '${updatedPlayer.player.username}'`)
    }
  }

  private static async createNewPlayer(id: number, username: string, firstName: string, lastName: string) {
    const newPlayer: IPlayer = {
      player: {id, username, firstName, lastName},
      wallet: {
        amount: 0,
      },
      statistics: {
        spins: 0,
        berryWins: 0,
        lemonWins: 0,
        barWins: 0,
        sevenWins: 0,
        begs: 0,

        amountTransfered: 0,
        amountWon: 0,
        amountLost: 0
      }
    };

    return await datastore.insert<IPlayer>(newPlayer)
  }

  static async transferAmountBetweenPlayers(playerFrom: IPlayer, playerTo: IPlayer, amount: number) {
     
  }
}
export interface IPlayerInfo {
  id: number, 
  username: string, 
  firstName: string, 
  lastName: string
}

export interface IPlayerWallet {
  amount: number,
}

export interface IPlayerStatistics {
  /** total spins */
  spins: number,

  berryWins: number,
  lemonWins: number,
  barWins: number,
  sevenWins: number,
  /** amount begged */
  begs: number,
  //
  amountTransfered: number,
  amountWon: number,
  amountLost: number
}

export interface IPlayer {
  player: IPlayerInfo,
  wallet: IPlayerWallet,
  statistics: IPlayerStatistics
}

export type IPlayerDoc = IPlayer & {_id: string}