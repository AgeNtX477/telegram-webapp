const TelegramBot = require('node-telegram-bot-api')
const config = require('./config.js')

const bot = new TelegramBot(config.token, { polling: true })
// const document = './doc.docx'

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg?.chat?.id
  const resp = match[1]
  bot.sendMessage(chatId, resp)
})

bot.on('message', async msg => {
  const chatId = msg?.chat?.id
  const text = msg?.text

  if (text === '/start') {
    await bot.sendMessage(
      chatId,
      'Нажмите на кнопку ниже, что-бы выполнить авторизацию в нашем портале',
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Авторизоваться через telegramm',
                web_app: { url: config?.webApp }
              }
            ]
          ]
        }
      }
    )
  }
  else if (text === '/sendFile') {
    
    await bot.sendDocument(chatId, document, {
      caption: 'Направляю запрашиваемый файл'
    })
  }
})
