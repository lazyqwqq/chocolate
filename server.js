const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is alive!');
});

app.listen(port, () => {
  console.log(`🌐 Web server running on port ${port}`);
});

require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const TOKEN = process.env.TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.once('ready', async () => {
  console.log('✅ Bot is ready.');
  // テスト用ログ
  console.log('DEBUG: ここまで実行');
});

client.login(TOKEN);
