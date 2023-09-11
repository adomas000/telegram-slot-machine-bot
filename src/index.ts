require('dotenv').config()

import TelegramBot from 'node-telegram-bot-api'
import { ISlotMachineSpin, getSlotMachineSpins } from './modules/spin.helpers';
import Database from './modules/playerManager';
import { spinCommandHandle } from './modules/commands';

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.bot_token!;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
const db = new Database()

const multipliers = {
  sevens: 100,
  bars: 50,
  lemons: 20,
  grapes: 10
}

type winningCombination = keyof typeof multipliers;


function handleSpin(res: TelegramBot.Message) {
  const slotValues = getSlotMachineSpins(res.dice?.value!)
  const winningCombination = getWinningCombination(slotValues)
  
  if (!winningCombination) {
    return bot.sendMessage(res.chat.id, 'You lose');
  }

  const multiplier = getMultiplier(winningCombination)
  bot.sendMessage(res.chat.id, `Holy shit bro, ${multiplier}x returns!!`);
}

function getMultiplier(value: winningCombination) {
  return multipliers[value]
}

function getWinningCombination(slotValues: ISlotMachineSpin): winningCombination | false {
  for (const emoji of ['grape', 'lemon', 'bar', 'seven']) {
    if (
      slotValues.first === emoji &&
      slotValues.second === emoji &&
      slotValues.third === emoji
      ) {
        return (emoji + 's') as winningCombination
      }
  }
  return false
}

// function getSlotValues(value: number) {

//     // Define a map from 2-bit values to stickers
//     let map = [1, 2, 3, 0];
//     // Initialize an array for the slot animations
//     let slots = [];
//     // If we're in a winning value == 64
//     if (value == 64) {
//       // Choose the winning stickers for each slot
//       slots = [3, 9, 15];
//     } else {
//       // Otherwise, choose the non-winning stickers for each slot
//       // Mask out the first two bits and right shift by four positions
//       let slot1 = (value & 0b110000) >> 4;
//       // Mask out the middle two bits and right shift by two positions
//       let slot2 = (value & 0b001100) >> 2;
//       // Mask out the last two bits
//       let slot3 = value & 0b000011;
//       // Subtract one from each slot and use the map to get the sticker index
//       slots = [4 + map[slot1 - 1], 10 + map[slot2 - 1], 16 + map[slot3 - 1]];
//     }
//     // Return an array of the slot animations
//     return slots;
  
// }


// // 3 citrinos: 6, 12, 19
// // berr l l : 6 12 18
// // bar l 7 : 7 12 17











// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   console.log(msg)

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received your message');
// });