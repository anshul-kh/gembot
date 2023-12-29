require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { token } = process.env;

const fs = require("fs");
const path = require("node:path");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.commandArray = [];

const folderPath = path.join(__dirname, "functions");
const functionsFolder = fs.readdirSync(folderPath);

for (const folder of functionsFolder) {
  const functionPath = path.join(folderPath, folder);
  const functionFiles = fs
    .readdirSync(functionPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of functionFiles) {
    const filePath = path.join(functionPath, file);
    require(filePath)(client);
  
  }
}


client.eventHandlers();
client.commandHandler();
client.login(token);
