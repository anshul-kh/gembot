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
    
    await interaction.editReply({
      content: response,
    });
  },
};
