const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("examine")
    .setDescription("Examine the image with Gemini Pro Vision ")
    .addStringOption((option) =>
      option.setName("url").setDescription("Image URL").setRequired(true)
    ).addStringOption((option)=>option.setName('type').setDescription('specify type of image :- png | jpeg | webp | heic | heif').setRequired(true))
    .addStringOption((option)=>option.setName('prompt').setDescription("Ask the question").setRequired(true)),

  async execute(interaction, client) {
    //initializing the model
    const { gemini_ai_api_key } = process.env;
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(gemini_ai_api_key);
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });


    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const {options } = interaction;
    const imageUrl = options.getString("url");
    const prompt = options.getString("prompt");
    const type = options.getString('type');
    const maxLength = 1000;
    const inputImage = await fetch(imageUrl);
    const buffer = await inputImage.buffer();
    const base64String = buffer.toString('base64');

    const image = {
        inlineData: {
          data: base64String,
          mimeType: `image/${type}`,
        },
      };
    
    const result = await model.generateContent([prompt, image]);

    const response =  result.response.text();
    if(response.length < maxLength){
        await interaction.editReply({
            content: response,
          });
    }else{
        function splitMessage(messageContent, maxLength) {
            const chunks = [];
            for (let i = 0; i < messageContent.length; i += maxLength) {
              chunks.push(messageContent.substring(i, i + maxLength));
            }
            return chunks;
          }
          const messageChunks = splitMessage(response, maxLength);

    // Send the first chunk as the initial reply
    const initialReply = await interaction.editReply(messageChunks[0]);

    // Send the remaining chunks as follow-up messages
    for (let i = 1; i < messageChunks.length; i++) {
      await interaction.followUp(messageChunks[i]);
    }
    }
    
  },
};
