const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data:new SlashCommandBuilder().setName("user").setDescription("Gives info about the user"),
    async execute(interaction){
        await interaction.reply(`Command run by ${interaction.user.username},who joined at ${interaction.member.joinedAt}.`)
    }

    }