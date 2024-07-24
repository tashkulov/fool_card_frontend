import { Telegraf, Markup } from 'telegraf'

const webAppURL = 'https://fool-card-frontend.vercel.app/'

const token = '7051377538:AAFVil-NoeIURCSk_3tmdPW0bQIfhz3eMWc'

const bot = new Telegraf(token)

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

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));