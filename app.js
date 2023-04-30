import { Bard } from "googlebard";
import { config } from "dotenv";
import { Client, IntentsBitField } from "discord.js"

config();

const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});


client.on("ready", ()=>{console.log("The AI bot is online");});


client.on("messageCreate", async (message) => {
    if (message.author.bot) {
        return;
    }

    if (message.content.substring(0, 1) === "!") {
        let bot = new Bard(process.env.COOKIES);
        const prompt = message.content.substring(1);

        let response = await bot.ask(prompt);
        message.reply(response);
    }
});

client.login(process.env.DISCORD_KEY);

