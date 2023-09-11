import PlayerManager, { IPlayer, IPlayerDoc, IPlayerInfo, IPlayerStatistics, IPlayerWallet } from "./playerManager";

export default class Player {
  private player: IPlayerInfo
  private wallet: IPlayerWallet
  private statistics: IPlayerStatistics

  private statusHistory: IOperationStatus[] = [] 

  constructor(player: IPlayerDoc) {
    this.player = player.player;
    this.wallet = player.wallet;
    this.statistics = player.statistics

  }

  addToWallet(amount: number) {
    //this.wallet
  }

  pay(amount: number) {
    const amountNormalised = parseFloat(amount.toFixed(2))
    if ((this.wallet.amount - amountNormalised) < 0) {
      // Feature: show another message after consecutive error
      const last2Statuses = this.statusHistory.slice(this.statusHistory.length - 2)

      return this.createStatus('error', 'Sere, jusu kortele buvo atmesta')
    }

  }

  private createStatus(status: 'ok' | 'error', errorMsg: string | undefined, data?: any): IOperationStatus {
    const statusRes = {
      status,
      errorMsg,
      data
    };

    this.statusHistory.push(statusRes)
    return statusRes
  }

  async syncWithDb() {
    PlayerManager.updatePlayer({
      player: this.player,
      wallet: this.wallet,
      statistics: this.statistics
    })
  }
}

interface IOperationStatus {
  status: 'ok' | 'error',
  errorMsg?: string,
  data?: any
}