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
    const maxLength = 1000;
    const response = await result.response;
    const text = response.text();
    

    if(response.length < maxLength){
        await interaction.editReply({
            content: text,
          });
    }else{
        function splitMessage(messageContent, maxLength) {
            const chunks = [];
            for (let i = 0; i < messageContent.length; i += maxLength) {
              chunks.push(messageContent.substring(i, i + maxLength));
            }
            return chunks;
          }
          const messageChunks = splitMessage(text, maxLength);

    // Send the first chunk as the initial reply
    const initialReply = await interaction.editReply(messageChunks[0]);

    // Send the remaining chunks as follow-up messages
    for (let i = 1; i < messageChunks.length; i++) {
      await interaction.followUp(messageChunks[i]);
    }
    }
  },
};
