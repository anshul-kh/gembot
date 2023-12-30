# GemBot
 Hey, Discord explorers! Meet GemBot – my pet project with a sprinkle of Gemini AI coolness.It implements the two major features of Gemini AI of Google.


 - ```/chat``` -
  With GemBot's chat command, you can have a conversation with Gemini AI ("gemini-pro" model).

   ```
   /chat [prompt]
   ```
   
- ```/examine```-
  With GemBot's examine command, you can have a conversation with Gemini AI about a particular image ("gemini-pro-vision" model).
  ```
  /examine [url] [type] [prompt]
  ```
  - [url] - url of image
  - [type] - format of image (png/jpeg/webp)
  - [prompt] - question to ask
    <br>
 ---

 # Set-Up Discord Bot - 

## 1. Docker Image -

GemBot can be easily set up using Docker to streamline the deployment process. Follow these simple steps to get GemBot running on your server.

- Step 1: Prerequisites
  - Make sure you have Docker installed on your machine. If not, you can download it here.

- Step 2: Pull the Docker Image
  - Open a terminal or command prompt and use the following command to pull the GemBot Docker image from Docker Hub:
    <br>
   ```
     docker pull yuichikatagiri/gembot
   ```
- Step 3: Run GemBot
  - Now that you have the GemBot Docker image, you can run GemBot with the following command:
    
  ```
    docker run -e client_id=your_client_id -e guild_id=your_discord_server_id -e token=your_discord_bot_token -e gemini_ai_api_key=your_gemini_ai_api_key yuichikatagiri/gembot
  ```

## 2.Setting Up GemBot Locally
If you prefer running GemBot locally for development or testing purposes, follow these steps to set up GemBot using the GitHub repository.
- Step 1: Clone the Repository
  - Open a terminal or command prompt and use the following command to clone the GemBot GitHub repository to your local machine:
```
git clone https://github.com/anshul-kh/gembot.git
```
- Step 2: Navigate to the Project Directory
  - Change into the GemBot project directory:
```
cd gembot
```
- Step 3: Install Dependencies
  - Ensure you have Node.js and npm installed. Install the project dependencies by running:
```
npm install
```
- Step 4: Create .env file
```
token = your_bot_token
client_id = your_bot's_client_id
guild_id = your_discord_server_id
gemini_ai_api_key = your_gemini_ai_api_key
```
- Step 4: Run the bot
```
node .
```

# Don't Want Effort - 
 - If you don't want to do any effort , then join in my own server GemBot 
 - [Join GemBot on Discord](https://discord.gg/fr3Xx4qb)

## Note : 
```
Gembot /examine command only support few image formats
Make sure you provide link of supported image format
Format details are mentioned in dicord command info..  
```
# References :
1. Discord JS Guide : [Link](https://discordjs.guide/#before-you-begin)
2. Docker Image : [Link](https://hub.docker.com/r/yuichikatagiri/gembot)
3. Gemini AI Docs : [For Node JS](https://ai.google.dev/tutorials/node_quickstart)
