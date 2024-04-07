const { EmbedBuilder } = require("discord.js");
const configs = require("../configs.js");
const Discord = require("discord.js");

module.exports = {
  name: "links",
  description: "links.",
  type: 1,

  run: async (client, interaction, args) => {
    if (!configs.owners.includes(interaction.user.id)) {
      interaction.reply({
        content: `Bu Komutu Kullanma Yetkiniz Yok.`,
        ephemeral: true,
      });
    } else {
      let embed = new EmbedBuilder()

        .setTitle("Oauth2 Dashboard")
        .setColor("000000")
        .setDescription(
          `● **Your OAuth2 Link:** ${configs.authLink}\n\`\`\`${configs.authLink}\`\`\`\n● **Bot Invite:** https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot\n \`\`\`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot\`\`\` `
        );

      interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
