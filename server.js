const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(port, () => console.log(`🌐 Web server running on port ${port}`));

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const TOKEN = process.env.TOKEN;

console.log("🔑 Logging in with token...");
client.login(TOKEN).then(() => {
  console.log("✅ Bot logged in.");
}).catch(error => {
  console.error("❌ Login error:", error);
});

client.once('ready', () => {
  console.log('✅ Bot is ready.');
});
