import { Telegraf, Markup } from 'telegraf'

const webAppURL = 'https://tg-angular-app-87377.web.app'

const token = '7051377538:AAFVil-NoeIURCSk_3tmdPW0bQIfhz3eMWc'

const bot = new Telegraf(token)
bot.launch();
// bot.command()

bot.command('start', (ctx) => {
    ctx.reply(
        'yes, click the button below',
        Markup.keyboard([
            Markup.button.webApp(
                'отправить собщение',
                webAppURL
            )
        ])

    )
});

