
import TelegramBot from 'node-telegram-bot-api'

const token = process.env.bot_token!;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


// Matches "/echo [whatever]"
// bot.onText(new RegExp(/.*/), (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message
//   console.log(msg)
//   // const chatId = msg.chat.id;
//   // const resp = match && match[1] || "oop"; // the captured "whatever"

//   // send back the matched "whatever" to the chat
//   // bot.sendMessage(chatId, resp);
//   bot.sendDice(msg.chat.id, {emoji: '🎰', disable_notification: true}).then((res) => {
//     setTimeout(() => handleSpin(res), 3000)
//   })
// });

export default bot
