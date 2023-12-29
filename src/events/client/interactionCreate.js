module.exports = {
    name:"interactionCreate",
    async execute(interaction,client){
        if (!interaction.isChatInputCommand()) {
            return;
          }
        
          const command = interaction.client.commands.get(interaction.commandName);
        
          if (!command) {
            console.error(`Command with name ${interaction.commandName} not found`);
            return;
          }
        
          try {
            await command.execute(interaction,client);
          } catch (error) {
            console.error(error);
        
            if (interaction.replied || interaction.deferred) {
              await interaction.followUp({
                content: "There was some error while executing command",
                ephemeral: true,
              });
            } else {
              await interaction.reply({
                content: "There was some error while executing this command",
                ephemeral: true,
              });
            }
          }
        
        }
    
};