require("dotenv").config();

const fs = require("fs");
const { REST, Routes } = require('discord.js');
const { token,client_id, guild_id } = process.env;

module.exports = (client) => {
  client.commandHandler = async () => {
    const commandFolder = fs.readdirSync("./src/commands");

    for (const folder of commandFolder) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);

        commandArray.push(command.data.toJSON());

        console.log(
          `Command ${command.data.name} has been registered successfully.`
        );
      }
    }

    const rest = new REST().setToken(token);
    try {
      console.log(`Started refreshing  application (/) commands.`);
  
      // The put method is used to fully refresh all commands in the guild with the current set
      const data = await rest.put(
        Routes.applicationGuildCommands(client_id, guild_id),
        { body: client.commandArray },
      );
  
      console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
      // And of course, make sure you catch and log any errors!
      console.error(error);
    }
  };
};
