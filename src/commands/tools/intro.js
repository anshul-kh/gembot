const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("intro")
    .setDescription("Introduction Of Bot"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const newMessage = "Hello I am  GemBot ...";

    await interaction.editReply({
      content: newMessage,
    });
  },
};
