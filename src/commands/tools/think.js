require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chat")
    .setDescription("Chat with Gemini AI ")
    .addStringOption((option) =>
      option.setName("prompt").setDescription("Prompt Text").setRequired(true)
    ),

  async execute(interaction, client) {

    const message = await interaction.deferReply({
        fetchReply:true
    })

    const { gemini_ai_api_key } = process.env;
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(gemini_ai_api_key);

    const { commandName, options } = interaction;
    const prompt = options.getString("prompt");

    //initializing the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    

    await interaction.editReply({
            content:text,
        });
  },
};
