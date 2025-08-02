
const fs = require('fs');
const { EmbedBuilder } = require('discord.js');

const DISPLAY_PATH = 'lottery-display.json';

function getDisplayName(rawName) {
  if (rawName.includes(':00:')) return `🔶 ${rawName.replace(':00:', '').trim()}`;
  if (rawName.includes(':01:')) return `🔷 ${rawName.replace(':01:', '').trim()}`;
  return rawName;
}

async function updateLotteryEmbed(channel) {
  let lotteryData;
  try {
    lotteryData = JSON.parse(fs.readFileSync('lottery.json', 'utf8'));
  } catch (e) {
    console.error('❌ lottery.json 読み込み失敗:', e);
    return;
  }

  if (!lotteryData) return;

  const embed = new EmbedBuilder()
    .setTitle('🎟️ 現在の抽選情報')
    .setColor(0x00AE86)
    .addFields(
      { name: '📅 終了時刻', value: lotteryData.endTime || '-', inline: true },
      { name: '🌍 バイオーム', value: lotteryData.biome || '-', inline: true },
      { name: '📊 必要スコア', value: lotteryData.score || '-', inline: true },
      { name: '👥 参加者', value: (lotteryData.participants?.length > 0
          ? lotteryData.participants.map(getDisplayName).join('\n')
          : '（なし）'), inline: false }
    )
    .setFooter({ text: `イベントID: ${lotteryData.eventId || '-'}` });

  let messageRef = null;

  if (fs.existsSync(DISPLAY_PATH)) {
    try {
      const ref = JSON.parse(fs.readFileSync(DISPLAY_PATH, 'utf8'));
      const msg = await channel.messages.fetch(ref.messageId);
      await msg.edit({ embeds: [embed] });
      console.log('✅ Embed メッセージを更新しました');
      return;
    } catch (e) {
      console.warn('⚠️ 既存メッセージの取得に失敗、再作成します:', e.message);
    }
  }

  // 新規送信
  const sent = await channel.send({ embeds: [embed] });
  fs.writeFileSync(DISPLAY_PATH, JSON.stringify({ messageId: sent.id, channelId: channel.id }, null, 2));
  console.log('✅ Embed メッセージを新規送信しました');
}

module.exports = { updateLotteryEmbed };
