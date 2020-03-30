const Discord = require('discord.js')
const bot = new Discord.Client()
var unirest = require("unirest")

var req = unirest("GET", "https://covid-19-data.p.rapidapi.com/country/code")

req.query({
	"format": "undefined",
	"code": "au"
})

req.headers({
	"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
	"x-rapidapi-key": "ae8b26bc87mshd2604b5c871de22p100349jsn10c1f2b73d7c"
})

const token = 'NjkzOTQ5MDM1NTYzNzEyNTQz.XoEgiw.eN-_nfy2iiVyyZwgrPFYyPPYXFQ'

bot.on('ready', () => {
    console.log('Bot is online!')
})

bot.on('message', msg => {
    if (msg.content.toLowerCase() == "!corona") {
        req.end(function (res) {
            if (res.error) throw new Error(res.error);
            console.log(msg.author.username)
            msg.reply(`There are currently ${res.body[0].confirmed} cases, ${res.body[0].recovered} have recovered and ${res.body[0].deaths} have died.`)
        });
    }
})

bot.login(token)