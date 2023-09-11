import TelegramBot from "node-telegram-bot-api";
import PlayerManager from "./playerManager"
import bot from './bot'
import { validateAndParseFloat } from "./helpers";

bot.onText(/\/spin\s+([\d.]+)/, (msg, match) => spinCommandHandle(msg, validateAndParseFloat(match![1])))

async function spinCommandHandle(msg: TelegramBot.Message, amount: number) {
  if (!amount) {
    return bot.sendMessage(msg.chat.id, "Losimo aparatas tokiu kupiuru nepriima")
  }

  bot.sendDice(msg.chat.id, {emoji: '🎰', disable_notification: true}).then((res) => {
  //     setTimeout(() => handleSpin(res), 3000)
  //   })
  
  await PlayerManager.getPlayer(msg.from!)
}